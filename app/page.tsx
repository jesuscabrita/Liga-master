import { CarrouselEquipos } from "@/components/Home/CarrouselEquipos";
import { Partidos } from "@/components/Home/Partidos";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <Grid item container>
      <CarrouselEquipos/>
      <Partidos/>
    </Grid>
  );
}