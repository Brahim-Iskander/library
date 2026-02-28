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

export default function DenseTable({ onDataLoaded }) {
  const { user } = useUser();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEmprunts = async () => {
      if (!user?.token) return;
      try {
        const response = await axios.get("http://localhost:8090/api/emprunts/my", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRows(response.data);
        if (onDataLoaded) {
          onDataLoaded(response.data);
        }
      } catch (error) {
        console.error("Error fetching emprunts:", error.response || error);
      }
    };
    fetchEmprunts();
  }, [user]);

  const getChipProps = (row) => {
    const today = new Date();
    const returnDate = new Date(row.returnDate);

    if (row.status === "returned") {
      return { label: "Returned", color: "success" };
    }
    // If not returned and overdue
    if (today > returnDate) {
      return { label: "Overdue", color: "error" };
    }
    // Otherwise, still borrowed
    return { label: "Borrowed", color: "warning" };
  };

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
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {[...rows].reverse().map((row) => {
              const chipProps = getChipProps(row);

              return (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f0f0f0" },
                    backgroundColor:
                      chipProps.color === "error" ? "rgba(255,0,0,0.05)" : "inherit",
                  }}
                >
                  <TableCell>{row.book?.title ?? "No title"}</TableCell>
                  <TableCell>{row.book?.author ?? "No author"}</TableCell>
                  <TableCell>{row.borrowDate ? new Date(row.borrowDate).toLocaleDateString() : "-"}</TableCell>
                  <TableCell>{row.returnDate ? new Date(row.returnDate).toLocaleDateString() : "-"}</TableCell>
                  <TableCell>
                    <Chip {...chipProps} size="small" sx={{ fontWeight: "bold", width: 100 }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}