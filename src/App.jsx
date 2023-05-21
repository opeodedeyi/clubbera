import Home from './pages/Home';
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
