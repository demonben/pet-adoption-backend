const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'benson-cloud',
    api_key: '517291972833542',
    api_secret: 'Xv2Qt_vIDkgvbUoUWW6ymTiTOZ4'
})

function uploadToCloudinary(filePath) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (error, result)=> {
            if (error) reject(error);
            else resolve(result)
        });
    })
}
exports.uploadToCloudinary = uploadToCloudinary