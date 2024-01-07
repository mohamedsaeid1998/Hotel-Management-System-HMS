import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RoomsData } from '@/Redux/Features/Rooms/GetRoomsSlice';
import { NoImage5 } from '@/Assets/Images';
import './Rooms.module.scss';
import { TableHeader } from '@/Components';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';


const Rooms = () => {

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    // @ts-ignore
    let element = await dispatch(RoomsData())
    // @ts-ignore
    console.log(element);
    
    setTableData(element.payload.data.rooms)
  }


  console.log(tableData);


  return <>
<TableHeader title={"Rooms"} subTitle={"Room"} path={'/dashboard/addNewRoom'}/>
    <TableContainer className='table'>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>RoomNumber</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Capacity</TableCell>
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
    </TableContainer>
  </>
}

export default Rooms