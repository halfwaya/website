import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   addPageItem,
//   deletePageItem,
//   getPageItems,
//   PAGE_OPTIONS,
// } from "../../utils/contentStorage";
import "./style.css";
const AdminPage = () => {
  const [page, setPage] = useState("home");
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   setItems(getPageItems(page));
  // }, [page]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const value = reader.result;
      if (typeof value === "string") {
        setImagePreview(value);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      setError("Please enter text content.");
      return;
    }

    if (!imagePreview) {
      setError("Please upload an image.");
      return;
    }

    // addPageItem(page, {
    //   id: Date.now().toString(),
    //   page,
    //   text: text.trim(),
    //   image: imagePreview,
    //   createdAt: new Date().toISOString(),
    // });

    setItems(getPageItems(page));
    setText("");
    setImagePreview("");
    setError("");
  };

  // const handleDelete = (id) => {
  //   deletePageItem(page, id);
  //   setItems(getPageItems(page));
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Upload image content for Home, About, or Services pages.</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="dashboard-form-card">
        <form className="dashboard-form" onSubmit={handleSubmit}>
          <label>
            Select page
            <select
              value={page}
              onChange={(event) => setPage(event.target.value)}
            >
              {/* {PAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} */}
            </select>
          </label>

          <label>
            Upload image
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          {imagePreview && (
            <div className="preview-box">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <label>
            Text content
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter content for this page"
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button className="save-button" type="submit">
            Save Content
          </button>
        </form>
      </section>

      <section className="dashboard-items">
        <div className="dashboard-items-header">
          <h2>{page.charAt(0).toUpperCase() + page.slice(1)} Page Content</h2>
          <span>{items.length} item(s)</span>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            No content uploaded for this page yet.
          </div>
        ) : (
          <div className="content-grid">
            {items.map((item) => (
              <article key={item.id} className="content-card">
                {item.image && <img src={item.image} alt={item.text} />}
                <div className="content-card-body">
                  <p>{item.text}</p>
                  <div className="card-actions">
                    {/* <button type="button" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPage;
