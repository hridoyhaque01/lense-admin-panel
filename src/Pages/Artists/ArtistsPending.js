import React, { useContext, useEffect, useState } from "react";
import OrdersConfirmationBlockPopup from "../../Components/Modals/Orders/OrdersConfirmationBlockPopup";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import OrdersPendingTable from "../../Components/Tables/Orders/OrdersPendingTable";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";
import ArtistsConfirmationBlockPopup from "../../Components/Modals/Artists/ArtistsConfirmationBlockPopup";
import ArtistsPendingTable from "../../Components/Tables/Artists/ArtistsPendingTable";
import { Link } from "react-router-dom";

const ArtistsPending = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const {
    isLoading,
    fetchOrders,
    searchBarValue,
    filteredOrdersBySearch,
    filterOrdersBySearch,
    filterOrdersByUserType,
    filterOrdersByLocationType,
    currentOrder,
    setCurrentOrder,
    updateManyOrderStatus,
    clickHandlerForModals,
  } = useContext(OrderContext);

  const handleSelectCheckbox = (order, e) => {
    const selectedOrdersList = [...selectedOrders];
    if (e.target.checked) {
      selectedOrdersList.push(order.order_id);
    } else {
      const index = selectedOrdersList.indexOf(order.order_id);
      if (index !== -1) {
        selectedOrdersList.splice(index, 1);
      }
    }
    setSelectedOrders(selectedOrdersList);
  };

  const handleSelectAllCheckbox = (orders, e) => {
    const selectAllOrder = [];
    if (e?.target?.checked) {
      orders?.map((order) => {
        return selectAllOrder?.push(order?.order_id);
      });
    } else {
      setSelectedOrders([]);
    }
    setSelectedOrders(selectAllOrder);
  };

  const handleApproveAll = (order, status) => {
    updateManyOrderStatus(order, status);
    setSelectedOrders([]);
  };

  const handleUserTypeToggle = (userType) => {
    filterOrdersByUserType(userType);
  };
  const handleLocationTypeToggle = (locationType) => {
    filterOrdersByLocationType(locationType);
  };

  useEffect(() => {
    const filteredOrdersByStatus = filteredOrdersBySearch?.filter(
      (order) => order?.order_status?.toLowerCase() === "pending"
    );
    setPendingOrders(filteredOrdersByStatus);
  }, [filteredOrdersBySearch]);

  return (
    <div className="overflow-x-auto w-full py-10 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Artists</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterOrdersBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <p>
          <Link
              to="/filtersAddNew"
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-primaryMain">
                add
              </span>
            </Link>
          </p>
        </section>
      </div>

      <div
        className={` ${
          selectedOrders.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedOrders, "Returned")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedOrders, "Processing")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <ArtistsPendingTable
          rows={pendingOrders}
          setCurrentOrder={setCurrentOrder}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          handleSelectCheckbox={handleSelectCheckbox}
        ></ArtistsPendingTable>
      )}
      {/* block modal popup */}
      <ArtistsConfirmationBlockPopup
        currentOrder={currentOrder}
        clickHandlerForModals={clickHandlerForModals}
      ></ArtistsConfirmationBlockPopup>
    </div>
  );
};

export default ArtistsPending;
