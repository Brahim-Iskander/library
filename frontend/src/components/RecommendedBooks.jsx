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
  CircularProgress,
  Alert,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Adjust path as needed

export default function RecommendedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user || !user.id) {
        console.log("No user ID available:", user);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("User object:", user);
        console.log("User ID:", user.id);

        // Get token from user object
        const token = user.token;
        console.log("Token from user object:", token ? "exists" : "missing");

        const url = `http://localhost:8090/api/recommendations/${user.id}`;
        console.log("Calling URL:", url);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Recommendations data:", response.data);
        setBooks(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        if (err.response) {
          console.error("Response status:", err.response.status);
          console.error("Response data:", err.response.data);
          setError(`Server error: ${err.response.status}`);
        } else if (err.request) {
          setError("Cannot connect to server. Is the backend running?");
        } else {
          setError(`Request error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.id]);

  const handleBorrow = async (bookId) => {
    try {
      const token = user.token;
      await axios.post(
        `http://localhost:8090/api/emprunts/borrow?email=${user.email}&bookId=${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book borrowed successfully!");
      setBooks(books.filter(book => book.id !== bookId));
    } catch (err) {
      console.error("Error borrowing book:", err);
      alert("Failed to borrow book. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading recommendations...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (books.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No recommendations yet. Borrow some books to get personalized recommendations!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Recommended For You
      </Typography>

      <Grid container spacing={3}>
        {books.map((book) => (
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
                image={book.imageUrl || "https://images.pexels.com/photos/1907784/pexels-photo-1907784.jpeg"}
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
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
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
                    sx={{ marginLeft: "4px" }}
                  >
                    {book.category}
                  </Typography>
                  <CalendarTodayIcon
                    fontSize="inherit"
                    sx={{ fontSize: 16, color: "gray", ml: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {book.publicationDate || "Unknown"}
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: "100%", borderRadius: "8px" }}
                  disabled={book.available <= 0}
                  onClick={() => handleBorrow(book.id)}
                >
                  Borrow
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}