/** @format */

import {
  bathroom,
  bedImg,
  defaultImage,
  ic_ac,
  ic_kulkas,
  ic_livingroom,
  ic_tv,
  ic_wifi,
  imgView2,
  imgView3,
} from "@/Assets/Images";
import BreadcrumbsComponent from "@/Components/UserSharedComponents/NavBar/BreadcrumbsComponent";
import {
  Box,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

import "./ViewRoomStyle.scss";
import BookingCalender from "@/Components/BookingCalender";
import axios from "axios";
import { useEffect, useState } from "react";
import RatingComponent from "@/Components/UserSharedComponents/RatingComponent/RatingComponent";
import FeedbackComponent from "@/Components/UserSharedComponents/Feedback/FeedbackComponent";

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
  // backgroundColor: theme.palette === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));
const Booking = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "start",
  // color: theme.palette.text.secondary,
}));

const ViewRoomDetails = () => {
  const [roomDeatisData, setRoomDetails] = useState([]);

  // const getRoomDetails = async () => {
  //   axios
  //     .get(
  //       `http://154.41.228.234:3000/api/v0/portal/rooms/65a81207a5d9953dd42cb59a`,
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNjdlN2RiNzVhYzQ5ODAzNTY5ZDYiLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzA2MDM1NTI0LCJleHAiOjE3MDcyNDUxMjR9.TDuGCM3aH7Vdk-0urEVoW6ztAeVjC_L4DqeTPzwcgNQ`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   getRoomDetails();
  // }, []);
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
          <Box className="gridImage" style={{ textAlign: "center" }}>
            <div className="gallery__img">
              <img src={imgView3} alt="" />
            </div>
            <div className="gallery__img">
              <img src={defaultImage} alt="" />
              <img src={imgView2} alt="" />
            </div>
          </Box>
          <Box>
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
                <Grid>
                  <Booking style={{ width: "487px", height: "550px" }}>
                    <Typography
                      style={{
                        color: "#152C5B",
                        fontWeight: "bolder",
                        fontSize: "clamp(1rem, 2.5vw, 2.5rem)",
                      }}
                    >
                      Start Booking
                    </Typography>
                    <Typography
                      style={{
                        color: "#1ABC9C",
                        fontSize: "clamp(2.5rem, 2.5vw, 1rem)",
                      }}
                      variant="caption"
                    >
                      <span>&#36;</span>
                      280
                    </Typography>
                    <span
                      style={{
                        fontSize: "clamp(2.5rem, 2.5vw, 1rem)",
                        color: "gray",
                        fontWeight: "275",
                        fontFamily: "Poppins",
                        marginLeft: ".5rem",
                      }}
                    >
                      Per night
                    </span>
                    <Typography
                      style={{
                        color: "red",
                        fontSize: "clamp(1rem, 2.5vw, .5rem)",
                      }}
                    >
                      Discount 20% Off{" "}
                    </Typography>
                    {/* <BookingCalender /> */}
                    <Typography variant="caption">Pick a Date</Typography>
                    <Typography>You will pay $480 USD per 2 Person</Typography>
                  </Booking>
                </Grid>
              </Grid>

              <Grid xs={12}>
                <Item>
                  <Grid xs={6}>
                    <RatingComponent />
                    <Box>
                      <FeedbackComponent />
                    </Box>
                  </Grid>
                  <Grid xs={6}></Grid>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default ViewRoomDetails;
