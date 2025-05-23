import {Routes, Route } from "react-router";
import Characters from './pages/Characters'
import Episodes from './pages/Episodes'
import Locations from './pages/Locations'
import './App.css'
import { Navigation } from './components/Navigation'
function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route index element={<Characters />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='/episodes' element={<Episodes />} />
        </Routes>
      </main>
    </>
  )
}

export default App
