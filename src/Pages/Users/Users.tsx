/** @format */

import { defaultImage } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./Users.module.scss";
import { UsersData } from "@/Redux/Features/Users/GetUsersSlice";
import moment from "moment";
import PopupList from "@/Components/PopupList/PopupList";
import DeleteDialog from "@/Components/DeleteDialog/DeleteDialog";
import { useForm } from "react-hook-form";

const Users = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { handleSubmit } = useForm();

  useEffect(() => {
    getData();
  }, []);
  {
    /*Handle popup menu */
  }

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
    /* Dialog Modal  */
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(UsersData());
      // @ts-ignore
      setTableData(element.payload.data.users);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const tableBody: GridColDef[] = [
    {
      field: "userName",
      headerName: "UserName",
      width: 175,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 175,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 175,
      editable: false,
    },
    {
      field: "country",
      headerName: "Country",
      width: 175,
      editable: false,
    },

    {
      field: "role",
      headerName: "role",
      width: 175,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 175,
      editable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
        );
      },
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
            <PopupList
              handleClickMenu={handleClickMenu}
              handleCloseMenu={handleCloseMenu}
              anchorEl={anchorEl}
              handleOpenDialog={handleOpenDialog}
              // handleViewDialog={handleViewDialog}
              // moveToEdit={moveToEdit}
              id={_id}
            />
          </>
        );
      },
    },
  ];

  // PopupList

  return (
    <>
      <TableHeader
        title={"Users"}
        subTitle={"User"}
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
      />
    </>
  );
};

export default Users;
