import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import TableMyBrowedBook from "../../components/TableMyBrowedBook";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function History() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: "20px" }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
            My Borrowed Books
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "gray", marginTop: "10px" }}
          >
            Manage your currently borrowed books
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TableMyBrowedBook />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, p: 2, backgroundColor: "#fef2f2", borderRadius: "20px",border: "2px solid #fca5a5" }}>
            <BookOpenIcon
              style={{
                color: "Red",
                width: "50px",
                height: "50px",
              }}
            />
            <Box>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: "bold" }}
              >
                Late Return Notice
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You have overdue books. Please return them as soon as possible
                to avoid late fees.{" "}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
