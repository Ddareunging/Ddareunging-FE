import './App.css';
import './components/Map.css';
import React from 'react';
// import logo from './logo.svg';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import Home from './components/Home';
import CourseCommunity from './components/CourseCommunity';
import Map from './components/Map';
import MyPage from './components/MyPage';
import NavigationBar from './components/NavigationBar';
import CreateCourse from './components/CreateCourse'; 
import NotFound from './components/NotFound';

const CourseDetail = React.lazy(() => import('./components/CourseDetail'));

function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // const [message, setMessage] = useState([]);

  //   useEffect(() => {
  //       fetch("/hello")
  //           .then((response) => {
  //               return response.json();
  //           })
  //           .then(function (data) {
  //               setMessage(data);
  //           });
  //   }, []);

  return (
    <Router>
      {/* <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <ul>
                    {message.map((text, index) => <li key={`${index}-${text}`}>{text}</li>)}
                </ul>
            </header>
        </div> */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} /> */}
          {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<CourseCommunity />} />
          <Route path="/map" element={<Map />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/create-course" element={<CreateCourse />} /> 
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
        </Routes>
      </React.Suspense>
      <NavigationBar />
    </Router>
  );
}

export default App;
