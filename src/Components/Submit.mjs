import React, { useState, useEffect } from 'react';

const Submit = () => {
  const [authLink, setAuthLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/login');
      const data = await response.json();
      setAuthLink(data.authLink);
    };

    fetchData();
  }, []);

  return (
    <div>
      <a href={authLink}>
        <button>Create Playlist</button>
      </a>
    </div>
  );
};

export default Submit;
