import { defaultImage } from '@/Assets/Images';
import { TableHeader } from '@/Components';
import { RoomsData } from '@/Redux/Features/Rooms/GetRoomsSlice';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Rooms.module.scss';



const Rooms = () => {

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    // @ts-ignore
    let element = await dispatch(RoomsData())
    // @ts-ignore
    setTableData(element.payload.data.rooms)
  }

console.log(tableData);


const tableBody: GridColDef[] = [
  {
    field: 'roomNumber',
    headerName: 'RoomNumber',
    width: 180,
    editable: false,
    
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 180,
    editable: false,
  },
  {
    field: 'images',
    headerName: 'Image',
    width: 180,
    editable: false,
    renderCell: (params) => {
      return (params.formattedValue === "" || params?.row?.images[0] === undefined? <img className='img-table' src={defaultImage} alt="image" /> : <img className='img-table' crossOrigin='anonymous' src={`http://upskilling-egypt.com:3000/` + params?.row?.images[0]} alt="image" />)
    },
  },
  {
    field: 'discount',
    headerName: 'Discount',
    width: 180,
    editable: false,
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    width: 180,
    editable: false,
  },

  {
    field: "action",
    headerName: "Action",
    width: 180,
    renderCell: (params) => {
      const { id, name } = params.row;


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
<TableHeader title={"Rooms"} subTitle={"Room"} path={'/dashboard/add-new-room'}/>



{tableData.length>0 &&<DataGrid
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
  }
















































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
}

export default Rooms


