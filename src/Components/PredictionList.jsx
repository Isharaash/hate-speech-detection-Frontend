import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import jQuery for AJAX
import './styles.css'; 
function PredictionList() {
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    // Fetch predictions when component mounts
    fetchPredictions();
  }, []);

  const fetchPredictions = () => {
    $.ajax({
      url: 'http://localhost:5000/api/view_post',
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
      url: `http://localhost:5000/api/delete_post/${predictionId}`,
      method: 'DELETE',
      xhrFields: {
        withCredentials: true // Include this option for cross-origin requests with cookies
      },
      success: () => {
        // Update predictions after deletion
        fetchPredictions();
        // Display alert box for successful deletion
        alert('Prediction deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting prediction:', error);
      }
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
