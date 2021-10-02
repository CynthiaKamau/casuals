const router = require('express').Router();
const {Job, validateJob} = require('../models/jobs');
const { verify } = require('../middleware/jwt/jwt');
const { User } = require('../models/users');
const { Worker } = require('../models/workers');

//all jobs
router.get('/jobs', verify, async (req,res) => {

    try {
        let jobs = await Job.findAll({ include: { model : Worker, require: true, as: 'service-providers' }})
        res.json({ success: true, message: jobs});
        
    } catch (error) {
        res.status(500).json({success: false, error: error});
    }

});

//get job
router.get('/job/:id', async (req,res) => {

    try {
        let job = await Job.findOne({
            where: { id : req.params.id},
            include: [ { model : User, require: false, attributes : {exclude : ['password']} }]
        })
        res.json({ success: true, message: job});
        
    } catch (error) {
        res.status(500).json({sucess: false ,error : error})
    }

})

//create job
router.post('/job', verify, async (req, res) => {

    let {error} = validateJob(req.body);

    if(error) {
        return res.status(400).json({ success: false, error : error.details[0].message});
    }

    try {

        let job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            date_added: req.body.date_added,
            validity: req.body.validity,
            client_id: req.body.client_id,
            worker_id: req.body.worker_id,
            preferance: req.body.preferance,
            rating: req.body.rating,
            location: req.body.location,
            status: req.body.status
        })
        res.status(201).json({ 
            success: true,
            message: "Job created successfully",
            job: job}) 
    } catch (error) {
        res.status(500).json({ success: false, error : error });  
    }

});

//update job
router.put('/job/:id', verify, async (req,res) => {

    let job = await Job.findByPk(req.params.id);

    if(!job) {
        return res.status(400).json({ success: false, error :'Job does not exist!'});
    }

    try {

        let job = await Job.update({
            title: req.body.title,
            description: req.body.description,
            date_added: req.body.date_added,
            validity: req.body.validity,
            client_id: req.body.client_id,
            worker_id: req.body.worker_id,
            preferance: req.body.preferance,
            rating: req.body.rating,
            location: req.body.location,
            status: req.body.status
            }, { returning: true, plain: true, where : { id : req.params.id }
        })
        res.json({success: true,
            message: "Job updated successfully",
            job: job[1] })  
    } catch (error) {
        res.status(500).json({ success : false, error :error }) 
    }

})

//delete job
router.delete('/job/:id', verify, async (req,res) => {

    let job = await Job.findByPk(req.params.id);

    if(!job) {
        return res.status(400).json({ error : 'Job does not exist!'});
    }

    job.destroy().then(response => res.status(200).json({ success : true, message : 'Job deleted successfully'}))
    .catch(error => res.status(500).json({ success : false, error : error}) )

})

module.exports = router