import { useState } from "react";
import ImageUpload from "./ImageUpload";

function PetClassifier() {
  const [petClass, setPetClass] = useState("Unclassified");

  return (
    <div className="PetClassifier">
        <ImageUpload onPredictionResult={setPetClass}/>
        <h2>{petClass}</h2>
    </div>
  );
}

export default PetClassifier;
