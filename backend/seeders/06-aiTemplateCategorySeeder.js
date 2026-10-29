const path = require('path');
const { seedAttachment } = require('../helpers/seedAttachment');

exports.up = async ({ db }, mongoose) => {
  const { AITemplateCategory, Attachment } = db;
  try {
    const categories = [
      { name: 'Futuristic', slug: 'futuristic', description: 'Advanced technology and sci-fi aesthetics.' },
      { name: 'Cinematic', slug: 'cinematic', description: 'Movie-like high quality visuals.' },
      { name: 'Anime', slug: 'anime', description: 'Japanese animation style.' },
      { name: 'Product Showcase', slug: 'product-showcase', description: 'High-end product photography and videos.' },
      { name: 'Abstract', slug: 'abstract', description: 'Non-representational artistic visuals.' }
    ];

    for (const cat of categories) {
      const image = await seedAttachment(Attachment, {
        srcPath: path.join(process.cwd(), 'public', 'templates', `${cat.slug}.jpg`),
        destSubDir: 'templates',
        fileName: `${cat.slug}.jpg`,
        mimeType: 'image/jpeg',
        fileType: 'image',
      });

      const existing = await AITemplateCategory.findOne({ slug: cat.slug });
      if (!existing) {
        await new AITemplateCategory({ ...cat, attachment_id: image ? image._id : null }).save();
      } else if (!existing.attachment_id && image) {
        existing.attachment_id = image._id;
        await existing.save();
      }
    }

    console.log('AI Template Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding AI Template Categories:', error);
  }
};

exports.down = async ({ db }, mongoose) => {
  const { AITemplateCategory } = db;
  try {
    await AITemplateCategory.deleteMany({});
  } catch (error) {
    console.error('Error reverting AI Template Category seeder:', error);
  }
};
