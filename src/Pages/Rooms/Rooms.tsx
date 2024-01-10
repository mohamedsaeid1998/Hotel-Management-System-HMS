/** @format */

import { defaultImage } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import { RoomsData } from "@/Redux/Features/Rooms/GetRoomsSlice";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Rooms.module.scss";
import { indigo } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteOutlineOutlined, Edit } from "@mui/icons-material";

const Rooms = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [roomId, setRoomId] = useState();

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setRoomId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  {
    /*View Modal  */
  }
  const [roomDetailsData, setRoomDetailsData] = useState([]);
  const [viewRoom, setViewRoom] = useState(false);

  const viewDetailsHandler = async (id: number) => {
    setViewRoom(false);
    try {
      const response = await axios.get(
        `http://154.41.228.234:3000/api/v0/admin/rooms/${id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDYzODYzOSwiZXhwIjoxNzA1ODQ4MjM5fQ.dixSKzJg0GUeBzRrHxsbSqqYiv1ley3p3cXRmjGDr1Y`,
          },
        }
      );
      setRoomDetailsData(response.data.data?.room);
      setViewRoom(true);
    } catch (error) {
      console.error(error);
    }
  };
  {
    /*Delete Modal */
  }
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  {
    /* *************************************saaid******************************* */
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const element = await dispatch(RoomsData());
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
        const { id, name } = params.row;

        return (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, 2)}
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
                <MenuItem>
                  <ListItemIcon style={{ color: indigo[500] }}>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleOpenDialog}>
                  <ListItemIcon
                    style={{ color: indigo[500] }}
                    // onClick={handleOpenDialog}
                  >
                    <DeleteOutlineOutlined />
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
        path={"/dashboard/add-New-Room"}
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
      />

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
