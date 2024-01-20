import './Landing.module.scss'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";

const Landing = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataIslogged());
  }, [dispatch]);

  return <>
    <div>Landing</div>
  </>
}

export default Landing