import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PredictionList() {
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    // Fetch predictions when component mounts
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/predictions', { withCredentials: true });
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handleDeletePrediction = async (predictionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete_prediction/${predictionId}`, { withCredentials: true });
      // Update predictions after deletion
      fetchPredictions();
    } catch (error) {
      console.error('Error deleting prediction:', error);
    }
  };

  return (
    <div>
      <h2>Predictions</h2>
      <ul>
        {predictions.map(prediction => (
          <li key={prediction.id}>
            <div>{prediction.text}</div>
            <div>{prediction.prediction}</div>
            <button onClick={() => handleDeletePrediction(prediction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PredictionList;
