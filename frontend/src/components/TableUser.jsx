import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { useUser } from "../context/UserContext";

export default function DenseTable({ onDataLoaded }) {
  const { user } = useUser();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEmprunts = async () => {
      if (!user?.token) return;

      try {
        const response = await axios.get(
          "http://localhost:8090/api/emprunts/my",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log("Response data:", response.data);
        // Map backend data to table format
        const tableData = response.data.map((emprunt) => ({
          title: emprunt.book.title,
          author: emprunt.book.author,
          borrowDate: emprunt.borrowDate,
          returnDate: emprunt.returnDate,
          status: emprunt.status,
        }));
        setRows(tableData);
        if (onDataLoaded) {
          onDataLoaded(response.data);
        }
      } catch (error) {
        console.error("Error fetching emprunts:", error.response || error);
      }
    };

    fetchEmprunts();
  }, [user]);

  

  return (
    <Box sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Recent Activity
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="recent activity table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Book Title</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Author</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Borrow Date</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Return Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.reverse().slice(-5).map((row) => (
              <TableRow
                key={row.title + row.borrowDate}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:hover": { backgroundColor: "#f0f0f0" } }}
              >
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">{row.borrowDate}</TableCell>
                <TableCell align="left">{row.returnDate}</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: row.status === "borrowed" ? "orange" : row.status === "returned" ? "green" : "blue" }}>{row.status === "borrowed" ? "Borrowed" : row.status === "returned" ? "Returned" : "Scheduled"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}