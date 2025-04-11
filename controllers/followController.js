const { Follow, User } = require('../models');

// Kullanıcı takip et
const followUser = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  if (followerId === parseInt(followingId)) {
    return res.status(400).json({ message: 'Kendinizi takip edemezsiniz.' });
  }

  try {
    const existingFollow = await Follow.findOne({ where: { followerId, followingId } });

    if (existingFollow) {
      return res.status(400).json({ message: 'Zaten takip ediyorsunuz.' });
    }

    await Follow.create({ followerId, followingId });
    res.status(201).json({ message: 'Takip edildi.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Takip işlemi başarısız.' });
  }
};

// Kullanıcı takipten çıkar
const unfollowUser = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  try {
    const follow = await Follow.findOne({ where: { followerId, followingId } });

    if (!follow) {
      return res.status(404).json({ message: 'Bu kullanıcıyı takip etmiyorsunuz.' });
    }

    await follow.destroy();
    res.status(200).json({ message: 'Takipten çıkarıldı.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Takipten çıkarma işlemi başarısız.' });
  }
};

// Kullanıcının takipçilerini getir
const getFollowers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Follow,
        as: 'followers',
        include: {
          model: User,
          as: 'follower',
          attributes: ['id', 'username', 'email']
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const followers = user.followers.map(f => f.follower);
    res.json(followers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Takipçiler getirilemedi.' });
  }
};

// Kullanıcının takip ettiklerini getir
const getFollowing = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Follow,
        as: 'following',
        include: {
          model: User,
          as: 'following',
          attributes: ['id', 'username', 'email']
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const following = user.following.map(f => f.following);
    res.json(following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Takip edilenler getirilemedi.' });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};
