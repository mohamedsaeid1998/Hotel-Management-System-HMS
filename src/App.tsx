
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, MasterLayout, NotFound } from "./Components";
import ProtectedRoute from "./Components/Shared/ProtectedRoute/ProtectedRoute";
import UserLayout from "./Components/Shared/UserLayout/UserLayout";
import { AddNewAds, AddNewFacility, AddNewRoom, Ads, Bookings, Explore, Facilities, Favorites, ForgetPassword, Landing, Login, Register, ResetPassword, Reviews, RoomDetails, Rooms, StripePayment, Users, } from "./Pages";
import Store from "./Redux/Store";
const LazyLoading = React.lazy(() => import("./Pages/AdminPages/Home/Home"));
// import LoadingComponent from "./Components/Loading/Loading";


function App() {



  // /explore?startDate=${startDate}&endDate=${endDate}&person=${personsCount}
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserLayout />
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Landing /> },
        { path:'explore', element: <Explore /> },
        { path:'room-reviews', element: <Reviews /> },
        { path:'favorite-rooms', element: <Favorites /> },
        { path:'room-details', element: <RoomDetails /> },
        { path:'stripePayment/:id', element: <StripePayment /> },
      ]
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <React.Suspense fallback="Loading...">
              <LazyLoading />
            </React.Suspense>
        },
        { path: "users", element: <Users /> },
        { path: "rooms", element: <Rooms /> },
        { path: "rooms/add-new/", element: <AddNewRoom /> },
        { path: "rooms/add-new/:id", element: <AddNewRoom /> },
        { path: "room-facilities", element: <Facilities /> },
        {
          path: "room-facilities/add-new-facility",
          element: <AddNewFacility />,
        },
        {
          path: "room-facilities/update-facility/:id",
          element: <AddNewFacility />,
        },
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
