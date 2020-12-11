const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {
    const headers = req.headers.authorization

    if(!headers) {
        return res.status(401).send({ error: 'No token provided' })
    }

    const parts = headers.split(' ')

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error'})

    const [ scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Malformated token' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: 'Invalid token'})
        req.userId = decoded.params.id

        return next()
    })
}