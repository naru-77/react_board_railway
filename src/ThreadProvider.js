import React, { createContext, useState, useEffect } from "react";

const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  const refreshThreads = async () => {
    try {
      const response = await fetch(
        "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=0"
      );
      const data = await response.json();
      console.log("refreshing threads");
      setThreads(data);
    } catch (error) {
      setError(error.toString());
    }
  };

  useEffect(() => {
    refreshThreads();
  }, []);

  return (
    <ThreadContext.Provider value={{ threads, refreshThreads, error }}>
      {children}
    </ThreadContext.Provider>
  );
};

export default ThreadContext;
