const { Report } = require('../models');

// Şikayet oluşturma
const createReport = async (req, res) => {
  const { targetUserId, postId, commentId, reason, type } = req.body;

  try {
    const newReport = await Report.create({
      reporterId: req.user.id,
      targetUserId,
      postId,
      commentId,
      reason,
      type,
      status: 'pending'
    });

    res.status(201).json({ message: 'Şikayet gönderildi.', report: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Şikayet oluşturulamadı.' });
  }
};

module.exports = {
  createReport,
};
