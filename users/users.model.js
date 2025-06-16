const mongoose = require('mongoose');
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        unique: true
    },
    authorID : {
        type: Number,
        foreign_Key: true,
        unique : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model ('Users', userSchema)


module.exports = User;