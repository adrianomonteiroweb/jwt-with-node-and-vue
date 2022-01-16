const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, maxlength: 50, required: true },
  email: { type: String, maxlength: 30, required: true },
  password: { type: String, required: true },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
}, {
  timestamps: true,
  collection: 'users',
});

// método irá fazer o 'hash' da senha antes de salvar o modelo da classe 'User'
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// método irá criar (gerar) uma autenticação auth para o 'User'
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const { _id, name, email } = user;
  const token = jwt.sign({ _id, name, email }, 'secret');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// método irá fazer uma pesquisa por um 'user' por 'email' e 'password'
// let User = mongoose.model('User', userSchema);

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) throw new Error({ error: 'Login inválido!' });

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error({ error: 'Login inválido!' });

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
