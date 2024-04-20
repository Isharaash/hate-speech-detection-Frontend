import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import jQuery for AJAX

function PredictionList() {
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    // Fetch predictions when component mounts
    fetchPredictions();
  }, []);

  const fetchPredictions = () => {
    $.ajax({
      url: 'http://localhost:5000/api/predictions',
      method: 'GET',
      xhrFields: {
        withCredentials: true // Include this option for cross-origin requests with cookies
      },
      success: (data) => {
        setPredictions(data.predictions);
      },
      error: (error) => {
        console.error('Error fetching predictions:', error);
      }
    });
  };

  const handleDeletePrediction = (predictionId) => {
    $.ajax({
      url: `http://localhost:5000/api/delete_prediction/${predictionId}`,
      method: 'DELETE',
      xhrFields: {
        withCredentials: true // Include this option for cross-origin requests with cookies
      },
      success: () => {
        // Update predictions after deletion
        fetchPredictions();
      },
      error: (error) => {
        console.error('Error deleting prediction:', error);
      }
    });
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
