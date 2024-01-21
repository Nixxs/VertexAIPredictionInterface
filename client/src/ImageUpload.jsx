import React, { useState } from "react";

function ImageUpload(props) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a URL for preview
      props.onPredictionResult("Unclassified");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/api/models/dogcat", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const prediction = result.data.predictions[0][0];
      const predictionClass = prediction > 0.5 ? "Cat" : "Dog";
      props.onPredictionResult(predictionClass);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
      <br></br>
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            color: "#aaa",
          }}
        >
          No image selected
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
