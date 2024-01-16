const { GoogleAuth } = require("google-auth-library");

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
            data: input_data,
        });
        return(res.data);
    } catch (e) {
        throw new Error(e);
    }
}

async function prepareImage(input_image) {
    // handle image data prep here, this si the current python processing steps
    // 1. convert the image into a grayscale array
    // 2. resize the image to 100x100
    // 3. reshape the image 100,100,1

    // def prepare_image(image_path):
    //     IMG_SIZE = 100  # Assuming this is the size you used during training
    //     img_array = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    //     resized_image = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    //     reshaped_image = resized_image.reshape(-1, IMG_SIZE, IMG_SIZE, 1)
    //     return reshaped_image

    return(input_image);
}

module.exports = {
    makePrediction,
    prepareImage
}