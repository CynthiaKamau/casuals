const router = require('express').Router();
const { verify } = require('../middleware/jwt/jwt');
const {User, registrationValidation} = require('../models/users');
const { Worker} = require('../models/workers');
const bcrypt = require('bcryptjs');
const { Job} = require('../models/jobs');

//all workers
router.get('/workers', verify, async (req,res) => {
    try {
        let workers = await Worker.findAll({
            include: { model: User, attributes: { exclude: ['password'] } }
        })
        res.json({ success: true, message: workers});
        
    } catch (error) {
        res.status(500).json({ success: false, error: error});
    }
    
});

//get worker pass user_id
router.get('/worker/:id', async (req,res) => {

    try {
        let worker = await Worker.findOne({
            where: { user_id : req.params.id},
            include: { model: User, attributes: { exclude: ['password'] }, include : Job },
        })
        res.json({ success: true, message: worker});  
    } catch (error) {
        res.status(400).json({ success: false, error: error }); 
    }
    
});

//create worker
router.post('/worker', verify, async (req,res) => {

    let { error } = registrationValidation(req.body);

    if(error) {
        return res.status(400).json({success: false, error : error.details[0].message});
    }

        const salt = await bcrypt.genSalt(10);
        const hashpwd = await bcrypt.hash(req.body.password, salt);

        try {

            let user = await User.create({

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
                let worker = await Worker.create({
                    user_id : user.id,
                    username: req.body.username,
                    status: req.body.status
                });

                res.status(201).json({success: true,
                    message: "You have successfully been registered.",
                    user: worker });                
            } catch (error) {
                res.status(500).json({success: false, error :error});
            }
            
        } catch (error) {
            res.status(500).json({ success: false,error : error.errors[0].message});
        }    

});

//update worker
router.put('/worker/:id', verify, async (req,res) => {

    let worker = await User.findByPk(req.params.id);

    if(!worker) {
        return res.status(400).json({ success: false, error :'User does not exist!'});
    }

    try {

        let user = await User.update({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role_id: req.body.role_id,
            status: req.body.status,
        }, { returning : true, plain: true, where : { id : req.params.id }
        });

        try {

            let worker_profile = await Worker.findOne({ where : { user_id : user[1].id}});

            if(!worker_profile) {
                return res.status(400).json({ success: false, error: 'User profile does not exist!'});
            }

            let worker = await Worker.update({
                user_id : req.params.id,
                username: req.body.username,
                gender: req.body.gender,
                dob: req.body.dob,
                citizenship: req.body.citizenship,
                address : req.body.address,
                profile_photo : req.body.profile_photo,
                skills: req.body.skills,
                rate : req.body.rate,
                status: req.body.status

            }, { returning : true, where : { user_id : user[1].id }});

            res.json({ success: true,
                message: "Your profile has been updated successfully.",
                user: worker[1]
            });
            
        } catch (error) {
            res.status(500).json({ success: false, error: error});
        }
        
    } catch (error) {
        res.status(500).json({success: false, error: error.errors[0].message});
    }

});

//delete worker
router.delete('/worker/:id', async (req,res) => {

    let worker = await Worker.findOne({ where : {user_id : req.params.id}} );

    if(!worker) {
        return res.status(400).json({ success: false, error : "The worker does not exist!"});
    }

    worker.destroy().then(response => res.status(200).json({ success : true, message : 'Worker account deleted successfully'}))
    .catch(error => res.status(500).json({ success : false, error : error}) )

});

module.exports = router;