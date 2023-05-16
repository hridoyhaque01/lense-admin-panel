import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ArtistsAddNew from "../Pages/Artists/ArtistsAddNew";
import ArtistsApproved from "../Pages/Artists/ArtistsApproved";
import ArtistsPending from "../Pages/Artists/ArtistsPending";
import Login from "../Pages/Authentication/Login/Login";
import CategoriesAddNew from "../Pages/Categories/CategoriesAddNew";
import Collections from "../Pages/Collection/Collections";
import Platform from "../Pages/Categories/Platform";
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
import UserAll from "../Pages/User/UserAll";
import UserEdit from "../Pages/EditPages/UserEdit";
import StaffEdit from "../Pages/EditPages/StaffEdit";
import ArtistsEdit from "../Pages/EditPages/ArtistsEdit";
import CollectionAddNew from "../Pages/Collection/CollectionAddNew";
import FiltersEdit from "../Pages/EditPages/FiltersEdit";
import CollectionEdit from "../Pages/EditPages/CollectionEdit";
import PlatformEdit from "../Pages/EditPages/PlatformEdit";
import Categories from "../Pages/Categories/Categories";
import UploadRequest from "../Pages/Upload/UploadRequest";
import PlatformAdd from "../Pages/Categories/PlatformAdd";
import CategoriesEdit from "../Pages/EditPages/CategoriesEdit";
import Types from "../Pages/Categories/Types";
import TypesAdd from "../Pages/Categories/TypesAdd";
import TypesEdit from "../Pages/EditPages/TypesEdit";
import Colors from "../Pages/Categories/Colors";
import ColorAddNew from "../Pages/Categories/ColorAddNew";
import ColorEdit from "../Pages/EditPages/ColorEdit";
// import Platform from "sharp/lib/platform";


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

      // users

      {
        path: "/userAll",
        element: <UserAll></UserAll>,
      },

      {
        path: "/userEdit/:id",
        element: <UserEdit></UserEdit>,
      },

      // {
      //   path: "/userAddNew",
      //   element: <UserAddNew></UserAddNew>,
      // },

      // staff

      {
        path: "/staffAll",
        element: <StaffAll></StaffAll>,
      },

      {
        path: "/staffAddNew",
        element: <StaffAddNew></StaffAddNew>,
      },

      {
        path: "/staffEdit/:id",
        element: <StaffEdit></StaffEdit>,
      },

      // upload request 

      {
        path: "/upload_request",
        element: <UploadRequest></UploadRequest>,
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

      {
        path: "/filtersEdit/:id",
        element: <FiltersEdit></FiltersEdit>,
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

      {
        path: "/artistEdit/:id",
        element: <ArtistsEdit></ArtistsEdit>,
      },

      // categories

      {
        path: "/collections",
        element: <Collections></Collections>,
      },

      {
        path: "/platform",
        element: <Platform></Platform>,
      },

      {
        path: "/platformEdit/:id",
        element: <PlatformEdit></PlatformEdit>,
      },

      {
        path: "/platformAdd",
        element: <PlatformAdd></PlatformAdd>,
      },

      {
        path: "/categories",
        element: <Categories></Categories>,
      },

      {
        path: "/categoriesAddNew",
        element: <CategoriesAddNew></CategoriesAddNew>,
      },

      {
        path: "/categoriesEdit/:id",
        element: <CategoriesEdit></CategoriesEdit>,
      },

      {
        path: "/collectionAddNew",
        element: <CollectionAddNew></CollectionAddNew>,
      },

      {
        path: "/collectionEdit/:id",
        element: <CollectionEdit></CollectionEdit>,
      },

      {
        path: "/types",
        element: <Types></Types>,
      },

      {
        path: "/typesAdd",
        element: <TypesAdd></TypesAdd>,
      },

      {
        path: "/TypesEdit/:id",
        element: <TypesEdit></TypesEdit>,
      },

      {
        path: "/colors",
        element: <Colors></Colors>,
      },

      {
        path: "/colorAddNew",
        element: <ColorAddNew></ColorAddNew>,
      },

      {
        path: "/colorEdit/:id",
        element: <ColorEdit></ColorEdit>,
      },

      

      // withdraw 

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
