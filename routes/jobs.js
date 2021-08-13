const router = require('express').Router();
const {Job, validateJob} = require('../models/jobs');
const { verify } = require('../middleware/jwt/jwt');
const { User } = require('../models/users');

//all jobs
router.get('/jobs', verify, async (req,res) => {

    await Job.findAndCountAll()
    .then(jobs => res.status(200).json({ success: true, data: jobs}))
    .catch(error => res.status(500).json({error: error}));

});

//get job
router.get('/job/:id', verify, async (req,res) => {

    await Job.findOne({
        where: { worker_id : req.params.id},
        include: 
        [ { model : User, as: 'worker'} ]
        // { model : User, require:true, attributes : {exclude : ['password']} }
    }).then(response => res.status(200).json({ success: true, data : response}))
    .catch(error =>{ 
        console.log(error)
        res.status(500).json({error : error})
    })
})

//create job
router.post('/job', verify, async (req, res) => {

    let {error} = validateJob(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    await Job.create({
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
    ).catch( error => res.status(500).json(error ));

});

//update job
router.put('/job/:id', verify, async (req,res) => {

    let job = await Job.findByPk(req.params.id);

    if(!job) {
        return res.status(400).send('Job does not exist!');
    }

    await Job.update({
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
    }, { returning: true, where : { id : req.params.id }}
    ).then( response => res.status(201).json({
        message: "Job updated successfully",
        success: true })
    ).catch( error => res.status(500).json(error ));

})

//delete job
router.delete('/job/:id', verify, async (req,res) => {

    let job = await Job.findByPk(req.params.id);

    if(!job) {
        return res.status(400).send('Job does not exist!');
    }

    job.destroy().then(response => res.status(200).json({ success : true, message : 'Job deleted successfully'}))
    .catch(error => res.status(500).json({ success : false, error : error}) )

})

module.exports = router