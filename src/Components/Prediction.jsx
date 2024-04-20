// Prediction.js

import React, { useState } from 'react';
import PredictionList from './PredictionList';
import './styles.css'; // Import CSS file

const Prediction = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handlePrediction = async () => {
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
        credentials: 'include', // Include credentials for session management
      });
      const data = await response.json();
      if (response.ok) {
        alert('Text: ' + data.text + '\nPrediction Result: ' + data.prediction);
        window.location.reload(); // Alert with prediction result
      } else {
        if (response.status === 401) {
          setError('Unauthorized access');
        } else {
          setError(data.error || 'An error occurred');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <div className="prediction-container">
      <h2 className="prediction-heading">Content :</h2>
      {error && <p className="error-message">{error}</p>}
      <textarea
        className="prediction-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for prediction..."
        rows={4}
        cols={50}
        required
      />
      <button className="prediction-button" onClick={handlePrediction}>Predict</button>
      <PredictionList />
    </div>
  );
};

export default Prediction;
