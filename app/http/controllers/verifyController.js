const User = require('../../models/user')
const Token = require('../../models/token')

function verifycontroller() {
    return {
        async verifyemail(req, res) {
            try {
                // console.log("jai ho");
                const user = await User.findOne({ _id: req.params.id });
                if (!user)
                    req.flash('error', 'Invalid link')

                const token = await Token.findOne({
                    userId: user._id,
                    token: req.params.token,
                });
                if (!token)
                    req.flash('error', 'Invalid link')

                await User.updateOne({ _id: user._id, verified: true });
                await token.remove();

                return res.redirect("/");
            } catch (error) {
                req.flash('error', 'Invalid link')
            }
        }
    }
}
module.exports = verifycontroller