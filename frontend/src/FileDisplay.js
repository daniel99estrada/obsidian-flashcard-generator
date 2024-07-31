import React from 'react';

const FileDisplay = ({ file }) => {
  if (!file) {
    return <p>Select a file to view its content.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h2>{file.name}</h2>
      <pre>{file.content}</pre>
    </div>
  );
};

export default FileDisplay;
