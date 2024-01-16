// returns list of all available models
const getAvailableModels = (res) => {
    const models = {
        "models":[
            {
                "name":"dogcat",
                "description":"tells you if your image is of a dog or a cat",
                "vertex_endpoint":"https://australia-southeast1-aiplatform.googleapis.com/v1/projects/ngis-skyline/locations/australia-southeast1/endpoints/2433377561942687744:predict",
                "input":"your 100x100 grayscale image converted into an array"
            },
        ]
    }
    res.send({ result: 200, data: models });
};

// returns catdog prediction
const predictDogCat = (data, res) => {
    // not yet implemented
    console.log("got data: " + data);
    const response_data = {"vertex_ai_response":"I havent implemented this yet"}
    res.send({ result: 200, data: response_data });
};

module.exports = {
    getAvailableModels,
    predictDogCat,
};
