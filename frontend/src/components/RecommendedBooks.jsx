import React from "react";
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
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A portrait of the Jazz Age in all of its decadence and excess.",
    category: "Classic",
    date: "1925",
    image: "https://images.pexels.com/photos/1907784/pexels-photo-1907784.jpeg",
    available: true,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel set in a totalitarian society under constant surveillance.",
    category: "Dystopian",
    date: "1949",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    available: false,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about the se and racial inequality.",
    category: "Classic",
    date: "1960",
    image: "https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg",
    available: true,
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about racial inequality.",
    category: "Classic",
    date: "1960",
    image: "https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg",
    available: true,
  },

  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel about the serious issues of rape and racial inequality.",
    category: "Classic",
    date: "1960",
    image: "https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg",
    available: true,
  },
];

export default function RecommendedBooks() {
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
                image={book.image}
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
                    label={book.available ? "Available" : "Not Available"}
                    sx={{
                      backgroundColor: book.available ? "#00c950" : "#ff3b3b",
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
                  {book.description}
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
                    {book.date}
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: "100%", borderRadius: "8px" }}
                  disabled={!book.available}
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
