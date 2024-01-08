/** @format */

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Container } from "@mui/system";
import * as React from "react";
import imgView2 from "../../Assets/Images/imgView.png";
import imgView1 from "../../Assets/Images/imgView1.png";
import imgView3 from "../../Assets/Images/imgView3.png";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  bedIcon,
  refigrator,
  livingroomIcon,
  showerIcon,
  tableIcon,
  tvIcon,
  wifiIcon,
} from "@/Assets/Images";

const baseUrl = `http://154.41.228.234:3000/`;

const ViewRoomDetails = ({ roomDetailsData }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = [imgView1, imgView2, imgView3];
  const iconImages1 = [bedIcon, refigrator, livingroomIcon, showerIcon];
  const iconImages2 = [tableIcon, tvIcon, wifiIcon, wifiIcon];
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const { roomNumber, price, Discount, Capacity, Category } = roomDetailsData;
  const data = [roomNumber, price, Discount, Capacity, Category];
  return (
    <>
      <Grid container spacing={2} style={{ height: "80vh" }}>
        <Grid md={8}>
          <ImageListItem
            style={{ textAlign: "center", height: "25rem", marginTop: "1em" }}
            className="mainImage"
          >
            <img
              style={{ width: "100%" }}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={images[currentImageIndex]}
              // alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        </Grid>
        <Grid md={4}>
          <ImageListItem style={{}}>
            {images.map((image, index) => (
              <img
                key={index}
                style={{ width: `${100 / 2}%`, marginTop: "1em" }}
                src={image}
                onClick={handleImageClick}
                loading="lazy"
                // alt={`Image ${index + 1} for ${room}`}
              />
            ))}
          </ImageListItem>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid md={6}>
          <>
            <Box>
              <Typography variant="h5" gutterBottom>
                About the place
              </Typography>
              <Typography variant="body1" gutterBottom>
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
              </Typography>
            </Box>
            <Box>
              {data.map((el, index) => (
                <ul key={index}>
                  <li>{el} </li>
                </ul>
              ))}
            </Box>

            {/* <Box style={{ textAlign: "end" }}>
              {iconImages1?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  style={{ margin: "1em 6em 1em 0" }}
                />
              ))}
            </Box>
            <Box style={{ textAlign: "end" }}>
              {iconImages2?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  style={{ margin: "1em 6em 1em 0" }}
                />
              ))}
            </Box> */}
          </>
        </Grid>
        <Grid md={6}></Grid>
      </Grid>
    </>
  );
};

export default ViewRoomDetails;
