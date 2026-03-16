import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { Button } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function DenseTable() {
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const handleReturn = async (empruntId) => {
  try {
    await axios.put(
      `http://localhost:8090/api/emprunts/${empruntId}/return`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    // Update UI instantly (no reload)
    setRows((prev) =>
      prev.map((row) =>
        row.id === empruntId
          ? { ...row, status: "returned" }
          : row
      )
    );
  } catch (error) {
    console.error("Error returning book:", error.response || error);
  }
};

  useEffect(() => {
    const fetchEmprunts = async () => {
      if (!user?.token) return;
      try {
        const response = await axios.get("http://localhost:8090/api/emprunts/my", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching emprunts:", error.response || error);
      }
    };
    fetchEmprunts();
  }, [user]);

  const getDaysDiff = (returnDate) => {
    return Math.ceil((new Date(returnDate) - new Date()) / (1000 * 60 * 60 * 24));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="recent activity table">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Book Title</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Borrow Date</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Return Date</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Time Remaining</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {[...rows].reverse().map((row) => {
            const today = new Date();
            const returnDate = new Date(row.returnDate);
            const daysDiff = getDaysDiff(row.returnDate);

            // Determine status dynamically
            let statusLabel = "";
            let chipColor = "info";
            let actionText = "";

            if (row.status === "returned") {
              statusLabel = "Returned";
              chipColor = "success";
              actionText = "Returned";
            } else if (today > returnDate) {
              // Not returned & today is past return date → Late
              statusLabel = "Late";
              chipColor = "error";
              actionText = "Return Now";
            } else {
              // Borrowed and not overdue
              statusLabel = "Borrowed";
              chipColor = "warning";
              actionText = "Return Soon";
            }

            return (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.book?.title ?? "No title"}
                </TableCell>
                <TableCell align="left">{row.borrowDate}</TableCell>
                <TableCell align="left">{row.returnDate}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={statusLabel}
                    color={chipColor}
                    sx={{ fontWeight: "bold", textAlign: "center", width: 100 }}
                  />
                </TableCell>
                <TableCell align="center">
                  {daysDiff > 0
                    ? `${daysDiff} days remaining`
                    : daysDiff < 0
                      ? `${Math.abs(daysDiff)} days ago`
                      : "Due Today"}
                </TableCell>
<TableCell align="center">
  {row.status !== "returned" ? (
    <Button
      variant="contained"
      color={today > returnDate ? "error" : "primary"}
      size="small"
      onClick={() => handleReturn(row.id)}
    >
      Return Book
    </Button>
  ) : (
    <Chip label="Returned" color="success" size="small" />
  )}
</TableCell>              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}