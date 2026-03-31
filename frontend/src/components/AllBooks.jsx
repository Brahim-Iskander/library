import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
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
  const [myEmprunts, setMyEmprunts] = useState([]); // ✅ NEW
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");
  const { user } = useUser();

  // 📚 Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/books");
        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // 👤 Fetch user's borrowed books
  useEffect(() => {
    const fetchMyEmprunts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8090/api/emprunts/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyEmprunts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyEmprunts();
  }, []);

  const categories = ["All", ...new Set(books.map((b) => b.category))];

  // ✅ FILTER (hide already borrowed books)
  const filteredBooks = Array.isArray(books)
    ? books.filter((book) => {
        const matchSearch = book.title
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchCategory =
          category === "All" || book.category === category;

       const isBorrowed = myEmprunts.some(
  (e) =>
    e.book?.id === book.id &&
    (e.returned === false || e.status?.toUpperCase() === "BORROWED")
);  

        return matchSearch && matchCategory && !isBorrowed;
      })
    : [];

  // 📥 Borrow book
 const borrowBook = async (bookId) => {
  try {
    // +15 days return date
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 15);

    await axios.post(
      "http://localhost:8090/api/emprunts/borrow",
      null,
      {
        params: {
          email: user.email,
          bookId: bookId,
          returnDate: returnDate.toISOString().split("T")[0],
        },
      }
    );

    // ✅ FIX: instant update so it disappears without refresh
    setMyEmprunts((prev) => [
      ...prev,
      {
        book: { id: bookId },
        returned: false,
        status: "BORROWED",
      },
    ]);

    // decrease stock instantly
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, available: b.available - 1 } : b
      )
    );

    setDialogMessage("Book borrowed successfully!");
    setDialogType("success");
    setOpenDialog(true);
  } catch (error) {
    console.error(error);
    setDialogMessage("Error borrowing book");
    setDialogType("error");
    setOpenDialog(true);
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
                        backgroundColor:
                          book.available > 0 ? "#00c950" : "#ff3b3b",
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

      {/* ✅ SAME DESIGN DIALOG */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "18px",
            padding: 2,
            minWidth: 320,
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          {dialogType === "success" ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#00c950" }} />
          ) : (
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "#ff3b3b" }} />
          )}
        </Box>

        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 22,
            color: dialogType === "success" ? "#00c950" : "#ff3b3b",
          }}
        >
          {dialogType === "success" ? "Success" : "Error"}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ fontSize: 15, color: "#555" }}>
            {dialogMessage}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
            sx={{
              borderRadius: "10px",
              px: 4,
              backgroundColor:
                dialogType === "success" ? "#00c950" : "#ff3b3b",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}