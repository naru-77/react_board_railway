import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
// import ThreadContext from "./ThreadContext";
import "../src/App.css";

function ThreadPosts() {
  const { threadId } = useParams();
  // const { threads } = useContext(ThreadContext);
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const title = location.state ? location.state.title : "";

  const fetchPosts = () => {
    fetch(
      `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts?offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("APIからの投稿一覧データ:", data.posts);
        setPosts(data.posts);
      })
      .catch((error) => {
        setError("投稿の取得に失敗しました");
      });
  };

  const handlePostSubmit = () => {
    if (!newPost) return;

    const data = { post: newPost };
    fetch(
      `https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(() => {
        setNewPost("");
        fetchPosts();
      })
      .catch(() => {
        setError("投稿に失敗しました");
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [threadId, offset]);

  return (
    <div className="container">
      <div className="posts-content">
        <h2 style={{ marginBottom: "10px" }}>{title}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="post-list">
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="no-list-style">
                {post.post}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="post-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handlePostSubmit} className="post-newThreadLink">
          投稿
        </button>
        <Link to="/" className="backButtonStyle">
          戻る
        </Link>
      </div>
    </div>
  );
}

export default ThreadPosts;
