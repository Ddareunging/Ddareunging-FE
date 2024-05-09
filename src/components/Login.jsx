import React, { useEffect, useState } from 'react';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      console.log("Kakao SDK already initialized");
      setIsSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.onload = () => {
      window.Kakao.init(process.env.REACT_APP_KAKAO_REST_API_KEY);
      if (window.Kakao.isInitialized()) {
        console.log("Kakao SDK initialized");
        setIsSdkLoaded(true);
      }
    };
    script.onerror = () => {
      alert("Kakao SDK script failed to load.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    if (!isSdkLoaded) {
      alert("Kakao SDK not loaded. Please wait and try again.");
      return;
    }

    window.Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      success: function(authObj) {
        console.log(authObj);
        setIsLoggedIn(true); 
      },
      fail: function(err) {
        alert(JSON.stringify(err));
        setIsLoggedIn(false); 
      }
    });
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

