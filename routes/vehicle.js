const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/vehicle', verifyToken,  (req, res) => {
    // res.json({
    //     posts: {
    //         title: 'lol',
    //         desc: 'lol2'
    //     }
    // });
});

module.exports = router;