const router = require('express').Router();
const {User, loginValidation} = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/login', async (req,res) => {

    let { error } = loginValidation(req.body);

    if(error) {

        return res.status(400).json({ message: error.details[0].message});
    }

    const user = await User.findOne({ where : { phone_number: req.body.phone_number} });

    if(!user) return res.status(400).json({ success : false , message :'Phone number does not exsist'});

    //check if password is correct
    const validPwd = await bcrypt.compare(req.body.password, user.password);

    if(!validPwd) return res.status(400).json({ success : false , message :'Invalid Password'});

    //create and assign token
    const token = jwt.sign({id: user.id, phone_number: user.phone_number, email: user.email, role_id: user.role_id, first_name: user.first_name, last_name: user.last_name}, process.env.SECRET_KEY);
    res.header('Authorization').json({ success : true, token : token, message : user });

});

router.post('/reset-password', async (req,res) => {

});

module.exports = router;