import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ArtistsAddNew from "../Pages/Artists/ArtistsAddNew";
import ArtistsApproved from "../Pages/Artists/ArtistsApproved";
import ArtistsPending from "../Pages/Artists/ArtistsPending";
import Login from "../Pages/Authentication/Login/Login";
import CategoriesAddNew from "../Pages/Categories/CategoriesAddNew";
import Collections from "../Pages/Categories/Collections";
import Featured from "../Pages/Categories/Featured";
import ECardFilter from "../Pages/Filters/ECardFilter";
import FiltersAddNew from "../Pages/Filters/FiltersAddNew";
import SnapchatFilter from "../Pages/Filters/SnapchatFilter";
import TiktokFilter from "../Pages/Filters/TiktokFilter";
import Home from "../Pages/Home/Home";
import StaffAddNew from "../Pages/Staff/StaffAddNew";
import UserAddNew from "../Pages/User/UserAddNew";
import UserProfile from "../Pages/User/UserProfile";
import WithdrawConfirmed from "../Pages/Withdraw/WithdrawConfirmed";
import WithdrawPending from "../Pages/Withdraw/WithdrawPending";
import WithdrawCancelled from "../Pages/Withdraw/WithdrawCancelled"
import PrivateRoutes from "../Routes/PrivateRoutes";
import StaffAll from "../Pages/Staff/StaffAll";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Main></Main>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      // edit users
      {
        path: "/userEdit",
        element: <UserAddNew></UserAddNew>,
      },

      // staff

      {
        path: "/staffAll",
        element: <StaffAll></StaffAll>,
      },

      {
        path: "/staffAddNew",
        element: <StaffAddNew></StaffAddNew>,
      },

      //filters

      {
        path: "/snapchatFilter",
        element: <SnapchatFilter></SnapchatFilter>,
      },

      {
        path: "/tiktokFilter",
        element: <TiktokFilter></TiktokFilter>,
      },

      {
        path: "/ecardFilter",
        element: <ECardFilter></ECardFilter>,
      },

      {
        path: "/filtersAddNew",
        element: <FiltersAddNew></FiltersAddNew>,
      },

      // artists

      {
        path: "/artistsPending",
        element: <ArtistsPending></ArtistsPending>,
      },

      {
        path: "/artistsApproved",
        element: <ArtistsApproved></ArtistsApproved>,
      },

      {
        path: "/artistsAddNew",
        element: <ArtistsAddNew></ArtistsAddNew>,
      },

      // categories

      {
        path: "/collections",
        element: <Collections></Collections>,
      },

      {
        path: "/featured",
        element: <Featured></Featured>,
      },

      {
        path: "/categoriesAddNew",
        element: <CategoriesAddNew></CategoriesAddNew>,
      },

      {
        path: "/withdrawPending",
        element: <WithdrawPending></WithdrawPending>,
      },

      {
        path: "/withdrawConfirmed",
        element: <WithdrawConfirmed></WithdrawConfirmed>,
      },
      
      {
        path: "/withdrawCancelled",
        element: <WithdrawCancelled></WithdrawCancelled>,
      },

      //user
      {
        path: "/profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: <p>404 Page</p>,
  },
]);
