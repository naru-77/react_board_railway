import React, { createContext, useState, useEffect } from "react";

const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  const refreshThreads = async () => {
    try {
      const response = await fetch(
        "https://virtserver.swaggerhub.com/INFO_3/BulletinBoardApplication/1.0.0/threads?offset=0"
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
