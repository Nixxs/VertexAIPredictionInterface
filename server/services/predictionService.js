const { GoogleAuth } = require("google-auth-library");
const sharp = require('sharp');

async function makePrediction(input_data, model_endpoint) {
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);;
    const scopes = ["https://www.googleapis.com/auth/cloud-platform"];
    const auth = new GoogleAuth({
        credentials: serviceAccount,
        scopes: scopes,
    });
    try {
        const client = await auth.getClient();
        const url = model_endpoint;
        const res = await client.request({
            url: url,
            method: "POST",
            data: {"instances":input_data},
        });
        return(res.data);
    } catch (e) {
        throw new Error(e);
    }
}

async function prepareImage(fileBuffer, imgSize = 100) {
    return sharp(fileBuffer)
        .resize(imgSize, imgSize) // Resize the image
        .grayscale()             // Convert image to grayscale
        .raw()                    // Get raw, uncompressed bitmap image data
        .toBuffer()
        .then(resizedImageBuffer => {
            // Normalize the image data to range 0-1
            const normalizedArray = Array.from(resizedImageBuffer).map(value => value / 255);

            // Reshape the array into the correct 4D array format
            const reshapedArray = [];
            for (let i = 0; i < imgSize; i++) {
                const row = [];
                for (let j = 0; j < imgSize; j++) {
                    const idx = i * imgSize + j;
                    row.push([normalizedArray[idx]]);
                }
                reshapedArray.push(row);
            }
            return [reshapedArray]; // Ensure the shape is [1, height, width, channels]
        });
}

module.exports = {
    makePrediction,
    prepareImage
}