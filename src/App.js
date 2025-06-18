import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import SearchResults from './pages/SearchResults';
import PropertyDetail from './pages/property/PropertyDetail';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout';

const App = () => (
  <Routes>
    {/* Public route - no layout */}
    <Route path="/login" element={<Login />} />

    {/* Protected routes wrapped in Layout */}
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/detail/:id" element={<PropertyDetail />} />
      </Route>
    </Route>

    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
