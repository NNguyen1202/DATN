const FacebookPostStats = require('../models/facebookPostStatsModel');
const { pageAccessToken } = require('../services/tokenService');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

// Hàm lấy thông tin về số lượt like, comment, share của các bài post từ Facebook và lưu vào MongoDB
const saveFacebookPostStats = asyncHandler(async (req, res) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${process.env.PAGE_ID}/feed?fields=id,comments.limit(1).summary(true),likes.limit(1).summary(true),shares&access_token=${pageAccessToken()}`
    );
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      const posts = data.data;
      const statsToSave = [];

      for (const post of posts) {
        const { id, comments, likes, shares } = post;
        const totalComments = comments ? comments.summary.total_count : 0;
        const totalLikes = likes ? likes.summary.total_count : 0;
        const totalShares = shares ? shares.count : 0;

        // Kiểm tra nếu postId đã tồn tại trong MongoDB
        const existingStats = await FacebookPostStats.findOne({ postId: id });

        if (!existingStats) {
          // Nếu chưa tồn tại, thêm vào danh sách để lưu
          const newStats = {
            postId: id,
            totalComments: totalComments,
            totalLikes: totalLikes,
            totalShares: totalShares,
          };
          statsToSave.push(newStats);
        } else {
          console.log(`Stats for postId ${id} already exist. Skipping...`);
        }
      }

      if (statsToSave.length > 0) {
        // Chỉ chèn các thống kê mới vào MongoDB
        await FacebookPostStats.insertMany(statsToSave);
        res.status(200).json({ message: 'Post stats saved successfully' });
      } else {
        res.status(200).json({ message: 'No new post stats found' });
      }
    } else {
      res.status(404).json({ error: 'No posts found' });
    }
  } catch (error) {
    console.error('Error fetching Facebook post stats:', error);
    res.status(500).json({ error: 'Failed to fetch Facebook post stats' });
  }
});

// Hàm lấy thông tin chi tiết về số lượt like, comment, share của một bài post dựa trên ID từ MongoDB
const getFacebookPostStatsDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const stats = await FacebookPostStats.findById(id);
    if (!stats) {
      return res.status(404).json({ error: 'Facebook post stats not found' });
    }
    res.json(stats);
  } catch (error) {
    console.error('Error fetching Facebook post stats detail:', error);
    res.status(500).json({ error: 'Failed to fetch Facebook post stats detail' });
  }
});

const getFacebookPostStats = asyncHandler(async (req, res) => {
  try {
    const getFacebookPostsStats = await FacebookPostStats.find();
    res.json(getFacebookPostsStats);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  saveFacebookPostStats,
  getFacebookPostStatsDetail,
  getFacebookPostStats,
};
