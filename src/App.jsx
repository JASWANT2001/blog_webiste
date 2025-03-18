import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", date: "", content: "", image: null });
  const [expandedPost, setExpandedPost] = useState(null);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts"));
    if (storedPosts) {
      setPosts(storedPosts);
    }
    const storedComments = JSON.parse(localStorage.getItem("blogComments"));
    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("blogPosts", JSON.stringify(posts));
    }
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("blogComments", JSON.stringify(comments));
  }, [comments]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addPost = () => {
    if (newPost.title && newPost.date && newPost.content && newPost.image) {
      const updatedPosts = [...posts, { id: posts.length + 1, ...newPost }];
      setPosts(updatedPosts);
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
      setNewPost({ title: "", date: "", content: "", image: null });
      setShowPopup(false);
    }
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    setExpandedPost(null);
  };

  const addComment = (postId, name, message) => {
    if (name && message) {
      const updatedComments = {
        ...comments,
        [postId]: [...(comments[postId] || []), { name, message }]
      };
      setComments(updatedComments);
      localStorage.setItem("blogComments", JSON.stringify(updatedComments));
    }
  };

  const selectedPost = posts.find(post => post.id === expandedPost);

  return (
    <div className="container">
      <header>
        <h1>My Blogs</h1>
        <button className="add-button" onClick={() => setShowPopup(true)}>+ Add Blog</button>
      </header>
      {showPopup && (
        <div className="popup">
          <div className="popup-content" style={{ padding: "40px" }}>
            <h2>Add New Blog</h2>
            <input type="text" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
            <input type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} />
            <textarea placeholder="Content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}></textarea>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={addPost}>Submit</button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="blog-container">
        {expandedPost === null ? (
          posts.map(post => (
            <div key={post.id} className="blog-card" onClick={() => setExpandedPost(post.id)}>
              <h3 className="blog-title-left">{post.title}</h3>
              <img src={post.image} alt={post.title} className="blog-image-large" />
              <p className="blog-date-left">Published on {post.date}</p>
            </div>
          ))
        ) : selectedPost ? (
          <div className="full-blog">
            <div className="full-blog-header">
              <div className="full-blog-title">
                <h2>{selectedPost.title}</h2>
                <p>Published on {selectedPost.date}</p>
              </div>
              <button className="delete-button" onClick={() => deletePost(expandedPost)}>🗑</button>
            </div>
            <button className="back-button" onClick={() => setExpandedPost(null)}>Back</button>
            <div className="image-container">
              <img src={selectedPost.image} alt={selectedPost.title} className="blog-image-full" />
            </div>
            <p className="blog-content">{selectedPost.content}</p>
            <div className="comments">
              <h3>Comments</h3>
              <ul>
                {(comments[expandedPost] || []).map((c, index) => (
                  <li key={index}><strong>{c.name}:</strong> {c.message}</li>
                ))}
              </ul>
              <div className="comment-inputs">
                <input type="text" placeholder="Your Name" id="comment-name" className="comment-name" />
                <textarea placeholder="Your Comment" id="comment-message" className="comment-message"></textarea>
              </div>
              <button onClick={() => addComment(expandedPost, document.getElementById("comment-name").value, document.getElementById("comment-message").value)}>Done</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
