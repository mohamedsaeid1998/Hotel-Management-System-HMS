import { TableHeader } from '@/Components';
import { AdsData } from '@/Redux/Features/Ads/AdsSlice';
import { Chip, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Ads.module.scss';


const Ads = () => {

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([])

  const getAdsData = async () => {
    // @ts-ignore
    let element = await dispatch(AdsData())
    // @ts-ignore
    setTableData(element.payload.data.ads)
  }
  console.log(tableData);

  useEffect(() => {
    getAdsData()
  }, []);


  const tableBody: GridColDef[] = [
    {
      field: 'roomNumber',
      headerName: 'Room Number',
      width: 235,
      editable: false,
      renderCell: (params) => {
        return params?.row?.room?.roomNumber
      },
    },
    // {
    //   field: 'createdBy',
    //   headerName: 'createdBy',
    //   width: 235,
    //   editable: false,
    //   renderCell: (params) => {
    //     return (console.log(params.row.createdBy))
    //   },
    // },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 235,
      editable: false,
      renderCell: (params) => {
        return <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
      }
    },

    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 235,
      editable: false,
      renderCell: (params) => {
        return <span>{moment(params?.formattedValue).format("Do MMM YY")}</span>
      }
    },
    {
      field: 'isActive',
      headerName: 'Is Active ',
      width: 235,
      editable: false,
      renderCell: (params) => {

        return <Stack direction="row" spacing={1}>
        <Chip size="small" label={`${params.formattedValue}`} color={`${params.formattedValue === !!"true"? "success" : "error" }`} variant="filled" />
      </Stack>
        

      }
    },

    {
      field: "action",
      headerName: "Action",
      width: 235,
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
    <TableHeader title={"Ads"}  subTitle={"Ads"} path={'/dashboard/add-new-ads'} />



    <DataGrid
      className='dataGrid'
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
        }
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    // disableRowSelectionOnClick
    // disableColumnFilter
    // disableDensitySelector
    // disableColumnSelector
    />
  </>
}

export default Ads