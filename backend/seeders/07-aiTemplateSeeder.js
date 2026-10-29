const path = require('path');
const { seedAttachment } = require('../helpers/seedAttachment');

// Older seeds created this attachment with no file behind it (one per run).
const LEGACY_DUMMY_PATH = '/uploads/futuristic-city.jpg';

exports.up = async ({ db }, mongoose) => {
  const { AITemplate, AITemplateCategory, Attachment } = db;
  try {
    const category = await AITemplateCategory.findOne({ slug: 'futuristic' });
    if (!category) return console.log('Category futuristic not found, skipping template seeding.');

    const image = await seedAttachment(Attachment, {
      srcPath: path.join(process.cwd(), 'public', 'templates', 'futuristic-city.jpg'),
      destSubDir: 'templates',
      fileName: 'futuristic-city.jpg',
      mimeType: 'image/jpeg',
      fileType: 'image',
    });

    const legacyIds = (await Attachment.find({ file_path: LEGACY_DUMMY_PATH }).select('_id').lean()).map(a => a._id);
    if (image && legacyIds.length) {
      await AITemplate.updateMany({ attachment_id: { $in: legacyIds } }, { $set: { attachment_id: image._id } });
      await Attachment.deleteMany({ _id: { $in: legacyIds } });
    }

    const templates = [
      {
        title: 'Cyberpunk Metropolis',
        description: 'A neon-lit futuristic city at night.',
        attachment_id: image ? image._id : null,
        category_id: category._id,
        type: 'image',
        prompt: 'Futuristic city with neon lights, cyberpunk aesthetic, high detail, 8k',
        status: true
      }
    ];

    for (const temp of templates) {
      const existing = await AITemplate.findOne({ title: temp.title });
      if (!existing) {
        await new AITemplate(temp).save();
      }
    }

    console.log('AI Templates seeded successfully.');
  } catch (error) {
    console.error('Error seeding AI Templates:', error);
  }
};

exports.down = async ({ db }, mongoose) => {
  const { AITemplate, Attachment } = db;
  try {
    await AITemplate.deleteMany({});
    console.log('AI Templates removed.');
  } catch (error) {
    console.error('Error reverting AI Template seeder:', error);
  }
};
