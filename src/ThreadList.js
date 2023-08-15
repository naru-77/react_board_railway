import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThreadContext from "./ThreadContext";

function ThreadList() {
  const { threads, setThreads } = useContext(ThreadContext);
  const navigate = useNavigate();

  const fetchThreads = async () => {
    try {
      // 1. fetch 関数でGETリクエストを送信して、レスポンス(Promise)を変数に格納する。
      const response = await fetch(
        "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads"
      );
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const data = await response.json();
      setThreads(data);
      //setThreadsを使って取得したデータをthreads状態に設定
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    }
  };

  const handleThreadClick = (threadId, title) => {
    navigate(`/thread/${threadId}/posts`, { state: { title } });
  };

  useEffect(() => {
    fetchThreads();
  }, []);
  //最初のレンダリングの後にAPIからスレッドのデータをフェッチする

  useEffect(() => {
    console.log(threads);
  }, [threads]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", flex: 1 }}>新着スレッド</h1>
        <Link to="/thread/new" className="newThreadLink">
          新規作成
        </Link>
      </div>
      <ul style={{ listStyleType: "none" }}>
        {threads.map((thread, index) => (
          <li
            key={index}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #dee2e6",
              borderRadius: "5px",
            }}
          >
            <div
              onClick={() => handleThreadClick(thread.id, thread.title)}
              style={{ cursor: "pointer" }}
            >
              <h2 style={{ marginBottom: "10px" }}>{thread.title}</h2>
            </div>
            {/* <p>ID: {thread.id}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
