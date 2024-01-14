/** @format */

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, MasterLayout, NotFound } from "./Components";
import {
  AddNewAds,
  AddNewFacility,
  AddNewRoom,
  Ads,
  Bookings,
  Facilities,
  ForgetPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  Rooms,
  Users,
} from "./Pages";
import Store from "./Redux/Store";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function App() {
  const routes = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "rooms", element: <Rooms /> },
        { path: "add-new-room", element: <AddNewRoom /> },
        { path: "add-new-room/:id", element: <AddNewRoom /> },
        { path: "room-facilities", element: <Facilities /> },
        { path: "add-new-facility", element: <AddNewFacility /> },
        { path: "add-new-facility/:id", element: <AddNewFacility /> },
        { path: "ads", element: <Ads /> },
        { path: "add-new-ads", element: <AddNewAds /> },
        { path: "add-new-ads/:id", element: <AddNewAds /> },
        { path: "booking", element: <Bookings /> },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={Store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}
export default App;
