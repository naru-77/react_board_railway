import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ThreadList from "./ThreadList";
import CreateThread from "./CreateThread";
import ThreadContext from "./ThreadContext";

function App() {
  const [threads, setThreads] = useState([]);

  const fetchThreads = async () => {
    const response = await fetch(
      "https://virtserver.swaggerhub.com/INFO_3/BulletinBoardApplication/1.0.0/threads"
    );
    const data = await response.json();
    console.log(data);
    setThreads(data);
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const refreshThreads = useCallback(() => {
    fetchThreads();
  }, []);

  return (
    <Router>
      <ThreadContext.Provider value={{ threads, setThreads, refreshThreads }}>
        <div
          className="App"
          style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
        >
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/thread/new" element={<CreateThread />} />
          </Routes>
          <Link
            to="/thread/new"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            新規作成
          </Link>
        </div>
      </ThreadContext.Provider>
    </Router>
  );
}

export default App;
