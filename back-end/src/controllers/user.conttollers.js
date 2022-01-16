const User = require('../models/user.models');

const emailExists = { message: 'Atenção! Este e-mail já possui registro!' };
const credentialError = {
  error: 'Erro ao Logar. Verifique suas credenciais.',
};

// Método responsável por Criar um novo 'User':
exports.registerNewUser = async (req, res) => {
  try {
    // verificação se o usuário já possui algum e-mail já cadastrado:
    const isUser = await User.find({ email: req.body.email });
    console.log(isUser);
    if (isUser.length >= 1) return res.status(409).json(emailExists);

    const newUser = new User(req.body);
    const user = await newUser.save();
    const token = await newUser
      .generateAuthToken(); // método que criamos no model
    return res
      .status(201)
      .json({ message: 'Usuário(a) criado(a) com sucesso!', user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// Método responsável por realizar um novo login 'User':
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) return res.status(401).json(credentialError);

    const token = await user.generateAuthToken();
    return res
      .status(201)
      .json({ message: 'Usuário(a) logado com sucesso!', user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// Método responsável por retornar um determinado 'User'
exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};
