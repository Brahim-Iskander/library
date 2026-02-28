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
import { useUser } from "../context/UserContext"; // your context

// Function to calculate status


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
          {rows.map((row) => {
            const status = getStatus(row.returnDate, row.actualReturnDate);
            const daysDiff = Math.ceil((new Date(row.returnDate) - new Date()) / (1000 * 60 * 60 * 24));

            return (
              <TableRow
                key={row.title + row.borrowDate}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <TableCell component="th" scope="row">{row.book?.title ?? "no title"}</TableCell>
                <TableCell align="left">{row.borrowDate}</TableCell>
                <TableCell align="left">{row.returnDate}</TableCell>

                <TableCell align="center">
                  <Chip
                    label={status}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "100px",
                      border:
                        status === "Returned"
                          ? "1px solid green"
                          : status === "Late"
                            ? "1px solid red"
                            : "1px solid blue",
                      backgroundColor:
                        status === "Returned"
                          ? "rgba(0, 128, 0, 0.1)"
                          : status === "Late"
                            ? "rgba(255, 0, 0, 0.1)"
                            : "rgba(0, 0, 255, 0.1)",
                      color:
                        status === "Returned"
                          ? "green"
                          : status === "Late"
                            ? "red"
                            : "blue",
                    }}
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
                  {status === "Late"
                    ? "Return Now"
                    : status === "Active"
                      ? "Return Soon"
                      : "Returned"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}