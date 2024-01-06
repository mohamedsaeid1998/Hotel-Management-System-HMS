import "./Home.module.scss";

const Home = () => {
  console.log(localStorage.getItem("authToken"));
  return (
    <>
      <div>Home</div>
    </>
  );
};

export default Home;
