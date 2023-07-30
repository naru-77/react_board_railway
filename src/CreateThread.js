import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThreadContext from "./ThreadContext";

function CreateThread() {
  const [title, setTitle] = useState("");
  const { refreshThreads } = useContext(ThreadContext);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://virtserver.swaggerhub.com/INFO_3/BulletinBoardApplication/1.0.0/threads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title }),
        }
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);
      await refreshThreads();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>新着スレッド</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            display: "inline-block",
            marginLeft: "10px",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          作成
        </button>
      </form>
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "10px",
          backgroundColor: "#6c757d",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        ホームへ戻る
      </Link>
    </div>
  );
}

export default CreateThread;
