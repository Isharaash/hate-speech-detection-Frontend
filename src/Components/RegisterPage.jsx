import React, { useState, useEffect } from 'react';
import './styles.css'; 

function PredictionList() {
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    // Fetch predictions when component mounts
    fetchPredictions();
  }, []);

  const fetchPredictions = () => {
    fetch('https://hate-speech-detection-backend-api.onrender.com/api/view_post', {
      method: 'GET',
      credentials: 'include' // Include credentials for cross-origin requests with cookies
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching predictions');
      }
      return response.json();
    })
    .then(data => {
      setPredictions(data.predictions);
    })
    .catch(error => {
      console.error('Error fetching predictions:', error);
    });
  };

  const handleDeletePrediction = (predictionId) => {
    fetch(`https://hate-speech-detection-backend-api.onrender.com/api/delete_post/${predictionId}`, {
      method: 'DELETE',
      credentials: 'include' // Include credentials for cross-origin requests with cookies
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting prediction');
      }
      // Update predictions after deletion
      fetchPredictions();
      // Display alert box for successful deletion
      alert('Content deleted successfully.');
    })
    .catch(error => {
      console.error('Error deleting prediction:', error);
    });
  };
  
  return (
    <div className="prediction-list-container">
      <h2>Posts</h2>
      <ul className="prediction-list">
        {predictions.map(prediction => (
          <li key={prediction.id} className="prediction-item">
            <div><span className="label">Text:</span> <span className="value">{prediction.text}</span></div><br/>
            <button onClick={() => handleDeletePrediction(prediction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PredictionList;
