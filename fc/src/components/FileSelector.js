import React, { useEffect } from 'react';
import axios from 'axios';

const folderPath = 'C:\\Users\\PILDO\\iCloudDrive\\iCloud~md~obsidian\\Tree of Ideas';

function FileSelector({ setFiles }) {
  useEffect(() => {
    axios.post('/api/list-files', { path: folderPath })
      .then(response => setFiles(response.data.files))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <p>Folder Path: {folderPath}</p>
    </div>
  );
}

export default FileSelector;
