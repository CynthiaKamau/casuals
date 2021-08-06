const router = require('express').Router();
const {User} = require('../models/User');
const verify = require('./verifyToken');

router.get('/workers', verify, async (req,res) => {

    await User.findAndCountAll({
        where: { role_id : 1},
        attributes: { exclude: ['password'] }
    }).then(workers => res.status(200).json({users: workers}))
    .catch(error => res.status(500).json({error: error}));

});

router.get('/clients', verify, async (req,res) => {

    await User.findAndCountAll({
        where: { role_id : 2},
        attributes: { exclude: ['password'] }
    }).then(clients => res.status(200).json({users: clients})
    ).catch(error => res.status(500).json({error: error}));

});

module.exports = router;