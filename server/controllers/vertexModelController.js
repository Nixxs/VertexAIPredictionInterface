const predictionService = require("../services/predictionService");

// returns list of all available models
const getAvailableModels = (res) => {
    const models = {
        "models":[
            {
                "model":"cat_dog_classifier",
                "description":"tells you if your image is of a dog or a cat",
                "vertex_endpoint":"https://australia-southeast1-aiplatform.googleapis.com/v1/projects/ngis-skyline/locations/australia-southeast1/endpoints/2433377561942687744:predict",
                "input":"an image of a dog or a cat",
                "keys":{
                    0 : "Dog",
                    1 : "Cat"
                }
            },
        ]
    }
    res.send({ result: 200, data: models });
};

// returns catdog prediction
const predictDogCat = async (req, res) => {
    try {
        // this should be req.file once we start getting the actual raw image
        // for the moment we are just handling an already processed image
        const raw_image = req.body
        const prepared_image = await predictionService.prepareImage(raw_image);
        const model_endpoint = "https://australia-southeast1-aiplatform.googleapis.com/v1/projects/ngis-skyline/locations/australia-southeast1/endpoints/2433377561942687744:predict"
        const response_data = await predictionService.makePrediction(prepared_image, model_endpoint);
        res.send({ result: 200, data: response_data });
    } catch (err) {
        console.error(err);
        res.send({ result: 500, error: err.message });
    }
};

module.exports = {
    getAvailableModels,
    predictDogCat,
};
