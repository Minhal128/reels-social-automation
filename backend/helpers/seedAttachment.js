const path = require('path');
const fs = require('fs');

// Copies a file shipped in public/ into uploads/<destSubDir>/ and creates its Attachment (idempotent by file_path).
async function seedAttachment(Attachment, { srcPath, destSubDir, fileName, mimeType, fileType }) {
  const destDir = path.join(process.cwd(), 'uploads', destSubDir);
  const destFile = path.join(destDir, fileName);
  const filePath = `/uploads/${destSubDir}/${fileName}`;

  const existing = await Attachment.findOne({ file_path: filePath });
  if (existing) {
    return existing;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (!fs.existsSync(srcPath)) {
    console.warn(`  ⚠ Source file not found, skipping: ${srcPath}`);
    return null;
  }
  fs.copyFileSync(srcPath, destFile);

  const stat = fs.statSync(destFile);

  const attachment = new Attachment({
    name: fileName,
    file_path: filePath,
    file_type: fileType,
    file_size: stat.size,
    mime_type: mimeType,
  });
  await attachment.save();
  console.log(`  ✓ Attachment created: ${filePath}`);
  return attachment;
}

module.exports = { seedAttachment };
