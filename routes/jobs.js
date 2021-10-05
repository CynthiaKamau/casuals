const router = require('express').Router();
const { validateJob } = require('../sequelize/models/job.model');
const { verify } = require('../middleware/jwt/jwt');
const { models } = require('../sequelize');

//all jobs
router.get('/jobs', verify, async (req, res) => {

    try {
        let jobs = await models.job.findAll({
            include: [{ all: true, nested: true, attributes: { exclude: ['password'] } }]
        });
        res.json({ success: true, message: jobs });

    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }

});

//get job
router.get('/job/:id', verify, async (req, res) => {

    try {
        let job = await models.job.findOne({
            where: { id: req.params.id },
            include: [{ all: true, nested: true, attributes: { exclude: ['password'] } }]
        })
        res.json({ success: true, message: job });

    } catch (error) {
        res.status(500).json({ sucess: false, error: error })
    }

})

//create job
router.post('/job', verify, async (req, res) => {

    let { error } = validateJob(req.body);

    if (error) {
        return res.status(400).json({ success: false, error: error.details[0].message });
    }

    try {

        let job = await models.job.create({
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
            job: job
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }

});

//update job
router.put('/job/:id', verify, async (req, res) => {

    let job = await models.job.findByPk(req.params.id);

    if (!job) {
        return res.status(400).json({ success: false, error: 'Job does not exist!' });
    }

    try {

        let job = await models.job.update({
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
        }, {
            returning: true, plain: true, where: { id: req.params.id }
        })
        res.json({
            success: true,
            message: "Job updated successfully",
            job: job[1]
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }

})

//delete job
router.delete('/job/:id', verify, async (req, res) => {

    let job = await models.job.findByPk(req.params.id);

    if (!job) {
        return res.status(400).json({ error: 'Job does not exist!' });
    }

    job.destroy().then(response => res.status(200).json({ success: true, message: 'Job deleted successfully' }))
        .catch(error => res.status(500).json({ success: false, error: error }))

})

module.exports = router