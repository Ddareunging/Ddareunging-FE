import React, { useEffect } from 'react';
import './Login.css';

function Login({ setIsLoggedIn }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    document.head.appendChild(script);

    script.onload = () => {
      window.Kakao.init(process.env.REACT_APP_KAKAO_REST_API_KEY);
      if (window.Kakao.isInitialized()) {
        console.log("Kakao SDK initialized");
      }
    };

    return () => document.head.removeChild(script);
  }, []);

  const handleLogin = async () => {
    try {
      window.Kakao.Auth.login({
        success: function(authObj) {
          console.log(authObj);
          setIsLoggedIn(true);
          window.location.href = process.env.REACT_APP_KAKAO_REDIRECT_URI; 
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <img className="img" src="/logo.png" alt="logo" />
      <button className="login-button" onClick={handleLogin}>
        <img src="kakao_login_medium_wide.png" alt="Kakao login" />
      </button>
    </div>
  );  
}

export default Login;
