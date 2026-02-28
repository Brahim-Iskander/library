import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function DenseTable() {
  const { user } = useUser();
  const [rows, setRows] = useState([]);

  useEffect(() => {
  const fetchEmprunts = async () => {
    if (!user?.token) {
      console.log("No token, cannot fetch");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8090/api/emprunts/my",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log("Response data:", response.data); // <--- check this
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching emprunts:", error.response || error);
    }
  };

  fetchEmprunts();
}, [user]);

const getStatus = (emprunt) => {
  const today = new Date();
  const borrowDate = new Date(emprunt.borrowDate);
  const expectedReturnDate = new Date(emprunt.returnDate); // the scheduled return date

  if (expectedReturnDate < today) {
    // The expected return date has passed → overdue
    return <Chip label="Overdue" color="error" size="small" />;
  } else if (borrowDate <= today && today <= expectedReturnDate) {
    // Borrowed and not yet overdue
    return <Chip label="Borrowed" color="warning" size="small" />;
  } else {
    // Future borrow? (Optional, in case of future scheduling)
    return <Chip label="Scheduled" color="info" size="small" />;
  }
};
  console.log(rows);
  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Book Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Borrow Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Return Date</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {rows.map((row) => {
    console.log("Rendering row:", row);
    return (
      <TableRow key={row.id}>
        <TableCell>{row.book?.title ?? "no title"}</TableCell>
        <TableCell>{row.book?.author ?? "no author"}</TableCell>
        <TableCell>{row.borrowDate ?? "-"}</TableCell>
        <TableCell>{row.returnDate ?? "-"}</TableCell>
        <TableCell>{getStatus(row)}</TableCell>
      </TableRow>
    );
  })}
</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}