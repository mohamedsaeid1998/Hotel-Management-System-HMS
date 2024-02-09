/** @format */

import { familyReview } from "@/Assets/Images";
import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import style from "./Landing.module.scss";
import { useTranslation } from "react-i18next";

const UsersReviews = () => {
  const { t, i18n } = useTranslation();
  return (
    // <Box className={style.reviewContainer}>
    //   <Box className={style.reviewImg}>
    //     <img src={familyReview} alt="user review" />
    //   </Box>
    //   <Box className={style.reviewContent}>
    //     <Typography
    //       style={{ color: "#152C5B", fontWeight: "600", marginBottom: "2rem" }}
    //     >
    //       {t("HappyFamily")}
    //     </Typography>
    //     <Rating name="read-only" value={5} readOnly />

    //     <Typography
    //       style={{
    //         color: "#152C5B",
    //         // fontWeight: "600",
    //         width: "60%",
    //         lineHeight: "1.2em",
    //         fontSize: "clamp(1.5rem,2.5vw,3rem)",
    //       }}
    //     >
    //       {t("HappyFamilyDes")}
    //     </Typography>
    //     <Typography color={"gray"} variant="caption">
    //       {t("HappyFamilyAuth")}
    //     </Typography>
    //   </Box>
    // </Box>

    <Box component="section" className="reviewSec">
      <Box className="reviewImg">

        <img src={familyReview} className="imgReview" alt="user review" />
      </Box>

      <Box className="reviewCon">
        <Typography className="reviewTitle">
          {t("HappyFamily")}
        </Typography>
        <Typography>
          <Rating className="stars" name="read-only" value={5} readOnly />
        </Typography>
        <Typography className="reviewDis">
          {t("HappyFamilyDes")}
        </Typography>
        <Typography color={"gray"} className="reviewCap" variant="caption">
          {t("HappyFamilyAuth")}
        </Typography>
      </Box>

    </Box >


  );
};

export default UsersReviews;
