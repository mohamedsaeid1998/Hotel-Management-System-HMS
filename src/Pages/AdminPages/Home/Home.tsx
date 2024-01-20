import { useEffect } from "react";
import "./Home.module.scss";
import { useDispatch } from "react-redux";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataIslogged());
  }, [dispatch]);
  return (
    <>
      <div>Home</div>
    </>
  );
};

export default Home;
