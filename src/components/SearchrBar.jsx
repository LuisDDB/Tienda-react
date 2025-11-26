import { useState } from "react";

export function SearchrBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={query}
      onChange={handleChange}
      style={{
        padding: "10px",
        width: "100%",
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginBottom: "20px",
      }}
    />
  );
}
