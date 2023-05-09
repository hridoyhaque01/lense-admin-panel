import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ArtistsAddNew from "../Pages/Artists/ArtistsAddNew";
import ArtistsApproved from "../Pages/Artists/ArtistsApproved";
import ArtistsPending from "../Pages/Artists/ArtistsPending";
import Login from "../Pages/Authentication/Login/Login";
import BusinessDeliveryCost from "../Pages/BusinessSetup/BusinessDeliveryCost";
import BusinessDeliveryManCharge from "../Pages/BusinessSetup/BusinessDeliveryManCharge";
import BusinessNotificationSettings from "../Pages/BusinessSetup/BusinessNotificationSettings";
import CategoriesAddNew from "../Pages/Categories/CategoriesAddNew";
import Collections from "../Pages/Categories/Collections";
import Featured from "../Pages/Categories/Featured";
import CustomerAll from "../Pages/Customer/CustomerAll";
import CustomerBlocked from "../Pages/Customer/CustomerBlocked";
import DeliveryAddNew from "../Pages/DeliveryMan/DeliveryAddNew";
import DeliveryAllDeliveryMan from "../Pages/DeliveryMan/DeliveryAllDeliveryMan";
import DeliveryBlocked from "../Pages/DeliveryMan/DeliveryBlocked";
import DeliveryCancelled from "../Pages/DeliveryMan/DeliveryCancelled";
import DeliveryPendingRequests from "../Pages/DeliveryMan/DeliveryPendingRequests";
import CustomerEdit from "../Pages/EditPages/CustomerEdit";
import DeliveryManEdit from "../Pages/EditPages/DeliveryManEdit";
import OrderEdit from "../Pages/EditPages/OrderEdit";
import PaymentGatewayEdit from "../Pages/EditPages/PaymentGatewayEdit";
import WarehouseEdit from "../Pages/EditPages/WarehouseEdit";
import ECardFilter from "../Pages/Filters/ECardFilter";
import FiltersAddNew from "../Pages/Filters/FiltersAddNew";
import SnapchatFilter from "../Pages/Filters/SnapchatFilter";
import TiktokFilter from "../Pages/Filters/TiktokFilter";
import Home from "../Pages/Home/Home";
import LocationsCity from "../Pages/Locations/LocationsCity";
import LocationsCityAdd from "../Pages/Locations/LocationsCityAdd";
import LocationsCountry from "../Pages/Locations/LocationsCountry";
import LocationsCountryAdd from "../Pages/Locations/LocationsCountryAdd";
import LocationsState from "../Pages/Locations/LocationsState";
import LocationsStateAdd from "../Pages/Locations/LocationsStateAdd";
import OrdersCancelled from "../Pages/Orders/OrdersCancelled";
import OrdersDelivered from "../Pages/Orders/OrdersDelivered";
import OrdersPending from "../Pages/Orders/OrdersPending";
import OrdersPickedup from "../Pages/Orders/OrdersPickedup";
import OrdersProcessing from "../Pages/Orders/OrdersProcessing";
import PaymentGateway from "../Pages/PaymentGateway/PaymentGateway";
import PaymentGatewayAdd from "../Pages/PaymentGateway/PaymentGatewayAdd";
import StaffAddNew from "../Pages/Staff/StaffAddNew";
import TransactionRevenue from "../Pages/Transaction/TransactionRevenue";
import TransactionUnsettledBalance from "../Pages/Transaction/TransactionUnsettledBalance";
import UserAddNew from "../Pages/User/UserAddNew";
import UserProfile from "../Pages/User/UserProfile";
import WarehouseAddNew from "../Pages/Warehouse/WarehouseAddNew";
import WarehouseAll from "../Pages/Warehouse/WarehouseAll";
// import WithdrawConfirmed from "../Pages/WithdrawRequest/WithdrawConfirmed";
// import WithdrawPending from "../Pages/WithdrawRequest/WithdrawPending";
import WithdrawConfirmed from "../Pages/Withdraw/WithdrawConfirmed";
import WithdrawPending from "../Pages/Withdraw/WithdrawPending";
import PrivateRoutes from "../Routes/PrivateRoutes";

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

      // orders route
      {
        path: "/orderspending",
        element: <OrdersPending></OrdersPending>,
      },
      {
        path: "/ordersprocessing",
        element: <OrdersProcessing></OrdersProcessing>,
      },
      {
        path: "/orderspickedup",
        element: <OrdersPickedup></OrdersPickedup>,
      },
      {
        path: "/ordersdelivered",
        element: <OrdersDelivered></OrdersDelivered>,
      },
      {
        path: "/orderscancelled",
        element: <OrdersCancelled></OrdersCancelled>,
      },
      {
        path: "/orderedit/:id",
        element: <OrderEdit></OrderEdit>,
      },

      // delivery man
      {
        path: "/deliveryPendingRequests",
        element: <DeliveryPendingRequests></DeliveryPendingRequests>,
      },
      {
        path: "/deliveryAllDeliveryMan",
        element: <DeliveryAllDeliveryMan></DeliveryAllDeliveryMan>,
      },
      {
        path: "/deliveryAddNew",
        element: <DeliveryAddNew></DeliveryAddNew>,
      },
      {
        path: "/deliveryBlocked",
        element: <DeliveryBlocked></DeliveryBlocked>,
      },
      {
        path: "/deliveryCancelled",
        element: <DeliveryCancelled></DeliveryCancelled>,
      },
      {
        path: "/deliveryedit/:id",
        element: <DeliveryManEdit></DeliveryManEdit>,
      },

      // customer
      {
        path: "/customerAll",
        element: <CustomerAll></CustomerAll>,
      },
      {
        path: "/customerBlocked",
        element: <CustomerBlocked></CustomerBlocked>,
      },
      {
        path: "/customeredit/:id",
        element: <CustomerEdit></CustomerEdit>,
      },

      // location
      {
        path: "/locationsCountry",
        element: <LocationsCountry></LocationsCountry>,
      },
      {
        path: "/locationsState",
        element: <LocationsState></LocationsState>,
      },
      {
        path: "/locationsCity",
        element: <LocationsCity></LocationsCity>,
      },
      {
        path: "/locationsCountryAdd",
        element: <LocationsCountryAdd></LocationsCountryAdd>,
      },
      {
        path: "/locationsStateAdd",
        element: <LocationsStateAdd></LocationsStateAdd>,
      },
      {
        path: "/locationsCityAdd",
        element: <LocationsCityAdd></LocationsCityAdd>,
      },

      // transaction
      {
        path: "/transactionUnsettledBalance",
        element: <TransactionUnsettledBalance></TransactionUnsettledBalance>,
      },
      {
        path: "/transactionRevenue",
        element: <TransactionRevenue></TransactionRevenue>,
      },

      // warehouse
      {
        path: "/warehouseAll",
        element: <WarehouseAll></WarehouseAll>,
      },
      {
        path: "/warehouseAddNew",
        element: <WarehouseAddNew></WarehouseAddNew>,
      },
      {
        path: "/warehouseedit/:id",
        element: <WarehouseEdit></WarehouseEdit>,
      },

      //withdraw request
      {
        path: "/withdrawPending",
        element: <WithdrawPending></WithdrawPending>,
      },
      {
        path: "/withdrawConfirmed",
        element: <WithdrawConfirmed></WithdrawConfirmed>,
      },
      // {
      //   path: "/withdrawCancelled",
      //   element: <WithdrawCancelled></WithdrawCancelled>,
      // },

      //business setup
      {
        path: "/businessDeliveryCost",
        element: <BusinessDeliveryCost></BusinessDeliveryCost>,
      },
      {
        path: "/businessDeliveryManCharge",
        element: <BusinessDeliveryManCharge></BusinessDeliveryManCharge>,
      },
      {
        path: "/businessNotificationSettings",
        element: <BusinessNotificationSettings></BusinessNotificationSettings>,
      },

      //payment gateway
      {
        path: "/paymentGateway",
        element: <PaymentGateway></PaymentGateway>,
      },
      {
        path: "/paymentGatewayAdd",
        element: <PaymentGatewayAdd></PaymentGatewayAdd>,
      },
      {
        path: "/paymentGatewayEdit/:id",
        element: <PaymentGatewayEdit></PaymentGatewayEdit>,
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
