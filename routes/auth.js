const router = require('express').Router();
const { models } = require('../sequelize');
const { loginValidation } = require('../sequelize/models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verify } = require('../middleware/jwt/jwt');

router.post('/login', async (req, res) => {

    let { error } = loginValidation(req.body);

    if (error) {

        return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const user = await models.user.findOne({
        where: { phone_number: req.body.phone_number },
        include: [{ model: models.role, required: true, as: 'role' }]
        // attributes: ['first_name', 'middle_name', 'last_name', 'email', 'phone_number', 'role_id', 'status']
    });

    if (!user) return res.status(400).json({ status: 400, message: 'Phone number does not exsist' });

    //check if password is correct
    const validPwd = await bcrypt.compare(req.body.password, user.password);

    if (!validPwd) return res.status(400).json({ status: 400, message: 'Invalid Password' });

    //create and assign token
    const token = jwt.sign({ id: user.id, phone_number: user.phone_number, email: user.email, role_id: user.role_id, first_name: user.first_name, last_name: user.last_name }, process.env.SECRET_KEY);
    res.header('Authorization').json({ success: true, token: token, message: user });

});

//get current user
router.get('/auth', verify, async (req, res) => {

    try {

        let user = await models.user.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password'] },
            include: [{
                model: models.role,
                required: true,
                as: 'role'
            }]
        });

        if (user) {
            return res.status(200).json({ success: true, message: user })

        } else {
            return res.status(500).json({ error: "User does not exist!" });
        }

    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

router.put("/update-profile", verify, async (req, res) => {

    let user = await models.user.findByPk(req.body.id);

    if (!user) return res.status(500).json({ success: false, error: 'User does not exist!' })

    try {

        let u = await models.user.update({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            status: req.body.status,
        }, { returning: true, plain: true, where: { id: req.body.id } })
        res.json({
            message: "Your profile has been updated successfully.",
            success: true,
            user: u[1]
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
})

router.post('/reset-password', async (req, res) => {

});

module.exports = router;