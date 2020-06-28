const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: { type: String }
}, { timestamps: true });

userSchema.statics.createUser = async function (userDetails, callback) {
    let { email, name } = userDetails;
    if (!email || !name) return callback({ msg: 'less params' });
    try {
        let user = new UserModel(userDetails);
        await user.save();
        return callback(null, user);
    } catch (e) {
        return callback(e);
    }
}

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;
