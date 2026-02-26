import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AllBooks from "../../components/AllBooks";
export default function BrowseBook() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f0f0f0" }}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: "20px" }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: "bold" }}>
            Browse Books

          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "gray", marginTop: "10px" }}
          >
Discover and borrow books from our collection

          </Typography>
        </Grid>
        
        <Grid size={{ xs: 12 }}>
          
            
            <AllBooks />

        </Grid>

      </Grid>
    </Box>
  );
}
