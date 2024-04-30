import React, { useState } from 'react';
import PredictionList from './PredictionList';
import './styles.css'; // Import CSS file

const Prediction = () => {
  const [text, setText] = useState('');
  const [predictionResult, setPredictionResult] = useState('');
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Key to force refresh PredictionList

  const handlePrediction = async () => {
    try {
      if (text.trim() === '') {
        alert('Please enter text for content.');
        return; // Stop further execution
      }
  
      const response = await fetch('https://hate-speech-detection-backend-api.onrender.com/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
        credentials: 'include', // Include credentials for session management
      });
      const data = await response.json();
      if (response.ok) {
        setPredictionResult(data.prediction);
        // Update the key to trigger refresh of PredictionList
        setRefreshKey(prevKey => prevKey + 1);
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
        placeholder="Enter text for content ..."
        rows={4}
        cols={50}
        required
      />
      <button className="prediction-button" onClick={handlePrediction}>Predict</button>
      {predictionResult && (
        <div>
          <h3>Prediction Result:</h3>
          <p>{predictionResult}</p>
        </div>
      )}
      <PredictionList key={refreshKey} /> {/* Refresh PredictionList */}
    </div>
  );
};

export default Prediction;
