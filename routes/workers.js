const router = require('express').Router();
const { verify } = require('../middleware/jwt/jwt');
const {User, registrationValidation} = require('../models/users');
const { Worker} = require('../models/workers');
const bcrypt = require('bcryptjs');
const { Job} = require('../models/jobs');

//all workers
router.get('/workers', verify, async (req,res) => {

    await Worker.findAll({
        include: { model: User, attributes: { exclude: ['password'] } }
    }).then(workers => res.status(200).json({ success: true, data: workers}))
    .catch(error => res.status(500).json({error: error}));

});

//get worker pass user_id
router.get('/worker/:id', async (req,res) => {

    await Worker.findOne({
        where: { user_id : req.params.id},
        include: { model: User, attributes: { exclude: ['password'] }, include : Job },
    }).then(client => res.status(200).json({ success: true, data: client}))
    .catch( error => res.status(400).json({error}));

});

//create worker
router.post('/worker', verify, async (req,res) => {

    let { error } = registrationValidation(req.body);

    if(error) {
        return res.status(400).json({message : error.details[0].message});
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

            await Worker.create({
                
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
router.put('/worker/:id', verify, async (req,res) => {

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

        let worker_profile = await Worker.findOne({ where : { user_id : req.params.id }});

        if(!worker_profile) {
            return res.status(400).send('User profile does not exist!');
        }

        await Worker.update({
            
            user_id : req.params.id,
            username: req.body.username,
            gender: req.body.gender,
            dob: req.body.dob,
            citizenship: req.body.citizenship,
            address : req.body.address,
            profile_photo : req.body.profile_photo,
            skills: req.body.skills,
            rate : req.body.rate,
            status: req.body.status

        }, { returning : true, where : { user_id : req.params.id }})
        .then(response => {
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

    let worker = await Worker.findOne({ where : {user_id : req.params.id}} );

    if(!worker) {
        return res.status(400).send("The worker does not exist!");
    }

    worker.destroy().then(response => res.status(200).json({ success : true, message : 'Worker account deleted successfully'}))
    .catch(error => res.status(500).json({ success : false, error : error}) )

});

module.exports = router;