const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    //Validate date before create user
    const {error} = registerValidation(req.body);

    //Return code 400 and send error message if validation is not passed
    if(error) return res.status(400).send(error.details[0].message);

    //Checking for user name duplication
    const nameExist = await  User.findOne({name: req.body.name});
    if(nameExist) return res.status(400).send('name_exist');

    //Checking for email duplication
    const emailExist = await  User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email_exist');

    //Hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    //Validate date before create user
    const {error} = loginValidation(req.body);

    //Return code 400 and send error message
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if email exist
    const user = await  User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('emailDoNotExist');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('invalidPassword');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send(token);
    res.json({ token: token })
});

module.exports = router;