const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/node-register-api', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then( () => console.log(console, 'Database connected succeffully!'))
.catch(() => console.error(console, 'Database connection error!'))

mongoose.Promise = global.Promise


module.exports = mongoose