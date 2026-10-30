// Sample testimonials for the demo site only. Invented reviews on a live site are deceptive advertising
// (e.g. FTC 16 CFR Part 465), so production (APP_DEMO_MODE=false) skips these — add real ones in Admin → Testimonials.
const TESTIMONIALS = [
  {
    title: 'Hours saved every week',
    description: 'I used to spend a whole day each week making reels. Now I write the idea, generate the video and schedule it in one sitting.',
    user_name: 'Sample User',
    user_post: 'Content Creator',
    rating: 5,
  },
  {
    title: 'One dashboard for every channel',
    description: 'Posting to Instagram, TikTok and LinkedIn from one place means our team finally keeps a consistent schedule.',
    user_name: 'Sample User',
    user_post: 'Social Media Manager',
    rating: 5,
  },
  {
    title: 'Product shots without a studio',
    description: 'Image-to-image lets us place our products in new scenes for every campaign without booking a photographer.',
    user_name: 'Sample User',
    user_post: 'E-commerce Owner',
    rating: 4,
  },
  {
    title: 'Captions that fit the platform',
    description: 'The caption generator gives me several options with hashtags, already trimmed to each platform’s limit.',
    user_name: 'Sample User',
    user_post: 'Freelance Marketer',
    rating: 5,
  },
];

exports.up = async ({ db }) => {
  const { Testimonial, LandingPage } = db;
  if (process.env.APP_DEMO_MODE !== 'true') {
    return console.log('Skipping sample testimonials (APP_DEMO_MODE is not true).');
  }
  try {
    const ids = [];
    for (const t of TESTIMONIALS) {
      const existing = await Testimonial.findOne({ title: t.title });
      ids.push(existing ? existing._id : (await Testimonial.create(t))._id);
    }
    await LandingPage.updateOne({}, { $addToSet: { 'testimonials.testimonial_ids': { $each: ids } } });
    console.log('Sample testimonials seeded successfully.');
  } catch (error) {
    console.error('Error seeding testimonials:', error);
  }
};

exports.down = async ({ db }) => {
  const { Testimonial } = db;
  await Testimonial.deleteMany({ title: { $in: TESTIMONIALS.map(t => t.title) } });
};
