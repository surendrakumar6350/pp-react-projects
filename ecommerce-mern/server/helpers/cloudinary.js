const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'doncvaock',
    api_key : '869218944226349',
    api_secret : 'WbQ1zrYT381wMyUu99cQxNI96cg'
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    })

    return result;
    
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil}
