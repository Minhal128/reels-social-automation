const cron = require('node-cron');
const Blog = require('../models/blog.model');

const processScheduledBlogs = async () => {
  try {
    const now = new Date();
    const result = await Blog.updateMany(
      {
        status: 'scheduled',
        published_at: { $lte: now }
      },
      {
        $set: { status: 'published' }
      }
    );
    if (result.modifiedCount > 0) {
      console.log(`[CRON] Published ${result.modifiedCount} scheduled blogs.`);
    }
  } catch (error) {
    console.error('[CRON] Error in processScheduledBlogs:', error.message);
  }
};

const initScheduledBlogsCron = () => {
  cron.schedule('* * * * *', () => processScheduledBlogs(), {
    scheduled: true,
    timezone: 'UTC'
  });
  console.log('[CRON] Scheduled Blogs scheduler initialized.');
};

module.exports = { initScheduledBlogsCron };
