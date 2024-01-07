/** @format */

import { Box, Container } from "@mui/system";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import imgView1 from "../../Assets/Images/imgView1.png";
import imgView2 from "../../Assets/Images/imgView.png";
import imgView3 from "../../Assets/Images/imgView3.png";

import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ViewRoomDetails = () => {
  const [selectedImage, setSelectedImage] = React.useState(imgView1);
  const [secondaryImage, setSecondaryImage] = React.useState();
  const prevCountRef = React.useRef(selectedImage);
  const handleImageClick = (newImage) => {
    setSelectedImage(newImage.target.src);
  };
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <Container maxWidth="lg" style={{ height: "80vh" }}>
        <ImageList>
          <ImageListItem style={{ textAlign: "center" }} className="mainImage">
            <img
              style={{ width: "100%" }}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={selectedImage}
              // alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem style={{}}>
            <img
              style={{ width: "50%" }}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={prevCountRef !== imgView2 ? imgView2 : selectedImage}
              onClick={(e) => handleImageClick(e)}
              // alt={item.title}
              loading="lazy"
            />
            <img
              style={{ width: "50%" }}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={prevCountRef !== imgView3 ? imgView3 : selectedImage}
              onClick={(e) => handleImageClick(e)}
              // alt={item.title}
              loading="lazy"
            />
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
