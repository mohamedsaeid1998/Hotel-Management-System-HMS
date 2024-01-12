/** @format */

import React from "react";
import {
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { indigo } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const PopupList = ({
  handleClickMenu,
  anchorEl,
  handleCloseMenu,
  handleEdit,
  handleViewDialog,
  handleOpenDialog,
  id,
}) => {
  const ITEM_HEIGHT = 48;
  const open = Boolean(anchorEl);

  return (
    <>
      {" "}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClickMenu(e, id)}
      >
        <MoreVertIcon />
      </IconButton>
      <MenuList>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleViewDialog}>
            <ListItemIcon style={{ color: indigo[500] }}>
              <VisibilityIcon />
            </ListItemIcon>
            View
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon style={{ color: indigo[500] }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpenDialog}>
            <ListItemIcon style={{ color: indigo[500] }}>
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </MenuList>
    </>
  );
};

export default PopupList;
