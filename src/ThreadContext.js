import React from "react";

const ThreadContext = React.createContext({
  threads: [],
  setThreads: () => {},
  refreshThreads: () => {},
});

export default ThreadContext;
