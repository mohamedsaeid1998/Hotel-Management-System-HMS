/** @format */

import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const BreadcrumbsComponent = () => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          View Room
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
