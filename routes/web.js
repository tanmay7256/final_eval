const homeController = require('../app/http/controllers/homeController')
const uploadController = require('../app/http/controllers/uploadController')
const loginController = require('../app/http/controllers/logincontroller')
const registerController = require('../app/http/controllers/registercontroller')
const verifyController = require('../app/http/controllers/verifyController')

// Middlewares 
const guest = require('../app/http/middlewares/guest')
const loggedin = require('../app/http/middlewares/loggedin')

function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login', guest, loginController().login)
    app.post('/login', loginController().postLogin)
    app.get('/register', guest, registerController().register)
    app.post('/register', registerController().postRegister)
    app.post('/logout', loginController().logout)
    app.post('/postupload', loggedin, uploadController().postupload)
    app.get('/:id/verify/:token/', verifyController().verifyemail)
}
module.exports = initRoutes