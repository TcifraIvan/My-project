import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
const API_KEY = "7WoQVVfDMUtwU8cbQ70EmUGqLU8LWd6r5KuWHNhvj5yQxezYJErIwp5O";
const API_URL = "https://api.pexels.com/v1/search";
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchPhotos();
  }, [query, page]);
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: { query, page },
        headers: { Authorization: API_KEY }
      });
      const data = response.data;
      setPhotos(data.photos);
      setTotalPages(data.total_results / data.per_page);
    } catch (error) {
      console.error(error);
    }
  };
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <div className="App">
      <h1>Фотогалерея</h1>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Пошук фото"
      />
      <div className="photos">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.src.medium} alt={photo.photographer} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Попередня
        </button>
        <span>
          Page {page} of {Math.ceil(totalPages)}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Наступна
        </button>
      </div>
    </div>
  );
};
export default App;
