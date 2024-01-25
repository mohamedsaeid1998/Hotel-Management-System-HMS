import { getFavorites } from "@/Redux/Features/Portal/Favorites/FavoritesSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import "./Favorites.module.scss";

const Favorites = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.FavoritesSlice);
  const getAllFavorites = data.map((item) => {
    return item;
  });
  const favoritesRooms = getAllFavorites[0]?.rooms;

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);
  return (
    <>
      <div>
        {favoritesRooms?.map((item) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image="" title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Favorites;
