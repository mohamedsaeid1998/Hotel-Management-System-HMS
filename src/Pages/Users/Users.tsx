import { defaultImage } from '@/Assets/Images';
import { TableHeader } from '@/Components';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './Users.module.scss'
import { UsersData } from '@/Redux/Features/Users/GetUsersSlice';
import moment from 'moment';

const Users = () => {

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    // @ts-ignore
    let element = await dispatch(UsersData())
    // @ts-ignore
    setTableData(element.payload.data.users)
  }




const tableBody: GridColDef[] = [
  {
    field: 'userName',
    headerName: 'UserName',
    width: 175,
    editable: false,
    
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 175,
    editable: false,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 175,
    editable: false,
  },
  {
    field: 'country',
    headerName: 'Country',
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
      return <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
    }
  },
];



  return <>
<TableHeader title={"Users"} subTitle={"User"} path={'/dashboard/add-new-room'}/>



<DataGrid
    className='dataGrid'
    rows={tableData}
    columns={tableBody}
    getRowId={(row) => row._id}
    initialState={{
      pagination: {
        paginationModel: {
          pageSize:5,
        },
      },
    }}
    slots={{ toolbar: GridToolbar }}
    slotProps={{
      toolbar: {
        showQuickFilter: true,
        quickFilterProps: { debounceMs: 500 },
      }
    }}
    pageSizeOptions={[5,10]}
    checkboxSelection
    // disableRowSelectionOnClick
    // disableColumnFilter
    // disableDensitySelector
    // disableColumnSelector
    />
  </>
}

export default Users