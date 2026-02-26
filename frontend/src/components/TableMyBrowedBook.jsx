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

function createData(
  title,
  borrowDate,
  returnDate,
  status,
  Action,
) {
  return { title, borrowDate, returnDate, status,  Action };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "2026-01-15",
    "2026-02-20",
    "Returned",
    "5 days ago",
    "Return Again",
  ),
  createData(
    "Ice cream sandwich",
    "2026-02-21",
    "2026-03-01",
    "Late",
    "2 days ago",
    "Return Now",
  ),
  createData(
    "Eclair",
    "2026-02-22",
    "2026-03-02",
    "Active",
    "1 day ago",
    "Return Soon",
  ),
  createData(
    "Cupcake",
    "2026-02-23",
    "2026-03-03",
    "Returned",
    "3 days ago",
    "Return Again",
  ),
  createData(
    "Gingerbread",
    "2026-02-24",
    "2026-03-04",
    "Late",
    "4 days ago",
    "Return Now",
  ),
];

export default function DenseTable() {
  return (
    <>
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
                Borrow Date
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Return Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Time Remaining
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
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
<TableCell align="center">
  {Math.ceil(
    (new Date(row.returnDate) - new Date()) / (1000 * 60 * 60 * 24)
  ) > 0
    ? `${Math.ceil(
        (new Date(row.returnDate) - new Date()) / (1000 * 60 * 60 * 24)
      )} days remaining`
    : Math.ceil(
        (new Date(row.returnDate) - new Date()) / (1000 * 60 * 60 * 24)
      ) < 0
    ? `${Math.abs(
        Math.ceil(
          (new Date(row.returnDate) - new Date()) / (1000 * 60 * 60 * 24)
        )
      )} days ago`
    : "Due Today"}
</TableCell>
                <TableCell align="center">{row.Action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}
