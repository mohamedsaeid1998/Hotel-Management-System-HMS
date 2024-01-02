import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ForgetPassword, Home, Login, Register, ResetPassword } from './Pages'
import { AuthLayout, MasterLayout, NotFound } from './Components'



  function App() {

const routes = createBrowserRouter([
  {
    path: '/', element: <AuthLayout />, errorElement: <NotFound />, children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
    ]
  },
  {
    path: 'dashboard', element: <MasterLayout />, errorElement: <NotFound />, children: [
      { index: true, element: <Home /> },
    ]
  },
])

return <>
  <RouterProvider router={routes} />
</>



}

export default App
