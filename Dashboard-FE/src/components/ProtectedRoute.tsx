import {useEffect, useState, ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  path: string; // Add the 'path' prop
  element: ReactNode;
}

function ProtectedRoute({ path, element }: ProtectedRouteProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // Make an API request to check login status here
    fetch('http://localhost:3000/check-auth')
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch((error) => {
        console.error('Error checking login status:', error);
      });
  }, []);

  if (isLoggedIn === null) {
    // Loading state
    return <div>Loading...</div>;
  } else if (isLoggedIn) {
    // User is logged in, render the provided element (Dashboard)
    return element;
  } else {
    // User is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
