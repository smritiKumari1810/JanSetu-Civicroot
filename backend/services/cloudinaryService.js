const cloudinary = require('cloudinary').v2;

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadMediaBuffer(buffer, options = {}) {
  const isCloudinaryConfigured = 
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET;

  if (!isCloudinaryConfigured) {
    console.log('Cloudinary credentials not detected in .env. Storing media as local data stream.');
    const mimeType = options.resource_type === 'video' || options.resource_type === 'raw' || options.mimeType?.includes('audio')
      ? (options.mimeType || 'audio/webm')
      : (options.mimeType || 'image/jpeg');
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'jansetu_civic_grievances',
        resource_type: options.resource_type || 'auto',
        ...options
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error.message);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}

module.exports = {
  cloudinary,
  uploadMediaBuffer
};
