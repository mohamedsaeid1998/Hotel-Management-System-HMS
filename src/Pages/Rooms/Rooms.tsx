/** @format */

import { defaultImage } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import { RoomsData } from "@/Redux/Features/Rooms/GetRoomsSlice";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Rooms.module.scss";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { indigo } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteDialog from "@/Components/DeleteDialog/DeleteDialog";
import { useForm } from "react-hook-form";
import ViewDialogModal from "@/Components/ViewDialogModal/ViewDialogModal";
import { Link, useNavigate } from "react-router-dom";

const Rooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const { handleSubmit } = useForm();

  {
    /*Handle popup menu */
  }

  const ITEM_HEIGHT = 48;
  const open = Boolean(anchorEl);
  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    setRoomId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  {
    /*************popUp************** */
  }
  {
    /* Dialog Modal  */
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };
  const handleCloseDialog = () => setOpenDialog(false);
  {
    /*view dialog */
  }
  const handleViewDialog = () => {
    setOpenViewDialog(true);
    setAnchorEl(null);
  };
  const handleCloseViewDialog = () => setOpenViewDialog(false);
  {
    /*Edit */
  }
  const handleEdit = () => {
    navigate(`/dashboard/add-new-room/${roomId}`, { state: { isEdit: true } });
  };
  {
    /*get Room */
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // @ts-ignore
    let element = await dispatch(RoomsData());
    // @ts-ignore
    setTableData(element.payload.data.rooms);
  };

  const tableBody: GridColDef[] = [
    {
      field: "roomNumber",
      headerName: "RoomNumber",
      width: 180,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 180,
      editable: false,
    },
    {
      field: "images",
      headerName: "Image",
      width: 180,
      editable: false,
      renderCell: (params) => {
        return params.formattedValue === "" ||
          params?.row?.images[0] == undefined ? (
          <img className="img-table" src={defaultImage} alt="image" />
        ) : (
          <img
            className="img-table"
            crossOrigin="anonymous"
            src={`http://upskilling-egypt.com:3000/` + params?.row?.images[0]}
            alt="image"
          />
        );
      },
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 180,
      editable: false,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 180,
      editable: false,
    },

    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        const { _id } = params.row;
        return (
          <>
            <DeleteDialog
              getData={getData}
              handleCloseDialog={handleCloseDialog}
              openDialog={openDialog}
              handleSubmit={handleSubmit}
              itemId={roomId}
            />
            <ViewDialogModal
              itemId={roomId}
              handleClose={handleCloseViewDialog}
              open={openViewDialog}
            />
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => handleClickMenu(e, _id)}
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
      },
    },
  ];

  return (
    <>
      <TableHeader
        title={"Rooms"}
        subTitle={"Room"}
        path={"/dashboard/add-new-room"}
      />
      <DataGrid
        className="dataGrid"
        rows={tableData}
        columns={tableBody}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // disableRowSelectionOnClick
        // disableColumnFilter
        // disableDensitySelector
        // disableColumnSelector
      />{" "}
      {/* <TableContainer className='table'>
      <Table>

        <TableHead>
          <TableRow>

          </TableRow>
        </TableHead>





        <TableBody >
          {tableData?.map((room)=><TableRow>
        <TableCell>{room.roomNumber}</TableCell>
        <TableCell>{room.images[0] === ""? <img className='img-table' src={NoImage5} alt="images" /> : <img className='img-table' src={`http://upskilling-egypt.com:3000/` + room?.images[0]} alt="image" />}</TableCell>
        <TableCell>{room.price}</TableCell>
        <TableCell>{room.discount}</TableCell>
        <TableCell>{room.capacity}</TableCell>
      </TableRow>
          )}

        </TableBody>
      </Table>
    </TableContainer> */}
    </>
  );
};

export default Rooms;
