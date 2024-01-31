
import './ImageCard.module.scss'
import { Box, Typography } from '@mui/material'
import { Favorite, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface Props {
  ele:any,
  index:any,
  favList:any,
  deleteFavoriteItem:any,
  addItemToFavorite?:any,
  startDate?:any,
  endDate?:any,
  bookingGuestCount?:any,

}


const ImageCard = ({ele,index,favList,deleteFavoriteItem,addItemToFavorite,startDate,endDate,bookingGuestCount}:Props) => {

  const navigate = useNavigate()

  return <>
  
          <Box key={ele?.room?._id} className={`${index === 0 ? "main" : ""} here`}>
              <img  className='RoomPicture' src={ele?.room?.images[0]} alt="RoomPicture" />
            {ele?.room?.discount?<Box className="discountLayer">{ele?.room?.discount}$ per night</Box>:null}
            <Box className="layer"  >
              <Box className="text ">
                <Typography variant='h6' className="roomName">{ele?.room?.roomNumber?.toUpperCase()}</Typography>
                <Box className="icons">
                  {favList?.some((favorite: any) => favorite?._id === ele?.room?._id) ?
                  
                    <Favorite color='error' onClick={() => deleteFavoriteItem(ele.room?._id)} />
                    :
                    <Favorite onClick={() => addItemToFavorite(ele?.room?._id)} />}

                  <Visibility onClick={() => navigate(`/room-details/startDate=${startDate}/endDate=${endDate}/persons=${bookingGuestCount}/id=${ele?.room?._id}`)} />
                </Box>
              </Box>
            </Box>
          </Box>
  </>
}

export default ImageCard