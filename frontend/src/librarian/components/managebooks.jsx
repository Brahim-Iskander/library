import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";

const API_URL = "http://localhost:8090/api/librarian/books";

export default function BookDashboard() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [bookForm, setBookForm] = useState({ title: "", author: "", category: "", isbn: "", imageUrl: "", quantity: 1, available: 1, description: "", publicationDate: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch books
  const fetchBooks = async () => {
    const res = await axios.get(API_URL);
    setBooks(res.data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleOpen = (book = null) => {
    if (book) {
      setBookForm(book);
      setEditingId(book.id);
    } else {
      setBookForm({ title: "", author: "", category: "", isbn: "", imageUrl: "", quantity: 1, available: 1, description: "", publicationDate: "" });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => setBookForm({ ...bookForm, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, bookForm);
    } else {
      await axios.post(API_URL, bookForm);
    }
    fetchBooks();
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Book</Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.available}/{book.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(book)} color="info">Edit</Button>
                  <Button onClick={() => handleDelete(book.id)} color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? "Edit Book" : "Add Book"}</DialogTitle>
        <DialogContent>
          {["title","author","category","isbn","imageUrl","quantity","available","description","publicationDate"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field}
              name={field}
              type={field === "quantity" || field === "available" ? "number" : "text"}
              fullWidth
              variant="outlined"
              value={bookForm[field]}
              onChange={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}