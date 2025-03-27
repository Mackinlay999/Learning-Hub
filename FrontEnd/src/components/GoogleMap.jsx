import React from 'react'
import "../style/GoogleMap.css"
const GoogleMap = () => {
  return (
    <div>
      
      <div className="contact-page">
      {/* Google Map Image Section */}
      {/* <div className="map-container">
        <img
          src="./img/Map.png"
          alt="Google Map"
          className="map-image"
        />
      </div> */}


      <div className="form-container">
      <div className="image-content">
          <img src="https://tse2.mm.bing.net/th?id=OIP.-ZoOM1nW7Nhk50ZyRnBk_wHaE8&pid=Api&P=0&h=220" alt="Customer Support" className="content-image" />
        </div>
        <div className="g-form-content">
          <h2>Contact Us</h2>
          <form className='google-from'>
            <label>Name:</label>
            <input className='g-from' type="text" placeholder="Enter your name" required />
            
            <label>Email:</label>
            <input className='g-from' type="email" placeholder="Enter your username" required />
            
            <label>Phone Number:</label>
            <input className='g-from' type="tel" placeholder="Enter your number" required />


            <label>Filter by</label>
        <select className="g-select" >
          
          <option value="">Learning Domain</option>
          <option value="">HR</option>
          <option value="IT">Marketing</option>
          <option value="IT">Sales</option>
          <option value="IT">Business Analyst</option>
          <option value="Finance">Finance</option>
        </select>
            
            <button type="submit">Submit</button>





        


          </form>
        </div>
      </div>
      
     
      <div className="content-container">
        <div className="text-content">
          <h2>Contact Us</h2>
          <p>Let’s Connect,</p>
          <p>Have any questions? Feel free to reach out!</p>
          <p>📍 Headquarters: Bangalore, Karnataka</p>
          <p>📞 Phone: 09363352660</p>
          <p>📧 Email: harikrishg44@gmail.com</p>
          <p>🌐 Mackinlay Learning Hub.Com</p>
          <p></p>
        </div>
        
      </div>
      
      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
    </div>
  )
}

export default GoogleMap
