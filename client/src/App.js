import React from 'react';
import './App.css';
// context
import { AuthProvider } from './context/auth-context';
// routes
import ApplicationRoutes from './ApplicationRoutes';
// ant design
import 'antd/dist/antd.css';

const App = () => {
  return (
    <AuthProvider>
      <ApplicationRoutes />
    </AuthProvider>
  );
};

export default App;
