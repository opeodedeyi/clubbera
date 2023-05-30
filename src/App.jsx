import Home from './pages/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import CreateClub from './pages/CreateClub/CreateClub';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './reset.css';
import './App.css';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Login />}/>
            <Route path="/createclub" element={<CreateClub />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
