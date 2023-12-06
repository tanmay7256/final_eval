const upload = require('../middlewares/multersetup')
// const imageModel = require('../../models/image')
const User = require('../../models/user')

function uploadController() {
    return {
        postupload(req, res) {

            upload(req, res, (err) => {
                const { spawn } = require('child_process');

                const childPython = spawn('python', ['codespace.py']);

                childPython.stdout.on('data', (data) => {
                    const resultFromPython = data.toString().trim();
                    console.log(`Data received from Python: ${resultFromPython}`);
                });

                childPython.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                childPython.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });

            })


            return res.redirect('/register')
        },

    }
}
module.exports = uploadController