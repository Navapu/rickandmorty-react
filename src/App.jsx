import {Routes, Route } from "react-router";
import Characters from './pages/Characters'
import Episodes from './pages/Episodes'
import Locations from './pages/Locations'
import Home from "./pages/Home";
import './App.css'
import { Navigation } from './components/Navigation'
function App() {
  return (
    <div>
      <Navigation />
      <main>
        <Home/>
        <Routes>
          <Route path="/characters" element={<Characters />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='/episodes' element={<Episodes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
