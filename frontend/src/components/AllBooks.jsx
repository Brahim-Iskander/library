import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Chip,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function RecommendedBooks() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    // Fetch books from API
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/books");
        console.log("Books fetched:", response.data);
        // Ensure we always get an array
        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const categories = ["All", ...new Set(books.map((b) => b.category))];

  const filteredBooks = Array.isArray(books)
    ? books.filter((book) => {
        const matchSearch = book.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchCategory = category === "All" || book.category === category;
        return matchSearch && matchCategory;
      })
    : [];

  const borrowBook = async (bookId) => {
    try {
      const response = await axios.post(
        "http://localhost:8090/api/emprunts/borrow",
        null,
        {
          params: {
            email: user.email,
            bookId: bookId,
          },
        }
      );

      console.log("Borrow success:", response.data);
      alert("Book borrowed successfully!");

      // Update UI
      setBooks((prev) =>
        prev.map((b) =>
          b.id === bookId ? { ...b, available: b.available - 1 } : b
        )
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error borrowing book");
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
      {/* 🔎 SEARCH + FILTER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Search by title"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%", maxWidth: 300 }}
        />

        <TextField
          select
          label="Category"
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* 📚 BOOKS GRID */}
      <Grid container spacing={3}>
        {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "340px",
                  margin: "0 auto",
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={book.imageUrl || ""}
                  alt={book.title}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {book.title}
                    </Typography>

                    <Chip
                      label={book.available > 0 ? "Available" : "Not Available"}
                      sx={{
                        backgroundColor: book.available > 0 ? "#00c950" : "#ff3b3b",
                        color: "white",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {book.author}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {book.description || "No description available"}
                  </Typography>

                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AutoStoriesOutlinedIcon
                      fontSize="inherit"
                      sx={{ fontSize: 16, color: "gray" }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      {book.category}
                    </Typography>

                    <CalendarTodayIcon
                      fontSize="inherit"
                      sx={{ fontSize: 16, color: "gray", ml: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {book.publicationDate || "N/A"}
                    </Typography>
                  </Stack>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      width: "100%",
                      borderRadius: "8px",
                    }}
                    onClick={() => borrowBook(book.id)}
                    disabled={book.available === 0}
                  >
                    Borrow
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ m: 2 }}>
            No books found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}