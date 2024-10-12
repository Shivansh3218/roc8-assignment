import React, { useState, useEffect } from "react";
import EmailList from "./components/EmailList";
import "./App.css"; // Import CSS for styling

const API_BASE_URL = "https://flipkart-email-mock.now.sh";

const App = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]); 
  const [filter, setFilter] = useState("unread");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEmails();
  }, [page]);

  const handleFavourite = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, favorite: !email.favorite } : email
      )
    );
  }
  // Fetch emails from the API
  const fetchEmails = async () => {
    const response = await fetch(`${API_BASE_URL}/?page=${page}`);
    const data = await response.json();
    setEmails((prevEmails) => [...prevEmails, ...data.list]);
  };

  // Update filtered emails whenever emails or filter changes
  useEffect(() => {
    const updatedFilteredEmails = emails.filter((email) => {
      if (filter === "read") return email.read;
      if (filter === "unread") return !email.read;
      if (filter === "favorites") return email.favorite;
      return true; // Show all if no filter is selected
    });
    setFilteredEmails(updatedFilteredEmails);
  }, [emails, filter]); // Dependencies for filtering

  const handleSelectEmail = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, read: true } : email
      )
    );
  };

  return (
    <div className="app">
      <nav className="filter-nav">
        <span>Filter By:</span>
        <button
          className={filter === "unread" ? "active" : ""}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
        <button
          className={filter === "read" ? "active" : ""}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
        <button
          className={filter === "favorites" ? "active" : ""}
          onClick={() => setFilter("favorites")}
        >
          Favorites
        </button>
      </nav>
      <main>
        <EmailList emails={filteredEmails} onSelectEmail={handleSelectEmail} handleFavourite={ handleFavourite} />

        {emails.length % 10 === 0 && (
          <button className="load-more" onClick={() => setPage(page + 1)}>
            Load More
          </button>
        )}
      </main>
    </div>
  );
};

export default App;
