/** @format */

import {
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
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RoomsData } from "@/Redux/Features/Rooms/GetRoomsSlice";
import { NoImage5 } from "@/Assets/Images";
import "./Rooms.module.scss";
import { TableHeader } from "@/Components";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { indigo } from "@mui/material/colors";
const Rooms = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // @ts-ignore
    let element = await dispatch(RoomsData());
    // @ts-ignore
    setTableData(element.payload.data.rooms);
  };
  const options = ["View,Edit,Delete"];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id: number) => {
    setAnchorEl(null);
    console.log(id);
  };
  const handleDelete = (id: number) => {
    console.log(id);
  };
  return (
    <>
      <TableHeader
        title={"Rooms"}
        subTitle={"Room"}
        path={"/dashboard/addNewRoom"}
      />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((room) => (
              <TableRow>
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
                      onClick={handleClick}
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
                        <MenuItem
                          // key={option}
                          // selected={option === "Pyxis"}
                          onClick={() => handleClose(room?._id)}
                        >
                          <ListItemIcon style={{ color: indigo[500] }}>
                            <VisibilityIcon />
                          </ListItemIcon>
                          <ListItemText>view</ListItemText>
                        </MenuItem>
                        <MenuItem
                          // key={option}
                          // selected={option === "Pyxis"}
                          onClick={() => handleClose(room?._id)}
                        >
                          <ListItemIcon style={{ color: indigo[500] }}>
                            <EditIcon />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem
                          // selected={option === "Pyxis"}
                          onClick={() => handleClose(room?._id)}
                        >
                          <ListItemIcon style={{ color: indigo[500] }}>
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Rooms;
