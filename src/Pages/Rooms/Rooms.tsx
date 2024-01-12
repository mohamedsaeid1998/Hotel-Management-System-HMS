/** @format */

import { defaultImage } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import DeleteDialog from "@/Components/DeleteDialog/DeleteDialog";
import PopupList from "@/Components/PopupList/PopupList";
import ViewDialogModal from "@/Components/ViewDialogModal/ViewDialogModal";
import { RoomsData } from "@/Redux/Features/Rooms/GetRoomsSlice";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./Rooms.module.scss";
import "../../Styles/global.scss";

const Rooms = () => {
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit } = useForm();

  /*Handle popup menu */

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

  {
    /*get Room */
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(RoomsData());
      // @ts-ignore
      setTableData(element.payload.data.rooms);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

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
            <PopupList
              handleClickMenu={handleClickMenu}
              handleCloseMenu={handleCloseMenu}
              anchorEl={anchorEl}
              handleViewDialog={handleViewDialog}
              handleOpenDialog={handleOpenDialog}
              id={_id}
            />
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
        // style={{ height: "27rem" }}
        className="dataGrid tableStyle"
        rows={tableData}
        columns={tableBody}
        getRowId={(row) => row._id}
        rowSelectionModel={"server"}
        rowCount={2}
        loading={loading}
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
    </>
  );
};

export default Rooms;
