import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayFilesScreen from './DisplayFilesScreen';
import FileContentScreen from './FileContentScreen';
import SelectFolderScreen from './SelectFolderScreen'; // Assuming you have this component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectFolderScreen />} />
        <Route path="/display-files" element={<DisplayFilesScreen />} />
        <Route path="/file-content/:fileName" element={<FileContentScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
