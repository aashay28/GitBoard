import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Connections from './pages/Connections';

const App = () => {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    !loading && (
      <>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/connections' element={<Connections />} />
          <Route path='/profile/:user' element={<Profile />} />
        </Routes>
      </>
    )
  );
};

export default App;
