// Prediction.js
import React, { useState } from 'react';
import PredictionList from './PredictionList';


const Prediction = () => {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState('');
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
        setPrediction(data.prediction);
        // Refresh PredictionList after successful prediction
        window.location.reload(); // This will refresh the entire page
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
    <div>
      <h2>Prediction</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for prediction..."
        rows={4}
        cols={50}
        required
      />
      <button onClick={handlePrediction}>Predict</button>
      {prediction && (
        <div>
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
      <PredictionList/>
    </div>
  );
};

export default Prediction;

