import React from 'react';

function FileList({ files, selectFile }) {
  return (
    <div>
      <h3>Files:</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => selectFile(file)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
