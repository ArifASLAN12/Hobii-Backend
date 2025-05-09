const { Op } = require('sequelize');
const { User, Report, Post, Comment } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Admin Login
const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
        isAdmin: true,
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Admin bulunamadı veya yetkiniz yok.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Şifre yanlış.' });
    }

    const token = jwt.sign({ id: user.id, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Tüm kullanıcıları listele
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { isAdmin: false } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Kullanıcılar alınamadı.' });
  }
};

// Kullanıcı detayı getir
const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Kullanıcı bilgisi alınamadı.' });
  }
};

// Kullanıcıyı engelle
const blockUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    user.isBlocked = true;
    await user.save();
    res.json({ message: 'Kullanıcı engellendi.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Kullanıcı engellenemedi.' });
  }
};

// Kullanıcının engelini kaldır
const unblockUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    user.isBlocked = false;
    await user.save();
    res.json({ message: 'Kullanıcının engeli kaldırıldı.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Engel kaldırılamadı.' });
  }
};

const getReportDetail = async (req, res) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Şikayet bulunamadı.' });
    }

    let detail = null;

    if (report.type === 'post' && report.postId) {
      detail = await Post.findByPk(report.postId);
    } else if (report.type === 'comment' && report.commentId) {
      detail = await Comment.findByPk(report.commentId);
    } else if (report.type === 'user' && report.targetUserId) {
      detail = await User.findByPk(report.targetUserId);
    }

    res.json({ report, detail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Şikayet detayı alınamadı.' });
  }
};

module.exports = {
  login,
  getUsers,
  getUserDetails,
  blockUser,
  unblockUser,
  getReportDetail
};
