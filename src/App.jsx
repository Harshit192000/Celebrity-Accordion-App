import { useState } from "react";
import Accordion from "./components/Accordion.jsx";
import SearchBar from "./components/SearchBar.jsx";
import celebrityData from "./components/celebrities.json";

const App = () => {
  const [filteredData, setFilteredData] = useState(celebrityData);
  const [editingId, setEditingId] = useState(null);

  const handleSearch = (query) => {
    const filtered = celebrityData.filter((celeb) => {
      const fullName = `${celeb.first} ${celeb.last}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const handleEdit = (updatedCeleb) => {
    const updatedCelebs = filteredData.map((celeb) =>
      celeb.id === updatedCeleb.id ? updatedCeleb : celeb
    );
    setFilteredData(updatedCelebs);
    setEditingId(null); 
  };

  const handleDelete = (id) => {
    const updatedCelebs = filteredData.filter((celeb) => celeb.id !== id);
    setFilteredData(updatedCelebs);
  };

  return (
    <div className="container mx-auto py-8">
      <SearchBar onSearch={handleSearch} />
      {filteredData.map((celeb) => (
        <Accordion
          key={celeb.id}
          celeb={celeb}
          onEdit={handleEdit}
          onDelete={() => handleDelete(celeb.id)}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      ))}
    </div>
  );
};

export default App;
