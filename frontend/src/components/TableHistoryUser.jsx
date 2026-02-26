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

function createData(title, author, borrowDate, returnDate, status) {
  return { title, author, borrowDate, returnDate, status };
}

const rows = [
  createData("Frozen yoghurt", "John Doe", "2026-01-15", "2026-02-20", "Returned"),
  createData("Ice cream sandwich", "Jane Smith", "2026-02-21", "2026-03-01", "Late"),
  createData("Eclair", "Alice Johnson", "2026-02-22", "2026-03-02", "Active"),
  createData("Cupcake", "Bob Brown", "2026-02-23", "2026-03-03", "Returned"),
  createData("Gingerbread", "Charlie Davis", "2026-02-24", "2026-03-04", "Late"),
];

export default function DenseTable() {
  return (
    <Box
      sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 3 }}
    >
     
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="recent activity table"
        >
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Book Title</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Author
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Borrow Date	
              </TableCell>
               <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Return Date	
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">{row.borrowDate}</TableCell>
                <TableCell align="left">{row.returnDate}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.status}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "100px",
                      border:
                        row.status === "Returned"
                          ? "1px solid green"
                          : row.status === "Late"
                            ? "1px solid red"
                            : "1px solid blue",
                      backgroundColor:
                        row.status === "Returned"
                          ? "rgba(0, 128, 0, 0.1)"
                          : row.status === "Late"
                            ? "rgba(255, 0, 0, 0.1)"
                            : "rgba(0, 0, 255, 0.1)",

                      color:
                        row.status === "Returned"
                          ? "green"
                          : row.status === "Late"
                            ? "red"
                            : "blue",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
