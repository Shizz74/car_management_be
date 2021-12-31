const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/vehicle', verify,  (req, res) => {
    // res.json({
    //     posts: {
    //         title: 'lol',
    //         desc: 'lol2'
    //     }
    // });
});

module.exports = router;