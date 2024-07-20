import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileContent({ selectedFile }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedFile) {
      axios.post('/api/read-file', { file: selectedFile })
        .then(response => setContent(response.data.content))
        .catch(error => console.error(error));
    }
  }, [selectedFile]);

  const modifyContent = () => {
    axios.post('/api/modify-file', { content })
      .then(response => setContent(response.data.modifiedContent))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h3>File Content:</h3>
      <textarea value={content} onChange={e => setContent(e.target.value)} rows="10" cols="50" />
      <button onClick={modifyContent}>Modify Content</button>
    </div>
  );
}

export default FileContent;
