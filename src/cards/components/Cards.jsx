import React, { useState } from "react";
import CardComponent from "./card/CardComponent";
import { Container, Button, Box } from "@mui/material";

export default function Cards({ cards, handleDelete, handleLike, handleEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box>
      <Container sx={{ display: "flex", flexWrap: "wrap" }}>
        {currentCards.map((card) => (
          <CardComponent
            card={card}
            key={card._id}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleEdit={handleEdit}
          />
        ))}
      </Container>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Box
          sx={{
            margin: "0 20px",
            padding: "5px 15px",
            lineHeight: "36px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          Page {currentPage} of {totalPages}
        </Box>
        <Button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}