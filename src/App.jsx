import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CommunityLandingPage from './pages/auth/CommunityLandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommunityLandingPage />} />
        <Route path="*" element={<CommunityLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
