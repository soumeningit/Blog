const fs = require('fs');
const { supabaseFileUpload } = require('../config/supabaseInIt');

async function uploadFile(bucketName, filePath, fileName, directory = '') {
    const fileBuffer = fs.readFileSync(filePath);

    if (directory && !directory.endsWith('/')) {
        directory += '/';
    }

    // upload into folder inside bucket
    const { data, error } = await supabaseFileUpload.storage
        .from(bucketName)
        .upload(`${directory}${fileName}`, fileBuffer, {
            contentType: 'image/png',
            upsert: true,
        });

    if (error) throw error;
    console.log('File uploaded:', data);
    return data.path;
}

function getPublicUrl(bucketName, filePath) {
    const { data } = supabaseFileUpload.storage
        .from(bucketName)
        .getPublicUrl(filePath);
    return data.publicUrl;
}


module.exports = {
    uploadFile,
    getPublicUrl
};