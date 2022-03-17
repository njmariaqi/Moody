const mongoose = require( 'mongoose');
const Schema = mongoose.Schema
const bcrypt = require( 'bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Collection'
  }]
})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
})


userSchema.methods.isCorrectPassword = async function (password) {
  const result =  await bcrypt.compare(password, this.password)
  console.log(result)
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;