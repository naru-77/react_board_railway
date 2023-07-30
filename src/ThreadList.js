import React, { useContext, useEffect } from "react";
import ThreadContext from "./ThreadContext";

function ThreadList() {
  const { threads } = useContext(ThreadContext);

  useEffect(() => {
    console.log(threads);
  }, [threads]);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>新着スレッド</h1>
      {threads.map((thread, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #dee2e6",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>{thread.title}</h2>
          <p>ID: {thread.id}</p>
        </div>
      ))}
    </div>
  );
}

export default ThreadList;
