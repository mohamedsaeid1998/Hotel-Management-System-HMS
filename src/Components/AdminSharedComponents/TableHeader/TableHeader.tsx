import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "./TableHeader.module.scss";
import { requestHeaders } from "@/utils/Custom/Custom";

interface IProps {
  title: string;
  subTitle: string;
  path: string;
}

const TableHeader = ({ title, subTitle, path }: IProps) => {
  const { pathname } = useLocation();
  return (
    <>
      <Box component="header" className="header">
        <Box className="headerContainer">
          <Box className="leftSec">
            <Typography variant="subtitle2" className="biggerSize">
              {title} Table Details
            </Typography>
            <Typography variant="body2" className="smallerSize">
              You can check all details
            </Typography>
          </Box>

          {pathname === "/dashboard/users" || pathname === "/dashboard/booking" ? (
            ""
          ) : (
            <Box>

            <Button color="primary" variant="contained" >
              <Link to={path} state={{ isEdit: false }} className="linkStyle"  >
                Add New {subTitle}
              </Link>
            </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TableHeader;

{
  /* <header className=" header-container rounded-3 ">
<div className="row py-3 pe-5 mt-3 align-items-center px-1 g-0  ">

  <div className="col-sm-10">

    <div className="px-3 text-white">
      <h3 className='fw-light capitalize'><span className="fw-bold h2">{title}</span>  {subTitle}</h3>

      <p className="fw-light mWidth">{para} {subPara}</p>
    </div>

  </div>

  <div className="col-sm-2">
    <div className='text-center'>

      <img src={pathname === "/dashboard" ? homeAvatar : usersAvatar} className='img-fluid headerImg' alt="headerBg" />
    </div>
  </div>

</div>
</header> */
}
