import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, MasterLayout, NotFound } from './Components'
import { AddNewRoom, Ads, Bookings, ForgetPassword, Home, Login, Register, ResetPassword, Rooms, Users } from './Pages'
import Store from './Redux/Store'



function App() {

  const routes = createBrowserRouter([

    {
      path: "dashboard", element: <MasterLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Home /> },
        { path: 'users', element: <Users /> },
        { path: 'rooms', element: <Rooms /> },
        { path: 'add-New-Room', element: <AddNewRoom /> },
        { path: 'ads', element: <Ads /> },
        { path: 'bookings', element: <Bookings /> },
      ]
    },


    {
      path: '/', element: <AuthLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ]
    }


  ])

  return <>
    <Provider store={Store}>
      <RouterProvider router={routes} />
    </Provider>
  </>



}

export default App
