import React, { lazy, useContext } from "react";
import './App.css';
import Home from "./Home";
import SignIn from "./SignIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Link
} from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Suspense } from "react";

const Register = lazy(()=> import('./Register'))

function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to='login'/>
    }

    return children

  }
  return (

   <Router>
    <Suspense fallback={<img src="https://giphy.com/embed/jAYUbVXgESSti" alt="img"/>}>
    <Routes>
      <Route exact path="/">
        <Route index element={
        <ProtectedRoute>
          {<Home/>}
        </ProtectedRoute>
        }/>
        <Route exact path="login" element={<SignIn/>}/>
        <Route exact path="register" element={<Register/>}/>
      </Route>
    </Routes>
    </Suspense>
   </Router>
  
  );
}

export default App;
