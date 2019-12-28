const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
    salt: String
}, { timestamps: true })

//Virtual properties don’t get persisted in the database. 
//They only exist logically and are not written to the document’s collection.
userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    }).get(() => this._password);

//All users instance of this model will have access to this encryptPassword method
userSchema.methods = {
    authenticate: function (textPassword) {
        return this.encryptPassword(textPassword) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return '';
        }
    }
}
/**
 * HMAC - hash-based message authentication code
 * update - update the salt with password
 * digest - it returns the hex value
 */

module.exports = mongoose.model('User', userSchema);
