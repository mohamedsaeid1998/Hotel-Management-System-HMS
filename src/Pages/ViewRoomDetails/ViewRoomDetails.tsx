/** @format */

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Container } from "@mui/system";
import * as React from "react";
import imgView2 from "../../Assets/Images/imgView.png";
import imgView1 from "../../Assets/Images/imgView1.png";
import imgView3 from "../../Assets/Images/imgView3.png";

import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "@/utils/Custom/Custom";

const ViewRoomDetails = ({ roomDetailsData }) => {
  const { id } = useParams();
  const [detailsId, setDetailsId] = React.useState(id);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = [imgView1, imgView2, imgView3];
  console.log(roomDetailsData);
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ height: "80vh" }}>
        <ImageList>
          <ImageListItem style={{ textAlign: "center" }} className="mainImage">
            <img
              style={{ width: "100%" }}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={images[currentImageIndex]}
              // alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem style={{}}>
            {images.map((image, index) => (
              <img
                key={index}
                style={{ width: `${100 / images.length}%` }}
                src={image}
                onClick={handleImageClick}
                loading="lazy"
                // alt={`Image ${index + 1} for ${room}`}
              />
            ))}
          </ImageListItem>
        </ImageList>
        <Box>
          <Typography variant="h5" gutterBottom>
            About the place
          </Typography>
          <Typography variant="body1" gutterBottom>
            Minimal techno is a minimalist subgenre of techno music. It is
            characterized by a stripped-down aesthetic that exploits the use of
            repetition and understated development. Minimal techno is thought to
            have been originally developed in the early 1990s by Detroit-based
            producers Robert Hood and Daniel Bell.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ViewRoomDetails;
