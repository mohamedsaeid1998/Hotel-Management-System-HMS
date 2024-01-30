
import './ImageCard2.module.scss'
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


const ImageCard2 = ({ele,index,favList,deleteFavoriteItem,addItemToFavorite,startDate,endDate,bookingGuestCount}:Props) => {

  const navigate = useNavigate()
  
  return <>
  
          <Box key={ele?._id} className={`${index === 0 ? "main" : ""} here`}>
              <img  className='RoomPicture' src={ele?.images[0]} alt="RoomPicture" />
            {ele?.discount?<Box className="discountLayer">{ele?.discount}$ per night</Box>:null}
            <Box className="layer"  >
              <Box className="text ">
                <Typography variant='h6' className="roomName">{ele?.roomNumber?.toUpperCase()}</Typography>
                <Box className="icons">
                  {favList?.some((favorite: any) => favorite?._id === ele?._id) ?
                  
                    <Favorite color='error' onClick={() => deleteFavoriteItem(ele._id)} />
                    :
                    <Favorite onClick={() => addItemToFavorite(ele?._id)} />}

                  <Visibility onClick={() => navigate(`/room-details/startDate=${startDate}/endDate=${endDate}/persons=${bookingGuestCount}/id=${ele._id}`)} />
                </Box>
              </Box>
            </Box>
          </Box>
  </>
}

export default ImageCard2