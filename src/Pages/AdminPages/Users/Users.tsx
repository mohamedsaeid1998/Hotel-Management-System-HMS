/** @format */

import { TableHeader } from "@/Components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { UsersData } from "@/Redux/Features/Users/GetUsersSlice";
import moment from "moment";
import "./Users.module.scss";
const Users = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [dispatch]);

  const getData = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(UsersData());
      // @ts-ignore
      setTableData(element.payload.data.users);
    } finally {
      setLoading(false);
    }
  };

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
      width: 90,
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
        path={"/dashboard/rooms/add-new/:id"}
      />

      <DataGrid
        className="dataGrid tableStyle"
        rows={tableData}
        columns={tableBody}
        rowSelectionModel={"server"}
        loading={loading}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        // slots={{ toolbar: GridToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //     quickFilterProps: { debounceMs: 500 },
        //   },
        // }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        // disableDensitySelector
        disableColumnSelector
      />
    </>
  );
};

export default Users;