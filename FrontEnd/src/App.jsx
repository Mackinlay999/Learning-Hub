import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import CareerSupport from './components/CareerSupport'
import SuccessStory from './components/SuccessStory'
import About from './components/About'
import Contact from './components/Contact'
import NotFound from './components/NotFound' // For handling 404 pages
import './style/App.css' // Import custom styles
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap styles

import BlogTraining from './components/BlogTraining'
import Enterprise from './components/Enterprise'
import Webinars from './components/Webinars'
import Recruiters from './components/Recruiters'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career-support" element={<CareerSupport />} />
          <Route path="/success-story" element={<SuccessStory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog-training" element={<BlogTraining />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/for-recruiters" element={<Recruiters />} />
          <Route path="*" element={<NotFound />} />{' '}
          {/* Catch-all route for 404 pages */}
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
