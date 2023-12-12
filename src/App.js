import React, { useState, useEffect } from "react";
import { Input, Select, Pagination } from "antd";
import axios from "axios";
import Character from "../src/components/Character";
import _debounce from "lodash.debounce";

const { Option } = Select;

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${currentPage}&status=${statusFilter}&name=${nameFilter}`
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, statusFilter, nameFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const handleNameFilterChange = _debounce((value) => {
    setNameFilter(value);
  }, 300);

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <Input
          placeholder="Filter by name"
          onChange={(e) => handleNameFilterChange(e.target.value)}
          className="mr-4"
        />
        <Select
          placeholder="Filter by status"
          onChange={handleStatusFilterChange}
          className="w-32"
        >
          <Option value="alive">Alive</Option>
          <Option value="dead">Dead</Option>
        </Select>
      </div>
      <div className="flex flex-wrap justify-center">
        {characters.map((character) => (
          <Character
            key={character.id}
            name={character.name}
            image={character.image}
            status={character.status}
          />
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={characters.length}
        onChange={handlePageChange}
        className="my-4 flex justify-center"
      />
    </div>
  );
};

export default App;
