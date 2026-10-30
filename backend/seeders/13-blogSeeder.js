const path = require('path');
const { seedAttachment } = require('../helpers/seedAttachment');

const CATEGORIES = [
  { name: 'AI Content Creation', slug: 'ai-content-creation', description: 'Guides for creating images and video with AI.' },
  { name: 'Social Media Strategy', slug: 'social-media-strategy', description: 'Planning, posting and growing on social platforms.' },
];

const TAGS = ['Reels', 'AI Video', 'Content Strategy', 'Scheduling'];

const BLOGS = [
  {
    slug: 'how-to-create-scroll-stopping-reels-with-ai',
    thumbnail: 'scroll-stopping-reels.jpg',
    category: 'ai-content-creation',
    tags: ['Reels', 'AI Video'],
    is_featured: true,
    read_time: 6,
    title: 'How to Create Scroll-Stopping Reels with AI',
    description: 'A practical workflow for turning one idea into a short-form video people actually watch — from the hook to the caption.',
    content: `
<p>Short-form video rewards one thing above everything else: holding attention in the first seconds. AI makes the production side fast, but the result still depends on the decisions you make before you press generate. Here is a workflow that keeps those decisions simple.</p>
<h2>1. Start with the hook, not the visuals</h2>
<p>Write the first line before anything else. A good hook names a problem, makes a bold claim, or opens a question the viewer wants answered. If you cannot say why someone would stop scrolling, no amount of visual polish will fix it.</p>
<ul>
  <li><strong>Problem:</strong> “Your product photos are costing you sales.”</li>
  <li><strong>Promise:</strong> “Three edits that make any room look bigger.”</li>
  <li><strong>Curiosity:</strong> “I let AI plan my week of posts. Here is what happened.”</li>
</ul>
<h2>2. Turn the idea into a prompt</h2>
<p>Describe the scene the way a director would: subject, setting, lighting, camera movement and mood. “A barista pouring latte art, close-up, warm morning light, slow push-in” gives the model far more to work with than “coffee video”.</p>
<h2>3. Pick the right generator</h2>
<p>Use <strong>Text to Video</strong> when you are starting from nothing. If you already have a product photo or a brand image, <strong>Image to Video</strong> keeps your visuals on-brand and animates them. <strong>Video Motion</strong> is useful when you have footage and want to add camera movement or a new style.</p>
<h2>4. Keep it vertical and short</h2>
<p>Generate in 9:16 for Reels, Shorts and TikTok. Aim for one idea per clip; if you need to explain more, make a series rather than one long video.</p>
<h2>5. Finish with a caption that does work</h2>
<p>The caption should add context the video cannot, then end with a clear next step — save, share, comment or follow. Generate a few options with the AI caption tool and edit the one that sounds most like you.</p>
<h2>6. Publish when your audience is online</h2>
<p>Schedule the post for the time your followers are most active instead of posting the moment it is ready. Consistency over weeks matters more than any single viral clip.</p>
`,
  },
  {
    slug: 'text-to-video-vs-image-to-video',
    thumbnail: 'text-vs-image-to-video.jpg',
    category: 'ai-content-creation',
    tags: ['AI Video'],
    is_featured: false,
    read_time: 5,
    title: 'Text-to-Video vs Image-to-Video: Which One Should You Use?',
    description: 'Both turn an idea into a clip, but they solve different problems. Here is how to choose for each project.',
    content: `
<p>Text-to-video and image-to-video both end with a video file, but they start from very different places. Choosing the right one saves credits and gets you closer to the result on the first try.</p>
<h2>Text to Video: maximum creative freedom</h2>
<p>You describe the scene and the model invents everything — characters, setting, lighting and motion. It is the fastest way to explore ideas and works well for concept clips, storytelling and B-roll.</p>
<ul>
  <li><strong>Best for:</strong> brainstorming, abstract or cinematic scenes, content with no existing assets.</li>
  <li><strong>Trade-off:</strong> less control over exactly how people, products or logos look.</li>
</ul>
<h2>Image to Video: consistency with what you already have</h2>
<p>You provide one or more reference images and the model animates them. Because the first frame is fixed, your product, character or brand style stays recognisable.</p>
<ul>
  <li><strong>Best for:</strong> product showcases, animating brand artwork, keeping a character consistent across posts.</li>
  <li><strong>Trade-off:</strong> the result can only be as good as the reference image.</li>
</ul>
<h2>A simple rule of thumb</h2>
<p>If it matters what something looks like, start from an image. If it matters what happens, start from text. Many creators combine both: generate a key frame with <strong>Text to Image</strong>, refine it with <strong>Image to Image</strong>, then animate it with <strong>Image to Video</strong>.</p>
<h2>Writing prompts for either mode</h2>
<p>Describe motion explicitly — “camera slowly orbits”, “hair moving in the wind”, “steam rising from the cup”. Models follow movement instructions well, and a clip with clear motion feels far more intentional than one where everything drifts.</p>
`,
  },
  {
    slug: 'build-a-consistent-posting-schedule',
    thumbnail: 'posting-schedule.jpg',
    category: 'social-media-strategy',
    tags: ['Content Strategy', 'Scheduling'],
    is_featured: false,
    read_time: 5,
    title: 'Build a Consistent Posting Schedule Without Burning Out',
    description: 'Batching, repurposing and scheduling — a sustainable system for showing up on social media every week.',
    content: `
<p>Posting regularly is one of the few things every growth strategy agrees on, and one of the hardest to keep up. The fix is not more willpower; it is a system that separates creating from publishing.</p>
<h2>Batch your creation</h2>
<p>Set aside one block of time each week to create everything. Switching between “idea mode” and “publish mode” every day is what drains energy. In one session you can write hooks, generate visuals and draft captions for the whole week.</p>
<h2>Use content pillars</h2>
<p>Pick three to five recurring themes — for example tutorials, behind the scenes, customer stories and product updates. Pillars turn “what should I post?” into “which pillar is due?”, and your audience learns what to expect from you.</p>
<h2>Repurpose one idea across platforms</h2>
<ul>
  <li>A vertical video becomes a Reel, a YouTube Short and a TikTok.</li>
  <li>The key frame becomes an Instagram or LinkedIn post.</li>
  <li>The script becomes a thread on X or Threads.</li>
</ul>
<p>Adjust the caption and format for each platform, but keep the core idea. One strong concept can fill a week.</p>
<h2>Schedule everything at once</h2>
<p>Once a batch is ready, schedule it straight away. Choose the times your audience is most active and let posts go out on their own. Save unfinished ideas as drafts so nothing gets lost.</p>
<h2>Review monthly, not daily</h2>
<p>Checking numbers after every post leads to reactive decisions. Once a month, look at which pillars and formats performed best and plan the next batch around them.</p>
`,
  },
];

exports.up = async ({ db }) => {
  const { Blog, Category, Tag, Attachment, LandingPage } = db;
  try {
    const categoryIds = {};
    for (const c of CATEGORIES) {
      const existing = await Category.findOne({ slug: c.slug });
      categoryIds[c.slug] = existing ? existing._id : (await Category.create(c))._id;
    }

    const tagIds = {};
    for (const title of TAGS) {
      const existing = await Tag.findOne({ title });
      tagIds[title] = existing ? existing._id : (await Tag.create({ title }))._id;
    }

    const ids = [];
    for (const [i, b] of BLOGS.entries()) {
      const existing = await Blog.findOne({ slug: b.slug });
      if (existing) {
        ids.push(existing._id);
        continue;
      }
      const thumbnail = await seedAttachment(Attachment, {
        srcPath: path.join(process.cwd(), 'public', 'blog', b.thumbnail),
        destSubDir: 'blog',
        fileName: b.thumbnail,
        mimeType: 'image/jpeg',
        fileType: 'image',
      });
      if (!thumbnail) continue; // Blog requires a thumbnail

      const { thumbnail: _, category, tags, ...fields } = b;
      const blog = await Blog.create({
        ...fields,
        content: fields.content.trim(),
        thumbnail_id: thumbnail._id,
        meta_title: fields.title,
        meta_description: fields.description,
        categories: [categoryIds[category]],
        tags: tags.map(t => tagIds[t]),
        status: 'published',
        published_at: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000), // newest first, a few days apart
      });
      ids.push(blog._id);
    }

    await LandingPage.updateOne({}, { $addToSet: { 'blog.blog_ids': { $each: ids } } });
    console.log('Blogs seeded successfully.');
  } catch (error) {
    console.error('Error seeding blogs:', error);
  }
};

exports.down = async ({ db }) => {
  const { Blog } = db;
  await Blog.deleteMany({ slug: { $in: BLOGS.map(b => b.slug) } });
};
