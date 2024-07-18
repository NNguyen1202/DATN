const FacebookPost = require("../models/facebookPostModel");
const { pageAccessToken } = require("../services/tokenService");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Hàm lấy toàn bộ bài post từ Facebook và lưu vào MongoDB
const saveFacebookPosts = asyncHandler(async (req, res) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${
        process.env.PAGE_ID
      }/feed?fields=id,message,created_time,comments.limit(1).summary(true),likes.limit(1).summary(true),shares&access_token=${pageAccessToken()}`
    );
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      const posts = data.data;
      const postsToSave = [];

      for (const post of posts) {
        const { id, message, created_time, link, comments, likes, shares } =
          post;
        const totalComments = comments ? comments.summary.total_count : 0;
        const totalLikes = likes ? likes.summary.total_count : 0;
        const totalShares = shares ? shares.count : 0;

        // Kiểm tra nếu postId đã tồn tại trong MongoDB
        const existingPost = await FacebookPost.findOne({ postId: id });
        console.log(existingPost);

        if (!existingPost) {
          // Tạo đường link đầy đủ cho bài post từ Facebook
          const link = `https://www.facebook.com/${process.env.PAGE_ID}/posts/${
            id.split("_")[1]
          }`;

          // Nếu chưa tồn tại, thêm vào danh sách để lưu
          const newPost = {
            postId: id,
            message: message,
            createdTime: created_time,
            link: link,
            totalComments: totalComments,
            totalLikes: totalLikes,
            totalShares: totalShares,
          };
          postsToSave.push(newPost);
        } else {
          console.log(`Post with postId ${id} already exists. Skipping...`);
        }
      }

      if (postsToSave.length > 0) {
        // Chỉ chèn các bài post mới vào MongoDB
        await FacebookPost.insertMany(postsToSave);
        res.status(200).json({ message: "Posts saved successfully" });
      } else {
        res.status(200).json({ message: "No new posts found" });
      }
    } else {
      res.status(200).json({ message: "No posts found" });
    }
  } catch (error) {
    console.error("Error fetching Facebook posts:", error);
    res.status(500).json({ error: "Failed to fetch Facebook posts" });
  }
});

// Hàm lấy thông tin chi tiết của một bài post dựa trên ID từ MongoDB
const getFacebookPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const post = await FacebookPost.findById(id);
    res.json(post);
  } catch (error) {
    console.error("Error fetching Facebook post detail:", error);
    res.status(500).json({ error: "Failed to fetch Facebook post detail" });
  }
});

const getFacebookPosts = asyncHandler(async (req, res) => {
  try {
    const getFacebookPosts = await FacebookPost.find();
    res.json(getFacebookPosts);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getFacebookPosts,
  getFacebookPost,
  saveFacebookPosts,
};
