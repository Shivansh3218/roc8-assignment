import React from "react";

const Filters = ({ setFilter }) => (
  <div className="filters">
    <button onClick={() => setFilter("all")}>All</button>
    <button onClick={() => setFilter("read")}>Read</button>
    <button onClick={() => setFilter("unread")}>Unread</button>
    <button onClick={() => setFilter("favorites")}>Favorites</button>
  </div>
);

export default Filters;
