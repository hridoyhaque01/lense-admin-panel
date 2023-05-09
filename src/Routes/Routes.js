import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import DeliveryAddNew from "../Pages/DeliveryMan/DeliveryAddNew";
import DeliveryBlocked from "../Pages/DeliveryMan/DeliveryBlocked";
import DeliveryAllDeliveryMan from "../Pages/DeliveryMan/DeliveryAllDeliveryMan";
import DeliveryPendingRequests from "../Pages/DeliveryMan/DeliveryPendingRequests";
import Home from "../Pages/Home/Home";
import OrdersCancelled from "../Pages/Orders/OrdersCancelled";
import OrdersDelivered from "../Pages/Orders/OrdersDelivered";
import OrdersPickedup from "../Pages/Orders/OrdersPickedup";
import OrdersPending from "../Pages/Orders/OrdersPending";
import OrdersProcessing from "../Pages/Orders/OrdersProcessing";
import OrderEdit from "../Pages/EditPages/OrderEdit";
import WarehouseAll from "../Pages/Warehouse/WarehouseAll";
import WarehouseAddNew from "../Pages/Warehouse/WarehouseAddNew";
import StaffAll from "../Pages/Staff/StaffAll";
import StaffAddNew from "../Pages/Staff/StaffAddNew";
import TransactionUnsettledBalance from "../Pages/Transaction/TransactionUnsettledBalance";
import TransactionRevenue from "../Pages/Transaction/TransactionRevenue";
import CustomerAll from "../Pages/Customer/CustomerAll";
import CustomerBlocked from "../Pages/Customer/CustomerBlocked";
import UserProfile from "../Pages/User/UserProfile";
import DeliveryCancelled from "../Pages/DeliveryMan/DeliveryCancelled";
import LocationsCountry from "../Pages/Locations/LocationsCountry";
import LocationsCity from "../Pages/Locations/LocationsCity";
import LocationsState from "../Pages/Locations/LocationsState";
import LocationsCountryAdd from "../Pages/Locations/LocationsCountryAdd";
import LocationsCityAdd from "../Pages/Locations/LocationsCityAdd";
import LocationsStateAdd from "../Pages/Locations/LocationsStateAdd";
import StaffRole from "../Pages/Staff/StaffRole";
import Login from "../Pages/Authentication/Login/Login";
import PrivateRoutes from "../Routes/PrivateRoutes";
import DeliveryManEdit from "../Pages/EditPages/DeliveryManEdit";
import BusinessDeliveryCost from "../Pages/BusinessSetup/BusinessDeliveryCost";
import BusinessDeliveryManCharge from "../Pages/BusinessSetup/BusinessDeliveryManCharge";
import BusinessNotificationSettings from "../Pages/BusinessSetup/BusinessNotificationSettings";
import PaymentGateway from "../Pages/PaymentGateway/PaymentGateway";
import PaymentGatewayEdit from "../Pages/EditPages/PaymentGatewayEdit";
import WithdrawConfirmed from "../Pages/WithdrawRequest/WithdrawConfirmed";
import WithdrawCancelled from "../Pages/WithdrawRequest/WithdrawCancelled";
import WithdrawPending from "../Pages/WithdrawRequest/WithdrawPending";
import CustomerEdit from "../Pages/EditPages/CustomerEdit";
import WarehouseEdit from "../Pages/EditPages/WarehouseEdit";
import PaymentGatewayAdd from "../Pages/PaymentGateway/PaymentGatewayAdd";
import StaffEdit from "../Pages/EditPages/StaffEdit";
import UserAddNew from "../Pages/User/UserAddNew";
import SnapchatFilter from "../Pages/Filters/SnapchatFilter";
import FiltersAddNew from "../Pages/Filters/FiltersAddNew";
import FiltersSnapchatAddNew from "../Pages/Filters/FiltersAddNew";
import TiktokFilter from "../Pages/Filters/TiktokFilter";
import ECardFilter from "../Pages/Filters/ECardFilter";
import ArtistsApproved from "../Pages/Artists/ArtistsApproved";
import ArtistsPending from "../Pages/Artists/ArtistsPending";
import ArtistsAddNew from "../Pages/Artists/ArtistsAddNew";
import Collections from "../Pages/Categories/Collections";
import Featured from "../Pages/Categories/Featured";
import CategoriesAddNew from "../Pages/Categories/CategoriesAddNew";

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
        element: <SnapchatFilter ></SnapchatFilter>
      },

      {
        path: "/tiktokFilter",
        element: <TiktokFilter ></TiktokFilter>
      },

      {
        path: "/ecardFilter",
        element: <ECardFilter ></ECardFilter>
      },

      {
        path: "/filtersAddNew",
        element: <FiltersAddNew></FiltersAddNew>
      },

      // artists 

      {
        path: '/artistsPending',
        element : <ArtistsPending ></ArtistsPending>
      },

      {
        path: '/artistsApproved',
        element : <ArtistsApproved ></ArtistsApproved>
      },

      {
        path: '/artistsAddNew',
        element : <ArtistsAddNew ></ArtistsAddNew>
      },

      // categories

      {
        path : '/collections',
        element : <Collections ></Collections>
      },

      {
        path : '/featured',
        element: <Featured></Featured>
      },

      
      {
        path : '/categoriesAddNew',
        element : <CategoriesAddNew ></CategoriesAddNew>
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
      {
        path: "/withdrawCancelled",
        element: <WithdrawCancelled></WithdrawCancelled>,
      },

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
