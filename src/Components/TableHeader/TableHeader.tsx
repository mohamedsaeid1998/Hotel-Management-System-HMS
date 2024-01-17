/** @format */

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

          {pathname !== "/dashboard/users" ||
            ("/dashboard/booking" && (
              <Button color="primary" variant="contained">
                <Link to={path} state={{ isEdit: false }} className="linkStyle">
                  Add New {subTitle}
                </Link>
              </Button>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default TableHeader;
