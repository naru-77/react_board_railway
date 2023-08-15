import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreadList from "./ThreadList";
import CreateThread from "./CreateThread";
import ThreadContext from "./ThreadContext";
import ThreadPosts from "./ThreadPosts";
import "./App.css";

function App() {
  const [threads, setThreads] = useState([]);
  //掲示板のスレッドのリストを保持するthreadsという状態を作成。初期状態は空の配列です。setThreadsはこの状態を更新

  const refreshThreads = useCallback(() => {}, []);

  return (
    <Router>
      <ThreadContext.Provider value={{ threads, setThreads, refreshThreads }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/thread/new" element={<CreateThread />} />
            <Route path="/thread/:threadId/posts" element={<ThreadPosts />} />
          </Routes>
        </div>
      </ThreadContext.Provider>
    </Router>
  );
}

export default App;
