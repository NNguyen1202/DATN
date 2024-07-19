const FacebookPost = require("../models/facebookPostModel");
const Statistic = require("../models/statisticModel");
const Post = require("../models/postModel");
const { pageAccessToken } = require("../services/tokenService");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// // Hàm lấy toàn bộ bài post từ Facebook và lưu vào MongoDB
// const saveFacebookPosts = asyncHandler(async (req, res) => {
//   try {
//     const response = await fetch(
//       `https://graph.facebook.com/${
//         process.env.PAGE_ID
//       }/feed?fields=id,message,created_time,comments.limit(1).summary(true),likes.limit(1).summary(true),shares&access_token=${pageAccessToken()}`
//     );
//     const data = await response.json();

//     if (data && data.data && data.data.length > 0) {
//       const posts = data.data;
//       const postsToSave = [];

//       for (const post of posts) {
//         const { id, message, created_time, link, comments, likes, shares } =
//           post;
//         const totalComments = comments ? comments.summary.total_count : 0;
//         const totalLikes = likes ? likes.summary.total_count : 0;
//         const totalShares = shares ? shares.count : 0;

//         // Kiểm tra nếu postId đã tồn tại trong MongoDB
//         const existingPost = await FacebookPost.findOne({ postId: id });
//         console.log(existingPost);

//         if (!existingPost) {
//           // Tạo đường link đầy đủ cho bài post từ Facebook
//           const link = `https://www.facebook.com/${process.env.PAGE_ID}/posts/${
//             id.split("_")[1]
//           }`;

//           // Nếu chưa tồn tại, thêm vào danh sách để lưu
//           const newPost = {
//             postId: id,
//             message: message,
//             createdTime: created_time,
//             link: link,
//             totalComments: totalComments,
//             totalLikes: totalLikes,
//             totalShares: totalShares,
//           };
//           postsToSave.push(newPost);
//         } else {
//           console.log(`Post with postId ${id} already exists. Skipping...`);
//         }
//       }

//       if (postsToSave.length > 0) {
//         // Chỉ chèn các bài post mới vào MongoDB
//         await FacebookPost.insertMany(postsToSave);
//         res.status(200).json({ message: "Posts saved successfully" });
//       } else {
//         res.status(200).json({ message: "No new posts found" });
//       }
//     } else {
//       res.status(200).json({ message: "No posts found" });
//     }
//   } catch (error) {
//     console.error("Error fetching Facebook posts:", error);
//     res.status(500).json({ error: "Failed to fetch Facebook posts" });
//   }
// });

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
      const statisticToSave = [];

      for (const post of posts) {
        const { id, message, created_time, comments, likes, shares } = post;
        const totalComments = comments ? comments.summary.total_count : 0;
        const totalLikes = likes ? likes.summary.total_count : 0;
        const totalShares = shares ? shares.count : 0;
        const link = `https://www.facebook.com/${process.env.PAGE_ID}/posts/${
          id.split("_")[1]
        }`;

        // Tạo hoặc cập nhật bài post trong FacebookPostModel
        const existingPost = await FacebookPost.findOneAndUpdate(
          { postId: id },
          {
            postId: id,
            message: message,
            createdTime: created_time,
            link: link,
            totalComments: totalComments,
            totalLikes: totalLikes,
            totalShares: totalShares,
          },
          { upsert: true, new: true }
        );

        postsToSave.push(existingPost);

        // Tìm bài đăng tương ứng trong PostModel dựa trên facebookPostUrl
        let correspondingPost = await Post.findOne({ facebookPostUrl: link });

        if (!correspondingPost) {
          // Nếu không tìm thấy, thử tìm bằng facebookPostUrl đã lưu trong FacebookPostModel
          correspondingPost = await Post.findOne({
            facebookPostUrl: existingPost.link,
          });
        }

        if (correspondingPost) {
          // Kiểm tra xem Statistic đã tồn tại cho cặp postID và facebookPostID hay chưa
          const existingStatistic = await Statistic.findOne({
            postID: correspondingPost._id,
            facebookPostID: existingPost._id,
          });

          if (!existingStatistic) {
            // Tạo hoặc cập nhật bản ghi Statistic
            const statisticEntry = {
              postID: correspondingPost._id,
              facebookPostID: existingPost._id,
            };
            await Statistic.create(statisticEntry);
            statisticToSave.push(statisticEntry);
          } else {
            console.log(
              `Statistic entry already exists for PostModel ${correspondingPost._id} and FacebookPostModel ${existingPost._id}. Skipping...`
            );
          }
        } else {
          console.log(
            `No corresponding PostModel entry found for facebookPostUrl ${link}. Skipping...`
          );
        }
      }

      if (postsToSave.length > 0 && statisticToSave.length > 0) {
        res.status(200).json({
          message: "Posts and statistics saved successfully",
          posts: postsToSave,
          statistics: statisticToSave,
        });
      }else {
        res.status(200).json({ message: "No new posts found" });
      }
    } else {
      res.status(200).json({ message: "No posts found" });
    }
  } catch (error) {
    console.error("Error fetching or saving Facebook posts:", error);
    res.status(500).json({ error: error.message });
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
