const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const crypto = require('crypto')
const Token = require('../../models/token')
const sendemail = require('../../utils/sendemail')
async function verifyemail(user) {
    if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        // console.log(user)
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            })
            token.save()
            // console.log(token)
        }
        const url = `${process.env.BASE_URL}${user.id}/verify/${token.token}`;
        await sendemail(user.email, "Verify Email", url);
        return true;
    }
    else
        return false;
}


function registercontroller() {
    return {
        register(req, res) {
            // console.log("jai ho")
            res.render('auth/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body
            // console.log(email);
            // Validate request 
            if (!(name && email && password)) {
                req.flash('notify', 'All fields are mandatory')
                req.flash('name', name)
                req.flash('email', email)
                // console.log('All fields are mandatory')
                return res.redirect('/register')
            }
            // if (password.length() <= 8) {
            //     req.flash('notify', 'Password Should have minimum 9 digits.')
            //     return res.redirect('/register')
            // }
            // Check if email exists 
            let flag = 1;
            User.exists({ email: email }, async (err, result) => {
                if (result) {
                    req.flash('notify', 'Email already taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    let user = await User.findOne({ email: email });
                    if (verifyemail(user))
                        req.flash('notify', "An Email sent to your account please verify")
                    // console.log("something")
                    flag = 0;
                }
            })
            if (flag) {
                //Hash Password
                const hashedPassword = await bcrypt.hash(password, 10)
                //Create User
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                })

                user.save().then(async (user) => {
                    // generating a token for email verification
                    (verifyemail(user))
                    // req.flash('notify', 'An Email sent to your account please verify')
                    console.log("something")
                    // res.redirect('/register')
                }).catch(err => {
                    req.flash('notify', 'Something went wrong')
                    // return res.redirect('/register')
                })
            }
            return res.redirect('/register')
        },
        logout(req, res) {
            req.logout(() => { })
            return res.redirect('/login')
        }
    }
}
module.exports = registercontroller