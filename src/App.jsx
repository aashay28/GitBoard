import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Dashboard/Projects";
import Calendar from "./pages/Calendar";

const App = () => {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
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
          <Route exact path="/" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </>
    )
  );
};

export default App;
