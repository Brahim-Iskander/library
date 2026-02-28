import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import TableUser from "../../components/TableUser";
import RecommendedBooks from "../../components/RecommendedBooks";
import { useState } from "react";
export default function Dashbored() {
  const [emprunts, setEmprunts] = useState([]);
  const activeLoans = emprunts.filter(
  (e) => e.status === "borrowed"
).length;

const returnedBooks = emprunts.filter(
  (e) => e.status === "returned"
).length;

const lateBooks = emprunts.filter(
  (e) =>
    e.status === "borrowed" &&
    new Date(e.returnDate) < new Date()
).length;
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f0f0f0" }}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: "20px" }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "gray", marginTop: "10px" }}
          >
            Welcome back! Here's your library overview
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
                  Active Loan{" "}
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {activeLoans}
                </Typography>
              </Box>
                <BookOpenIcon
                  style={{
                    color: "blue",
                    width: "60px",
                    height: "60px",
                    padding: "10px",
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                    borderRadius: "10px",
                  }}
                />
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
                  Returned Books
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {returnedBooks}
                </Typography>
              </Box>
                <CheckCircleIcon
                  style={{
                    color: "green",
                    width: "60px",
                    height: "60px",
                    padding: "10px",
                    backgroundColor: "rgba(0, 128, 0, 0.1)",
                    borderRadius: "10px",
                  }}
                />
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
                  Late Books
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{ fontWeight: "bold" }}
                >
                  {lateBooks}
                </Typography>
              </Box>
              <InformationCircleIcon
                style={{
                  color: "red",
                  width: "60px",
                  height: "60px",
                  padding: "10px",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box>
            
            <RecommendedBooks />

          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
            <TableUser onDataLoaded={setEmprunts} />
        </Grid>
      </Grid>
    </Box>
  );
}
