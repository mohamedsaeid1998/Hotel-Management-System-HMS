
import "./ImageCard.module.scss";
import { Box, IconButton, Typography } from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"
interface Props {
  ele: any;
  index: any;
  favList: any;
  deleteFavoriteItem: any;
  addItemToFavorite?: any;
  bookingGuestCount?: any;
  selectedDateRange?: any;
  disabled?: boolean;
}

const ImageCard = ({
  selectedDateRange,
  ele,
  index,
  favList,
  deleteFavoriteItem,
  addItemToFavorite,
  bookingGuestCount,
  disabled,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>


      <Box key={ele?.room?._id} className={`${index === 0 ? "main" : ""} here`}>
        <motion.div
          initial={{ opacity: 0, translateX: 50, translateY: -50 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 0.3, delay: index * 0.4 }}
        >
          <img
            className="RoomPicture"
            src={ele?.room?.images[0]}
            alt="RoomPicture"
          />
          {ele?.room?.discount ? (
            <Box
              className="discountLayer"
              fontSize={"clamp(.5rem, 2.5vw, 1rem) "}
            >
              {ele?.room?.discount}$ {t("perNight")}
            </Box>
          ) : null}
          <Box className="layer">
            <Box className="text ">
              <Typography variant="h6" className="roomName">
                {ele?.room?.roomNumber?.toUpperCase()}
              </Typography>
              <Box className="icons">
                {favList?.some(
                  (favorite: any) => favorite?._id === ele?.room?._id
                ) ? (
                  <IconButton
                    className="color opacity"
                    disabled={disabled}
                    onClick={() => deleteFavoriteItem(ele.room?._id)}
                  >
                    <Favorite color="error" />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      className="color"
                      disabled={disabled}
                      onClick={() => addItemToFavorite(ele?.room?._id)}
                    >
                      <Favorite />
                    </IconButton>
                  </>
                )}
                <IconButton
                  className="color"
                  onClick={() =>
                    navigate(`/room-details`, {
                      state: {
                        range: selectedDateRange,
                        persons: bookingGuestCount,
                        roomId: ele?.room?._id,
                      },
                    })
                  }
                >
                  <Visibility />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default ImageCard;
