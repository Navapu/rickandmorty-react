import { useState } from 'react'
import './App.css'
import { NavSearchParams } from './components/NavSearchParams'
import Characters from './pages/Characters'
import Episodes from './pages/Episodes'
import Locations from './pages/Locations'
function App() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "characters"

  let selectedpage;

  switch (page) {
    case "characters": selectedpage = <Characters />; break
    case "locations": selectedpage = <Locations />; break
    case "episodes": selectedpage = <Episodes />; break
  }
  return (
    <>
      <NavSearchParams />
      <main>
        {selectedpage}
      </main>
    </>
  )
}

export default App
