// //email and password validation
// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const bcrypt = require('bcrypt');
// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /.+\@.+\..+/ // Basic email validation
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6 // Minimum length for password
//     }
// }, { timestamps: true });
// const User = mongoose.model('User', userSchema);
// userSchema.pre('save', async function(next) {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(this.password, salt);
//         this.password = hashedPassword;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// module.exports = User;



// // This model defines a User schema with email and password fields.
// // The email field is required, unique, and must match a basic email format.

// // The password field is required and must be at least 6 characters long.
// // The schema also includes timestamps to track when the user was created and last updated. 
// // This model can be used to create, read, update, and delete user records in a MongoDB database using Mongoose.
// // You can use this model in your application to handle user authentication and management.
// // Make sure to hash passwords before saving them to the database for security purposes.
// // You can use libraries like bcrypt for hashing passwords.
// // To use this model, you would typically import it in your controller or service files and perform operations like creating a new user, finding a user by email, updating user details, etc.
// // Example usage in a controller: 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
    type: String,
    required: true
    }
});

// ✅ Hash the password before saving
userSchema.pre('save', async function (next) {
    try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
    next();
    } catch (err) {
    next(err);
    }
});

// ✅ Add the isValidPassword method here
userSchema.methods.isValidPassword = async function (password) {
    try {
    return await bcrypt.compare(password, this.password);
    } catch (err) {
    throw err;
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;