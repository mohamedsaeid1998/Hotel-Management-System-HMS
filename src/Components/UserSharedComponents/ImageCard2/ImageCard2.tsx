
import './ImageCard2.module.scss'
import { Box, IconButton, Typography } from '@mui/material'
import { Favorite, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface Props {
  ele: any,
  index: any,
  favList: any,
  deleteFavoriteItem: any,
  addItemToFavorite?: any,
  bookingGuestCount?: any,
  selectedDateRange?:any
}


const ImageCard2 = ({selectedDateRange ,ele, index, favList, deleteFavoriteItem, addItemToFavorite, bookingGuestCount }: Props) => {

  const navigate = useNavigate()

  return <>

    <Box key={ele?._id} className={`${index === 0 ? "main" : ""} here`}>
      <img className='RoomPicture' src={ele?.images[0]} alt="RoomPicture" />
      {ele?.discount ? <Box className="discountLayer">{ele?.discount}$ per night</Box> : null}
      <Box className="layer"  >
        <Box className="text ">
          <Typography variant='h6' className="roomName">{ele?.roomNumber?.toUpperCase()}</Typography>
          <Box className="icons">
            {favList?.some((favorite: any) => favorite?._id === ele?._id) ?
              <IconButton className='color opacity'  onClick={() => deleteFavoriteItem(ele._id)}>
                <Favorite color='error' />
              </IconButton>
              :
              <IconButton className='color'  onClick={() => addItemToFavorite(ele?._id)}>
                <Favorite  />
              </IconButton>
            }
            <IconButton className='color' onClick={() => navigate(`/room-details`,{state:{range:selectedDateRange,persons:bookingGuestCount,roomId:ele?._id}})}>
              <Visibility  />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  </>
}

export default ImageCard2