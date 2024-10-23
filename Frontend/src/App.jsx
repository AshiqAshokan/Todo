import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar';
import UserRegistration from './Components/UserRegistration';
import UserPage from './Components/UserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div className="h-screen bg-white text-black" style={{ overflowX: 'hidden' }}>
      <ToastContainer />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <MainNavbar />
                <UserRegistration />
              </>
            } 
          />
          <Route 
            path="/userpage" 
            element={<UserPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
