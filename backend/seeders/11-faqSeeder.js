const FAQS = [
  {
    title: 'What is Reelease AI?',
    description: 'Reelease AI is an all-in-one platform for creating social content with AI. You can generate images from text or from a reference image, turn text or images into video, add motion to video, create consistent characters, write captions, and publish or schedule everything to your social accounts from one dashboard.',
  },
  {
    title: 'Which social platforms can I publish to?',
    description: 'You can connect Instagram, Facebook, LinkedIn, X (Twitter), YouTube, Threads and TikTok, then publish posts, reels and stories to them directly from Reelease AI.',
  },
  {
    title: 'How do credits work?',
    description: 'Every AI generation uses credits from your plan. Image generations use fewer credits than video generations, and AI captions use their own caption credits. You can see your remaining balance and full history under Usage Logs.',
  },
  {
    title: 'Can I schedule posts in advance?',
    description: 'Yes. Pick a date and time when creating a post and Reelease AI publishes it automatically to the accounts you selected. You can also save a post as a draft and finish it later.',
  },
  {
    title: 'Is there a free plan?',
    description: 'Yes. You can start on the Free plan to try the tools, then upgrade to Pro or Enterprise from the Subscription page whenever you need more credits or features.',
  },
  {
    title: 'Can I generate captions for my posts?',
    description: 'Yes. Upload an image or describe your post, pick a tone and platform, and the AI writes several caption options with relevant hashtags that fit the platform character limit.',
  },
];

exports.up = async ({ db }) => {
  const { Faq, LandingPage } = db;
  try {
    const ids = [];
    for (const faq of FAQS) {
      const existing = await Faq.findOne({ title: faq.title });
      ids.push(existing ? existing._id : (await Faq.create(faq))._id);
    }
    // 09-landingPageSeeder runs first, so link these into the landing FAQ section here.
    await LandingPage.updateOne({}, { $addToSet: { 'faq.faq_ids': { $each: ids } } });
    console.log('FAQs seeded successfully.');
  } catch (error) {
    console.error('Error seeding FAQs:', error);
  }
};

exports.down = async ({ db }) => {
  const { Faq } = db;
  await Faq.deleteMany({ title: { $in: FAQS.map(f => f.title) } });
};
