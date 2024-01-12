import { TableHeader } from '@/Components';
import { FacilitiesData } from '@/Redux/Features/Facilities/FacilitiesSlice';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Bookings.module.scss'
const Bookings = () => {

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([])

  const getFacilitiesData = async () => {
    // @ts-ignore
    let element = await dispatch(FacilitiesData())
    // @ts-ignore
    setTableData(element.payload.data.facilities)
  }
console.log(tableData);

  useEffect(() => {
    getFacilitiesData()
  }, []);


const tableBody: GridColDef[] = [
  {
    field: 'name',
    headerName: 'facility Name',
    width: 290,
    editable: false,
    
  },
  // {
  //   field: 'createdBy',
  //   headerName: 'createdBy',
  //   width: 290,
  //   editable: false,
  //   renderCell: (params) => {
  //     return (console.log(params.row.createdBy))
  //   },
  // },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 290,
    editable: false,
    renderCell: (params) => {
      return <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
    }
  },

  {
    field: 'updatedAt',
    headerName: 'Updated At',
    width: 290,
    editable: false,
    renderCell: (params) => {
      return <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
    }
  },

  {
    field: "action",
    headerName: "Action",
    width: 290,
    renderCell: (params) => {
      // const { id, name } = params.row;


      return (<>
        <div className="action d-flex align-items-center gap-3 ">
          <div className="edit text-info pointer">
here
          </div>
          <div className="delete text-danger pointer" >
there          </div>
        </div>

      </>
      );
    },
  },
];

  return <>
<TableHeader title={"Facilities"} subTitle={"facility"} path={'/dashboard/add-new-facility'}/>



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

export default Bookings