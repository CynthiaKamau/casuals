const router = require('express').Router();
const verify = require('../middleware/jwt/jwt');
const {User, registrationValidation} = require('../models/User');
const { WorkerProfile} = require('../models/WorkerProfile');
const bcrypt = require('bcryptjs');
const { request } = require('express');

//all workers
router.get('/workers', verify, async (req,res) => {

    await User.findAndCountAll({
        where: { role_id : 3},
        attributes: { exclude: ['password'] }
    }).then(workers => res.status(200).json({data: workers}))
    .catch(error => res.status(500).json({error: error}));

});

//get worker
router.get('/worker/:id', verify, async (req,res) => {

    await WorkerProfile.findOne({
        where: { user_id : req.params.id},
        attributes: { exclude: ['password'] }
    }).then(workers => res.status(200).json({data: workers}))
    .catch(error => res.status(500).json({error: error}));

});

//create worker
router.post('/worker', async (req,res) => {

    let { error } = registrationValidation(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

        const salt = await bcrypt.genSalt(10);
        const hashpwd = await bcrypt.hash(req.body.password, salt);

        await User.create({

            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role_id: req.body.role_id,
            status: req.body.status,
            password: hashpwd

        },

        ).then( async (response) => {

            await WorkerProfile.create({
                
                user_id : response.id,
                username: req.body.username,
                status: req.body.status
            })
            .then(async () => {
                // await transaction.commit();
                res.status(200).json({
                    message: "You have successfully been registered.",
                    success: true,
                });
            })
            .catch((err) => {
                res.status(500).json(err);
            })
       
        }).catch( error => res.status(500).json(error));
    

});

//update worker
router.put('/worker/:id', async (req,res) => {

    let worker = await User.findByPk(req.params.id);

    if(!worker) {
        return res.status(400).send('User does not exist!');
    }

    await User.update({

        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role_id: req.body.role_id,
        status: req.body.status,
    }, { returning : true, where : { id : req.params.id }}

    ).then( async (response) => {

        let worker_profile = await WorkerProfile.findOne({ where : { user_id : response.id }});

        if(!worker_profile) {
            return res.status(400).send('User profile does not exist!');
        }

        await WorkerProfile.update({
            
            user_id : response.id,
            username: req.body.username,
            gender: req.body.gender,
            dob: request.body.dob,
            citizenship: request.body.citizenship,
            address : req.body.address,
            profile_photo : req.body.profile_photo,
            skills: req.body.skills,
            rate : req.body.rate,
            status: req.body.status

        }, { returning : true, where : { user_id : response.id }})
        .then(async () => {
            // await transaction.commit();
            res.status(200).json({
                message: "Your profile has been updated successfully.",
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    
    }).catch( error => res.status(500).json(error));
    

});

//delete worker
router.delete('/worker/:id', async (req,res) => {

    let worker = await User.findByPk(req.params.id);

    if(!worker) {
        return res.status(400).send('User does not exist!');
    }

});

module.exports = router;