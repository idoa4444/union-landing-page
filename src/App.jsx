import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import CommunityLandingPage from './pages/auth/CommunityLandingPage';
import TermsOfService from './pages/legal/TermsOfService';
import AccessibilityStatement from './pages/legal/AccessibilityStatement';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommunityLandingPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          <Route path="*" element={<CommunityLandingPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}
