const path = require('path')
const nodemailer = require('nodemailer')
const expressHandlebars  = require('express-handlebars');

const hsl = require('nodemailer-express-handlebars')
const { host, port, user, pass } = require('../config/mail.json')

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

const viewPath = path.resolve(__dirname, '..', 'resources', 'mail');

transport.use('compile', hsl({
  viewEngine: exphbs.create({
    layoutsDir: path.resolve(viewPath, 'layouts'),
    partialsDir: path.resolve(viewPath, 'partials'),
    defaultLayout: 'default',
    extname: '.hbs',
  }),
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.handlebars',
}))

module.exports = transport