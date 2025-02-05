
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import { Publish } from './pages/Publish'

const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Modify based on your auth logic
};

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/blog/:id"
            element={isAuthenticated() ? <Blog /> : <Navigate to="/signup" />}
          />
          <Route
            path="/blogs"
            element={isAuthenticated() ? <Blogs /> : <Navigate to="/signup" />}
          />
          <Route
            path="/publish"
            element={isAuthenticated() ? <Publish /> : <Navigate to="/signup" />}
          />
          <Route path="*" element={<Navigate to="/signup" />} /> {/* Default route */}
        </Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
