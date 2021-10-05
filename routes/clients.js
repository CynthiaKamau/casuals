const router = require('express').Router();
const { verify } = require('../middleware/jwt/jwt');
const { models } = require('../sequelize');
const { registrationValidation } = require('../sequelize/models/user.model');
const bcrypt = require('bcryptjs');

//all clients
router.get('/clients', verify, async (req, res) => {

    try {
        let clients = await models.client.findAll({
            include: [{
                model: models.user,
                as: 'user',
                required: true,
                attributes: { exclude: ['password'] }
            }]
        })
        res.json({ success: true, message: clients });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }

});

//get client pass user_id
router.get('/client/:id', async (req, res) => {

    try {
        let client = await models.client.findOne({
            where: { user_id: req.params.id },
            include: [{ all: true, nested: true, attributes: { exclude: ['password'] } }]
        })
        res.json({ success: true, message: client });

    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }

});

//create client
router.post('/client', async (req, res) => {

    let { error } = registrationValidation(req.body);

    if (error) {
        return res.status(400).json({ success: false, error: error.details[0].message });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(req.body.password, salt);

    try {

        let user = await models.user.create({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role_id: req.body.role_id,
            status: req.body.status,
            password: hashpwd
        });

        try {

            let client = await models.client.create({

                user_id: user.id,
                username: req.body.username,
                status: req.body.status
            });
            // await transaction.commit();
            res.status(201).json({
                message: "You have successfully been registered.",
                success: true,
                user: client
            });

        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.errors[0].message });
    }

});

//update client
router.put('/client/:id', verify, async (req, res) => {

    let client = await models.user.findByPk(req.params.id);

    if (!client) {
        return res.status(500).json({ success: false, error: 'User does not exist!' });
    }

    try {
        let user = await models.user.update({

            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role_id: req.body.role_id,
            status: req.body.status,

        }, { returning: true, plain: true, where: { id: req.params.id } })

        try {

            let client_profile = await models.client.findOne({ where: { user_id: user[1].id } });

            if (!client_profile) {
                return res.status(400).json({ success: false, error: 'User profile does not exist!' });
            }

            let client = await models.client.update({

                user_id: req.params.id,
                username: req.body.username,
                gender: req.body.gender,
                dob: req.body.dob,
                citizenship: req.body.citizenship,
                address: req.body.address,
                status: req.body.status
            }, { returning: true, plain: true, where: { user_id: user[1].id } });
            res.json({
                message: "Your profile has been updated successfully .",
                success: true,
                user: client[1]
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.errors[0].message });
    }

});

//delete client
router.delete('/client/:id', verify, async (req, res) => {

    let client = await models.client.findOne({ where: { user_id: req.params.id } });

    if (!client) {
        return res.status(400).json({ success: false, error: "The Client does not exist!" });
    }

    client.destroy().then(response => res.status(200).json({ success: true, message: 'Client account deleted successfully' }))
        .catch(error => res.status(500).json({ success: false, error: error }))

});

//client ratings
router.get('/client/jobs/:id', verify, async (req, res) => {

    try {
        let client = await models.client.findOne({
            where: { user_id: req.params.id },
            include: { model: user, attributes: { exclude: ['password'] } }
        });
        res.json({ success: true, message: client });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

module.exports = router;