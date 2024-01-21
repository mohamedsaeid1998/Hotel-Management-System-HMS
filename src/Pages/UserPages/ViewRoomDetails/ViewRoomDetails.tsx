/** @format */

import {
  bedImg,
  defaultImage,
  imgView2,
  imgView3,
  bathroom,
  ic_livingroom,
  ic_tv,
  ic_wifi,
  ic_kulkas,
  ic_ac,
} from "@/Assets/Images";
import BreadcrumbsComponent from "@/Components/UserSharedComponents/NavBar/BreadcrumbsComponent";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import "./ViewRoomStyle.scss";

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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const ViewRoomDetails = () => {
  const images = [
    { src: bedImg, caption: `5 bedroom` },
    { src: bathroom, caption: `1 living room` },
    { src: ic_livingroom, caption: `3 bathroom` },
    { src: ic_tv, caption: `5 bedroom` },
    { src: ic_wifi, caption: `5 bedroom` },
    { src: ic_kulkas, caption: `5 bedroom` },
    { src: ic_ac, caption: `3 bathroom` },
    { src: ic_ac, caption: `3 bathroom` },
  ];
  return (
    <>
      <Container fixed>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box style={{ margin: "2rem" }}>
            <Typography variant="poster">Village Angga</Typography>
            <Typography variant="inherit">Bogor, Indonesia</Typography>
          </Box>
          <Box>
            <BreadcrumbsComponent />
          </Box>
          <Box style={{ margin: "2rem" }}>{/* <Breadcrumbs /> */}</Box>
          <Box
            className="gridImage"
            style={{ backgroundColor: "red", textAlign: "center" }}
          >
            <div className="gallery__img">
              <img src={imgView3} alt="" />
            </div>
            <div className="gallery__img">
              <img src={defaultImage} alt="" />
              <img src={imgView2} alt="" />
            </div>
          </Box>
          <Box>
            {" "}
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={6}>
                <Item>
                  <List>
                    <ListItem>
                      <ListItemText
                        // primary="  "
                        sx={{ marginY: 0 }}
                      >
                        <Typography>
                          Minimal techno is a minimalist subgenre of techno
                          music. It is characterized by a stripped-down
                          aesthetic that exploits the use of repetition and
                          understated development. Minimal techno is thought to
                          have been originally developed in the early 1990s by
                          Detroit-based producers Robert Hood and Daniel Bell.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText sx={{ marginY: 0 }}>
                        <Typography>
                          Such trends saw the demise of the soul-infused techno
                          that typified the original Detroit sound. Robert Hood
                          has noted that he and Daniel Bell both realized
                          something was missing from techno in the post-rave
                          era.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText sx={{ marginY: 0 }}>
                        <Typography>
                          Design is a plan or specification for the construction
                          of an object or system or for the implementation of an
                          activity or process, or the result of that plan or
                          specification in the form of a prototype, product or
                          process. The national agency for design: enabling
                          Singapore to use design for economic growth and to
                          make lives better.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                  <Grid container spacing={1}>
                    {images.slice(0, 4).map((image, index) => (
                      <Grid item key={index} xs={3}>
                        <img src={image.src} alt="" />
                        <Typography>{image.caption}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container spacing={1} style={{ margin: " 2em 0 " }}>
                    {images.slice(4, 8).map((image, index) => (
                      <Grid item key={index} xs={3}>
                        <img src={image.src} alt="" />
                        <Typography>{image.caption}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Grid>2</Grid>
              </Grid>

              <Grid xs={6}>
                <Item>4</Item>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default ViewRoomDetails;
