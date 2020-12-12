const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')

const authConfig = require('../../config/auth')
const User = require('../models/user')
const router = express.Router()

function generateToken(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/register', async (req, res) => {
    const { email } = req.body
    const userExists = await User.findOne({email})

    try {
        if(userExists) return res.status(400).send({error: 'User already exists!'})
        
        const user = await User.create(req.body)
        user.password = undefined
        
        return res.send({ 
            user, 
            token: generateToken({
                id: user.id
            })
        })

    } catch(err) {
        return res.status(400).send({ error: 'User registration failed!', message: err })
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if(!user)
        return res.status(400).send({error: 'Invalid user'})

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid password'})

    user.password = undefined

    return res.send({ 
        user, 
        token: generateToken({
            id: user.id
        }) 
    })
})

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body
    
    try {
        const user = User.findOne({ email })

        if(!user)
            return res.status(400).send({error: 'User not found'})
        
        const passwordResetToken = crypto.randomBytes(20).toString('hex')
        const now = new Date()
        const passwordResetExpires = now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken,
                passwordResetExpires,
            }
        })

        mailer.sendMail({
            to: email,
            from: 'tiagosatur@gmail.com',
            html: '/auth/forgot-password',
            context: { token: passwordResetToken },
        }, (err) => {
        console.log("🚀 ~ Send email err", err)
            
            if(err)
                return res.status(400).send({error: 'We could not send the forgot password email!'})

            return res.send()
        })

    } catch(err) {
        res.status(400).send({error: 'Error on forgot password'})
    }
})

module.exports = app => app.use('/auth', router)