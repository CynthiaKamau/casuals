const router = require('express').Router();
const {User, loginValidation, registrationValidation} = require('../models/User');
const { ClientProfile} = require('../models/ClientProfile');
const { WorkerProfile} = require('../models/WorkerProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/register-client', async (req,res) => {

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

            await ClientProfile.create({
                
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

router.post('/register-worker', async (req,res) => {

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

router.post('/login', async (req,res) => {

    let { error } = loginValidation(req.body);

    if(error) {

        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ where : { phone_number: req.body.phone_number} });

    if(!user) return res.status(400).send('Phone number does not exsist');

    //check if password is correct
    const validPwd = await bcrypt.compare(req.body.password, user.password);

    if(!validPwd) return res.status(400).send('Invalid Password');

    //create and assign token
    const token = jwt.sign({id: user.id, phone_number: user.phone_number, email: user.email, role_id: user.role_id, first_name: user.first_name, last_name: user.last_name}, process.env.SECRET_KEY);
    res.header('auth-token', token).send(token);

});

router.post('/profile', async (req, res) => {

    await WorkerProfile.update({
        username: req.body.username,
        gender: req.body.gender,
        date_added: req.body.date_added,
        dob: req.body.dob,
        user_id: req.body.user_id,
        profile_photo: req.body.profile_photo,
        skills: req.body.skills,
        rate: req.body.rate,
        address: req.body.address,
        citizenship: req.body.citizenship,
        status: req.body.status
    }).then( response => res.status(201).json({
        message: "Profile updated successfully",
        success: true })
    ).catch( error => res.status(500).json(error.error[0].message ));
});

module.exports = router;