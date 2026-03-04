import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Books from "../components/managebooks";

export default function History() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: "20px" }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
            Manege Books
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "gray", marginTop: "10px" }}
          >
            Here you can add, edit, or delete books in the library collection.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Books />
        </Grid>
        <Grid size={{ xs: 12 }}></Grid>
      </Grid>
    </Box>
  );
}
