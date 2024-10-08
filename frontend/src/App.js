import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('/api/test/')
      .then(response => {
        setData(response.data); // Store the data in the state
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data from Backend</h1>
        {data ? (
          <div>
            <p>Message: {data.message}</p>
            <p>Status: {data.status}</p>
            <p>Data Array: {data.data.join(', ')}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;