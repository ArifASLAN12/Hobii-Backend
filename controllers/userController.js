const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require('sequelize'); // en üstte eklenmeli
require('dotenv').config();

// Kayıt işlemi
const signup = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    gender,
    birthday,
    location,
    bio,
    photo,
    website,
    phone,
    address
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      birthday,
      location,
      bio,
      photo,
      website,
      phone,
      address,
      isAdmin: false
    });

    const token = jwt.sign(
      { id: newUser.id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Kayıt başarılı.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

// Giriş işlemi
const login = async (req, res) => {
  const identifier = req.body.identifier || req.body.email || req.body.username;
  const { password } = req.body; // email yerine identifier parametresi kullanılsın
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }] // Kullanıcıyı hem email hem de username ile aramak için
      }
    });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Giriş başarılı.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

// Kendi profilini getirme
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

// Profilini güncelleme
const updateMyProfile = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.user.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı veya güncellenemedi.' });
    }
    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

// Başka kullanıcıların profilini görüntüleme
const getUserProfileById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'photo', 'bio', 'location']
    });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

module.exports = { signup, login, getMyProfile, updateMyProfile, getUserProfileById };