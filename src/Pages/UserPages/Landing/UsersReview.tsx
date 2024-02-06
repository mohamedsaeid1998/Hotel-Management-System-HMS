/** @format */

import React from "react";
import { Box, Typography } from "@mui/material";
import { familyReview } from "@/Assets/Images";
import Rating from "@mui/material/Rating";
import style from "./Landing.module.scss";

const UsersReviews = () => {
  return (
    <Box className={style.reviewContainer}>
      <Box className={style.reviewImg}>
        <img src={familyReview} alt="user review" />
      </Box>
      <Box className={style.reviewContent}>
        <Typography
          style={{ color: "#152C5B", fontWeight: "600", marginBottom: "2rem" }}
        >
          Happy Family
        </Typography>
        <Rating name="read-only" value={5} readOnly />

        <Typography
          style={{
            color: "#152C5B",
            // fontWeight: "600",
            width: "60%",
            lineHeight: "1.2em",
            fontSize: "clamp(1.5rem,2.5vw,3rem)",
          }}
        >
          What a great trip with my family and I should try again next time soon
          ...
        </Typography>
        <Typography color={"gray"} variant="caption">
          Angga, Product Designer
        </Typography>
      </Box>
    </Box>
  );
};

export default UsersReviews;
