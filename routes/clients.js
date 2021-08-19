const router = require('express').Router();
const { verify } = require('../middleware/jwt/jwt');
const {User, registrationValidation} = require('../models/users');
const { Client} = require('../models/clients');
const { Job} = require('../models/jobs');
const bcrypt = require('bcryptjs');

//all clients
router.get('/clients', verify, async (req,res) => {

    await Client.findAndCountAll({
        include: [{ model: User,
            required : true,
            attributes: { exclude: ['password'] } 
        }]
    }).then(clients => res.status(200).json({ success: true, data: clients})
    ).catch(error => res.status(500).json({error: error}));

});

//get client
router.get('/client/:id', verify, async (req,res) => {

    await Client.findOne({
        where: { user_id : req.params.id},
        include: { model: User, attributes: { exclude: ['password'] }, include : Job },
    }).then(client => res.status(200).json({ success: true, data: client}))
    .catch( error => res.status(400).json({error}));

});

//create client
router.post('/client', async (req,res) => {

    let { error } = registrationValidation(req.body);

    if(error) {
        return res.status(400).json({ message : error.details[0].message});
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

            await Client.create({
                
                user_id : response.id,
                username: req.body.username,
                status: req.body.status
            })
            .then(async () => {
                // await transaction.commit();
                res.status(200).json({
                    message: "You have successfully been registered.",
                    success: true,
                    user : response
                });
            })
            .catch((err) => {
                res.status(500).json({status : 500, message : err});
            })
       
        }).catch( error => res.status(500).json({status : 500, message : error}) );
    

});

//update client
router.put('/client/:id', verify, async (req,res) => {

    let client = await User.findByPk(req.params.id);

    if(!client) {
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

        let client_profile = await Client.findOne({ where : { user_id : req.params.id }});

        if(!client_profile) {
            return res.status(400).send('User profile does not exist!');
        }

        await Client.update({
            
            user_id : req.params.id,
            username: req.body.username,
            gender: req.body.gender,
            dob: req.body.dob,
            citizenship: req.body.citizenship,
            address : req.body.address,
            status: req.body.status
        }, { returning : true, where : { user_id : req.params.id }})
        .then( response => {
            res.status(200).json({
                message: "Your profile has been updated successfully .",
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    
    }).catch( error => res.status(500).json(error));

});

//delete client
router.delete('/client/:id', verify, async (req,res) => {

    let client = await Client.findOne({where : {user_id : req.params.id}});

    if(!client) {
        return res.status(400).send("The Client does not exist!");
    }

    client.destroy().then(response => res.status(200).json({ success : true, message : 'Client account deleted successfully'}))
    .catch(error => res.status(500).json({ success : false, error : error}) )

});

//client ratings
router.get('/client/jobs/:id', verify, async (req,res) => {

    await Client.findOne({
        where: { user_id : req.params.id},
        include: { model: User, attributes: { exclude: ['password'] } }
    }).then(client => res.status(200).json({ success: true, data: client}))
    .catch(error => res.status(500).json({error: error}));

});

module.exports = router;