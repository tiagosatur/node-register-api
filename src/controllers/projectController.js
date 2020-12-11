const express = require('express')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.use(authMiddleware)

router.get('/', (req, res) => {
    return res.send({ 
        msg: 'May the force be with you!', 
        userId: req.userId
    })
})

module.exports = app => app.use('/projects', router)