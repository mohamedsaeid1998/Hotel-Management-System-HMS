/** @format */

import { defaultImage } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Bookings.module.scss";
import { BookingData } from "@/Redux/Features/Booking/GetBookingSlice";
import moment from "moment";
import { Chip } from "@mui/material";

import "./Bookings.module.scss";
const Bookings = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // @ts-ignore
    let element = await dispatch(BookingData());
    // @ts-ignore
    setTableData(element.payload.data.booking);
  };

  console.log(tableData);

  const tableBody: GridColDef[] = [
    {
      field: "room",
      headerName: "Room Number",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return params.row.room === null ? "1002-5" : params.row.room;
      },
    },
    {
      field: "user",
      headerName: "User Name",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return params.row.room === null ? "Mohamed" : params.row.room;
      },
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 165,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params?.row?.startDate).format("Do MMM YY")}</span>
        );
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return <span>{moment(params?.row?.endDate).format("Do MMM YY")}</span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 165,
      editable: false,
      renderCell: (params) => {
        return params.formattedValue === "pending" ? (
          <Chip label={"pending"} size="small" color="warning" />
        ) : (
          params.formattedValue
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 165,
      renderCell: (params) => {
        const { id, name } = params.row;

        return (
          <>
            <div className="action d-flex align-items-center gap-3 ">
              <div className="edit text-info pointer">here</div>
              <div className="delete text-danger pointer">there </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <TableHeader title={"Booking"} subTitle={"Booking"} path={""} />

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
    </>
  );
};

export default Bookings;
