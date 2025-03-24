import React from 'react'
import Navbar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css' //Bootstrap styles
import Home from "./components/Home"
import Footer from "./components/Footer"
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App