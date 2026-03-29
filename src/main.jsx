import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ── Union Visitor Tracking ──
;(function () {
  const SB_URL = 'https://spxffkvyromnqgbsvtsk.supabase.co'
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweGZma3Z5cm9tbnFnYnN2dHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMTI4OTQsImV4cCI6MjA4OTY4ODg5NH0.yB19wMg7lkz184eywxOcGI3jfIyqogO7zY5Cwr-9ZAU'
  const PROJECT = 'landing'
  // Persistent visitor ID — same person keeps same ID across visits
  if (!localStorage.getItem('_uvid')) localStorage.setItem('_uvid', crypto.randomUUID())
  const vid = localStorage.getItem('_uvid')
  const ua = navigator.userAgent
  const device = /Mobile|iPhone|Android.*Mobile/i.test(ua) ? 'mobile' : /Tablet|iPad/i.test(ua) ? 'tablet' : 'desktop'
  const browser = /Firefox/i.test(ua) ? 'Firefox' : /Edg/i.test(ua) ? 'Edge' : /Chrome/i.test(ua) ? 'Chrome' : /Safari/i.test(ua) ? 'Safari' : 'Other'
  const headers = { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Prefer: 'return=minimal' }
  const send = (path, type) => fetch(`${SB_URL}/rest/v1/visitor_events`, {
    method: 'POST', headers, keepalive: true,
    body: JSON.stringify({ project: PROJECT, session_id: vid, path, referrer: document.referrer || null, device_type: device, browser, screen_width: innerWidth, country: type || 'pageview' }),
  }).catch(() => {})
  // Track pageview once per page
  send(location.pathname, 'pageview')
  let last = location.pathname
  const origPush = history.pushState
  history.pushState = function () { origPush.apply(this, arguments); if (location.pathname !== last) { last = location.pathname; send(last, 'pageview') } }
  window.addEventListener('popstate', () => { if (location.pathname !== last) { last = location.pathname; send(last, 'pageview') } })
  // Heartbeat for live detection only — uses 'heartbeat' type so it won't count as a pageview
  setInterval(() => send(location.pathname, 'heartbeat'), 30000)
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
