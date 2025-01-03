import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import Link for navigation
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { jwtDecode } from "jwt-decode"
import Popover from './popover';

// import Popover from './Popover'; // Import your Popover component



  const Login = () => {
    const [state, setState] = useState({
      password: "",
      email: "",
    });
  
  // New state for modal
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [passwordChange, setPasswordChange] = useState({
  //   email: "",
  //   oldPassword: "",
  //   newPassword: "",
  //   confirmPassword: ""
  // });

    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setState({ ...state, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(state);
      
      axios.post("http://localhost:8080/login", state)
      .then((Res) => {
        console.log(Res);
        let a = jwtDecode(Res.data.token);
        console.log(a);
        localStorage.setItem("token", Res.data.token);
        navigate('/');
      })
        .catch((err) => {
          console.log(err)
          toast.error("Registration failed!"); 
        })
    }

    

  //   const submitPassword = (e) => {
  //     e.preventDefault();
  //     fetch(`http://localhost:8080/changepassword`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(passwordChange)
  //     })
  //     .then((Res) => Res.json())
  //     .then((Res) => {
  //       console.log(Res);
  //       toast.success("Password changed successfully!", { autoClose: 3000 });
  //       setModalOpen(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Error changing password.", { autoClose: 3000 });
  //     });
  //   };

  // // New function to handle password change input
  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswordChange({ ...passwordChange, [name]: value });
  // };

  // // New function to toggle modal
  // const toggleModal = () => {
  //   setModalOpen(!isModalOpen);
  // };

  return (
    <div className="login-container">
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={handleChange} name='email' required className="input-field" />
        <input type="password" placeholder="Password" onChange={handleChange} name='password' required className="input-field" />
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p> {/* Navigation to Signup */}
      {/* <button onClick={toggleModal} className="change-password-button">Change Password</button> Button to open modal */}

      {/* Modal for changing password */}
      {/* {isModalOpen && (
        <Popover
          isOpen={isModalOpen}
          onClose={toggleModal}
          onPasswordChange={handlePasswordChange}
          onSubmit={submitPassword}
          passwordChange={passwordChange}
        />
      )} */}
      <Popover/>
    </div>
  )
}

export default Login