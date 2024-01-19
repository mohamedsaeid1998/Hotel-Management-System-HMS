/** @format */

import { defaultImage, imgView2, imgView3 } from "@/Assets/Images";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "./ViewDeatilsRoomStyle.scss";
import BreadcrumbsPages from "@/AdminPort/Pages/Breadcrumbs/Breadcrumbs";
declare module "@mui/material/styles" {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}
const ViewDetailsRoom = () => {
  const theme = createTheme({
    typography: {
      poster: {
        color: "#152C5B",
        textAlign: "center",
      },
      h3: undefined,
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            poster: "h1",
          },
        },
      },
    },
  });

  return (
    <Container fixed>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box style={{ margin: "2rem" }}>
          <Typography variant="poster">Village Angga</Typography>
          <Typography
            style={{ textAlign: "center", color: "gray" }}
            variant="inherit"
          >
            Bogor, Indonesia
          </Typography>
        </Box>
        <Box>
          <BreadcrumbsPages />
        </Box>
        <Box style={{ margin: "2rem" }}>{/* <Breadcrumbs /> */}</Box>
        <Box className="gridImage">
          <div className="gallery__img">
            <img src={imgView3} alt="" />
          </div>
          <div className="gallery__img">
            <img src={defaultImage} alt="" />
            <img src={imgView2} alt="" />
          </div>
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default ViewDetailsRoom;
