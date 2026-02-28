import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TableHistoryUser from "../../components/TableHistoryUser";

export default function History() {
  const [emprunts, setEmprunts] = useState([]);
  const totalBorrowed = emprunts.length;

const ActiveLoan = emprunts.filter(
  (e) =>
    e.status === "borrowed" 
).length;

const lateReturns = emprunts.filter(
  (e) =>
    e.status === "borrowed" &&
    new Date() > new Date(e.returnDate)
).length;
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: "20px" }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
            Borrowing History

          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "gray", marginTop: "10px" }}
          >
View your complete borrowing history

          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box
              sx={{
                flex: "1 1 200px",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="p" component="h3">
                  Total Books Borrowed
{" "}
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {totalBorrowed}
                </Typography>
              </Box>
               
            </Box>
            <Box
              sx={{
                flex: "1 1 200px",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="p" component="h3">
Active Loans
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {ActiveLoan}
                </Typography>
              </Box>
                
            </Box>
            <Box
              sx={{
                flex: "1 1 200px",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="p" component="h3">
Late Returns
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {lateReturns}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
            <TableHistoryUser onDataLoaded={setEmprunts} />
        </Grid>
      </Grid>
    </Box>
  );
}
