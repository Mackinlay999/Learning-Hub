import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import '../style/Register.css'; // Importing external CSS file

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [reEnteredPassword, setReenterPassword] = useState('');
    const [validateEmail, setValidateEmail] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);

    const handleRegistration = (e) => {
        e.preventDefault();
        if (name === '') return alert("The Name is required");
        if (email === '' || !validateEmail) return alert("Please Enter Valid Email ID");
        if (password === '' || password !== reEnteredPassword) return alert("Please Enter the same password in both fields");

        axios.post("/register", {username: name, email, password,  number })
            .then(() => {
                alert("User Created Successfully. Now You can login with those credentials");
                navigate('/Login');
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data.message); // ✅ match the key "message"
                } else {
                    alert("Registration failed");
                }
            });
            
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setValidateEmail(/^\S+@\S+\.\S+$/.test(e.target.value));
    }

    return (
        <div className="r-register-container">
            <div className="r-register-box">
                <h3>Create an account</h3>
                <form onSubmit={handleRegistration}>
                    <label>Name</label>
                    <input type="text" className="r-input" value={name} onChange={(e) => setName(e.target.value)} required />

                    <label>Email</label>
                    <input type="email" className="r-input" value={email} onChange={handleEmailChange} required />
                    {!validateEmail && email && <p className="r-error-text">*Enter a valid Email</p>}

                  

                    <label className='r-num'>Phone Number</label>
                    <input 
                        type="text" 
                        className="r-input" 
                        value={number} 
                        onChange={(e) => setNumber(e.target.value)} 
                        required 
                        pattern="^\d{10}$" 
                        maxLength="10"
                    />
                    

                    <label >Password</label>
                    <div className="r-password-container">
                        <input 
                            type={isPasswordVisible ? "text" : "password"} 
                            className="r-input" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button 
                            type="button" 
                            className="r-password-toggle" 
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <label>Re-Enter Password</label>
                    <div className="r-password-container">
                        <input 
                            type={isRePasswordVisible ? "text" : "password"} 
                            className="r-input" 
                            value={reEnteredPassword} 
                            onChange={(e) => setReenterPassword(e.target.value)} 
                            required 
                        />
                        <button 
                            type="button" 
                            className="r-password-toggle" 
                            onClick={() => setIsRePasswordVisible(!isRePasswordVisible)}
                        >
                            {isRePasswordVisible ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {reEnteredPassword && password !== reEnteredPassword && <p className="r-error-text">*Passwords do not match</p>}

                    <button type="submit" className="r-submit-btn">Create an account</button>
                </form>
                <p>Already have an account? <span className="r-login-link" onClick={() => navigate('/Login')}>Login here</span></p>
            </div>
        </div>
    );
}

export default Register;
