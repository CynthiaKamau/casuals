const router = require('express').Router();
const {Jobs} = require('../models/Jobs');
const verify = require('./verifyToken');

router.get('/jobs', verify, async (req,res) => {

    await Jobs.findAndCountAll()
    .then(jobs => res.status(200).json({jobs: jobs}))
    .catch(error => res.status(500).json({error: error}));

});

router.post('/job', verify, async (req, res) => {

    await Jobs.create({
        title: req.body.title,
        description: req.body.description,
        date_added: req.body.date_added,
        validity: req.body.validity,
        client_id: req.body.client_id,
        worker_id: req.body.worker_id,
        preferance: req.body.preferance,
        ratings: req.body.ratings,
        location: req.body.location,
        status: req.body.status
    }).then( response => res.status(201).json({
        message: "Job created successfully",
        success: true })
    ).catch( error => res.status(500).json(error.error[0].message ));
});

module.exports = router