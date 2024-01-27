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

import FeedbackComponent from "@/Components/UserSharedComponents/Feedback/FeedbackComponent";
import RatingComponent from "@/Components/UserSharedComponents/RatingComponent/RatingComponent";
import { styled } from "@mui/system";
import "./ViewRoomStyle.scss";
import { viewUserRoomDetails } from "@/Redux/UserPort/viewUserRoom/viewUserRoomDetailsSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingComponent from "@/Components/Shared/Loading/Loading";

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

const iconImages = [
  { src: bedImg, caption: `5 bedroom` },
  { src: bathroom, caption: `1 living room` },
  { src: ic_livingroom, caption: `3 bathroom` },
  { src: ic_tv, caption: `5 bedroom` },
  { src: ic_wifi, caption: `5 bedroom` },
  { src: ic_kulkas, caption: `5 bedroom` },
  { src: ic_ac, caption: `3 bathroom` },
  { src: ic_ac, caption: `3 bathroom` },
];

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
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  // color: theme.palette.text.secondary,
}));
const Booking = styled(Paper)(({ theme }) => ({
  // ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "start",
  // color: theme.palette.text.secondary,
}));

const ViewRoomDetails = () => {
  const [roomDetails, setRoomDetails] = useState({});
  const [roomDiscount, setRoomDiscount] = useState(0);
  const [isLoading, setLoading] = useState(null);
  const dispatch = useDispatch();

  const getRoomDetails = async () => {
    setLoading(true);
    try {
      const viewDetails = await dispatch(
        viewUserRoomDetails("65a906a3a5d9953dd42cf40a")
      );
      setRoomDetails(viewDetails?.payload?.data.room);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { _id, roomNumber, price, discount, capacity, images } = roomDetails;
  useEffect(() => {
    getRoomDetails();
  }, []);
  useEffect(() => {
    if (price !== 0) {
      const percentageDiscount = (discount / price) * 100;
      setRoomDiscount(percentageDiscount.toFixed(2));
    }
  }, [price]);
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
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
                <img src={images} alt="" />
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
                    {iconImages.slice(0, 4).map((image, index) => (
                      <Grid item key={index} xs={3}>
                        <img src={image.src} alt="" />
                        <Typography>{image.caption}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container spacing={1} style={{ margin: " 2em 0 " }}>
                    {iconImages.slice(4, 8).map((image, index) => (
                      <Grid item key={index} xs={3}>
                        <img src={image.src} alt="" />
                        <Typography>{image.caption}</Typography>
                      </Grid>
                    ))}
                  </Grid>
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
                        {price}
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
                        {roomDiscount} 20% Off
                      </Typography>
                      {/* <BookingCalender /> */}
                      <Typography variant="caption">Pick a Date</Typography>
                      <Typography>
                        You will pay $480 USD per 2 Person
                      </Typography>
                    </Booking>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Item sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                style={{ padding: "1.5rem" }}
              >
                <Grid xs={6}>
                  <Box style={{ marginBottom: "9ch" }}>
                    <RatingComponent roomID={"65aa752bcc8304619b0fd7e4"} />
                  </Box>
                </Grid>
                <Grid xs={6}>
                  <Box>
                    <Typography style={{ color: "#152C5B", fontWeight: 500 }}>
                      Add Your Comment
                    </Typography>
                  </Box>
                  <FeedbackComponent btnText={"Send"} />
                </Grid>
              </Grid>
            </Item>
          </ThemeProvider>
        </Container>
      )}
    </>
  );
};

export default ViewRoomDetails;
