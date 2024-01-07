/** @format */

import { NoImage5 } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import { deleteRoom } from "@/Redux/Features/Rooms/DeleteRoomSlice";
import { RoomsData } from "@/Redux/Features/Rooms/GetRoomsSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { indigo } from "@mui/material/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Rooms.module.scss";

import DeleteModal from "@/Components/DeleteModal/DeleteModal";
import { useForm } from "react-hook-form";
import { ViewRoomDetails } from "..";

const Rooms = () => {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  {
    /*Handle delete slice */
  }
  const deleteRecord = useCallback(
    (el) => dispatch(deleteRoom(el.id)),
    [dispatch]
  );
  {
    /*Modal  */
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const element = await dispatch(RoomsData());
    setTableData(element.payload.data.rooms);
  };
  // const options = ["View,Edit,Delete"];
  {
    /*Delete Modal */
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setItemId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const viewDetailsHandler = (id: number) => {
    // alert(id);
    navigate("viewRoomDetails");
  };
  const data = { name: "John", age: 30 };

  return (
    <>
      <TableHeader title={"Rooms"} subTitle={"Room"} path={"/addNewRoom"} />
      <TableContainer className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RoomNumber</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((room) => (
              <TableRow key={room?._id}>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>
                  {room.images[0] === "" ? (
                    <img className="img-table" src={NoImage5} alt="images" />
                  ) : (
                    <img
                      className="img-table"
                      src={
                        `http://upskilling-egypt.com:3000/` + room?.images[0]
                      }
                      alt="image"
                    />
                  )}
                </TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.discount}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>
                  <div>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, room?._id)}
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
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                          },
                        }}
                      >
                        {" "}
                        {/* <span onClick={() => handleDelete(room?._id)}>Delete</span> */}
                        <MenuItem>
                          {/* <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("viewRoomDetails");
                              }}
                            >
                              <ListItemIcon>
                                <VisibilityIcon />
                              </ListItemIcon>
                              <ListItemText primary={"View"}></ListItemText>
                            </ListItemButton>
                          </ListItem> */}
                          <ListItemIcon style={{ color: indigo[500] }}>
                            <VisibilityIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <Link to={`viewRoomDetails/${room?._id}`}>
                              view
                            </Link>
                          </ListItemText>
                        </MenuItem>
                        <MenuItem
                        // key={option}
                        // selected={option === "Pyxis"}
                        // onClick={() => handleClose(room)}
                        >
                          <ListItemIcon style={{ color: indigo[500] }}>
                            <EditIcon />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem

                        // selected={option === "Pyxis"}

                        // onClick={() => handleClose(room)}
                        >
                          <ListItemIcon
                            style={{ color: indigo[500] }}
                            onClick={handleOpenDialog}
                          >
                            <DeleteOutlineIcon />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </Menu>
                    </MenuList>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        itemId={itemId}
        getData={getData}
        handleSubmit={handleSubmit}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
      />
    </>
  );
};

export default Rooms;
