import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DriverPage from './pages/DriverPage';
import VehiclePage from './pages/VehiclePage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/vehicle" element={<VehiclePage />} />
      </Routes>
    </Router>
  );
};

export default App;
