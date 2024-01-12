/** @format */

import { TableHeader } from "@/Components";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { UsersData } from "@/Redux/Features/Users/GetUsersSlice";
import moment from "moment";
import "./Users.module.scss";

const Users = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

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
  ];

  // PopupList

  return (
    <>
      <TableHeader
        title={"Users"}
        subTitle={"User"}
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
      />
    </>
  );
};

export default Users;
