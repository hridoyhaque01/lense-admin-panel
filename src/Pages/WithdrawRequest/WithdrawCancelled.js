import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import TransactionsUnsettledBalanceTable from "../../Components/Tables/Transactions/TransactionsUnsettledBalanceTable";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";

const WithdrawCancelled = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const {
    isLoading,
    fetchOrders,
    searchBarValue,
    filteredOrdersBySearch,
    filterOrdersByUserType,
    filterOrdersByLocationType,
    filterOrdersBySearch,
  } = useContext(OrderContext);

  const handleSelectCheckbox = (orderId, e) => {
    const selectedOrdersList = [...selectedOrders];
    if (e.target.checked) {
      selectedOrdersList.push(orderId);
    } else {
      const index = selectedOrdersList.indexOf(e.target.value);
      if (index > -1) {
        selectedOrdersList.splice(index, 1);
      }
    }
    setSelectedOrders(selectedOrdersList);
  };

  const handleUserTypeToggle = (userType) => {
    filterOrdersByUserType(userType);
  };
  const handleLocationTypeToggle = (locationType) => {
    filterOrdersByLocationType(locationType);
  };

  useEffect(() => {
    const filteredOrdersByStatus = filteredOrdersBySearch?.filter(
      (order) => order?.order_status?.toLowerCase() === "picked up"
    );
    setAssignedOrders(filteredOrdersByStatus);
  }, [filteredOrdersBySearch]);

  // const handleAllCheckbox = () => {
  //   console.log("selected all");
  // };

  return (
    <div className="overflow-x-auto w-full py-10 pr-10">
      <div className="flex items-center justify-between p-3 bg-secondaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Transaction</p>
          </div>
          <div>
            <div className="dropdown dropdown-hover">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm normal-case m-1"
              >
                User Type &nbsp; <i className="fa-solid fa-angle-down"></i>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow bg-base-100 text-blackMid rounded-box w-52"
              >
                <li>
                  <button
                    onClick={(e) => {
                      handleUserTypeToggle("Customer", e);
                    }}
                    className="active:bg-primaryMain"
                  >
                    Customer
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      handleUserTypeToggle("Marchant", e);
                    }}
                    className="active:bg-primaryMain"
                  >
                    Marchant
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="dropdown dropdown-hover">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm normal-case m-1"
              >
                Location &nbsp; <i className="fa-solid fa-angle-down"></i>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow bg-base-100 text-blackMid rounded-box w-52"
              >
                <li>
                  <button
                    onClick={() => {
                      handleLocationTypeToggle("Local");
                    }}
                    className="active:bg-primaryMain"
                  >
                    Local
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLocationTypeToggle("Domestic");
                    }}
                    className="active:bg-primaryMain"
                  >
                    Long Distance
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLocationTypeToggle("International");
                    }}
                    className="active:bg-primaryMain"
                  >
                    International
                  </button>
                </li>
              </ul>
            </div>
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
            <button
              onClick={fetchOrders}
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full"
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6415 3.35146C12.0115 1.72146 9.70148 0.781457 7.16148 1.04146C3.49148 1.41146 0.471476 4.39146 0.0614764 8.06146C-0.488524 12.9115 3.26148 17.0015 7.99148 17.0015C11.1815 17.0015 13.9215 15.1315 15.2015 12.4415C15.5215 11.7715 15.0415 11.0015 14.3015 11.0015C13.9315 11.0015 13.5815 11.2015 13.4215 11.5315C12.2915 13.9615 9.58148 15.5015 6.62148 14.8415C4.40148 14.3515 2.61148 12.5415 2.14148 10.3215C1.30148 6.44146 4.25148 3.00146 7.99148 3.00146C9.65148 3.00146 11.1315 3.69146 12.2115 4.78146L10.7015 6.29146C10.0715 6.92146 10.5115 8.00146 11.4015 8.00146H14.9915C15.5415 8.00146 15.9915 7.55146 15.9915 7.00146V3.41146C15.9915 2.52146 14.9115 2.07146 14.2815 2.70146L13.6415 3.35146Z"
                  fill="#37B6B6"
                />
              </svg>
            </button>
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
        <button className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow">
          Select All
        </button>
        <label
          htmlFor="deletePopup"
          className="btn btn-sm border-none bg-primaryMain"
        >
          Delete
        </label>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <TransactionsUnsettledBalanceTable
          rows={assignedOrders}
          handleSelectCheckbox={handleSelectCheckbox}
        ></TransactionsUnsettledBalanceTable>
      )}
    </div>
  );
};

export default WithdrawCancelled;
