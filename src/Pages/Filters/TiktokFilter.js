import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import FiltersAllTable from "../../Components/Tables/FiltersTable/FiltersAllTable";
import { Link } from "react-router-dom";

const TiktokFilter = () => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);
  const {
    isLoading,
    fetchCustomers,
    searchBarValue,
    filteredCustomersBySearch,
    filterCustomersBySearch,
    setCurrentCustomer,
    updateManyCustomerStatus,
  } = useContext(CustomerContext);

  const handleSelectCheckbox = (customer, e) => {
    const selectedCustomersList = [...selectedCustomers];
    if (e.target.checked) {
      selectedCustomersList.push(customer?.used_id);
    } else {
      const index = selectedCustomersList.indexOf(customer?.used_id);
      if (index !== -1) {
        selectedCustomersList.splice(index, 1);
      }
    }
    setSelectedCustomers(selectedCustomersList);
  };

  // const handleSelectAllCheckbox = (customers, e) => {
  //   const selectAllCustomer = [];
  //   if (e?.target?.checked) {
  //     customers?.map((customer) => {
  //       return selectAllCustomer?.push(customer?.used_id);
  //     });
  //   } else {
  //     setSelectedCustomers([]);
  //   }
  //   setSelectedCustomers(selectAllCustomer);
  // };

  const handleApproveAll = (customer, status) => {
    updateManyCustomerStatus(customer, status);
    setSelectedCustomers([]);
  };

  useEffect(() => {
    const filteredCustomersByStatus = filteredCustomersBySearch?.filter(
      (customer) => customer?.user_status?.toLowerCase() === "active"
    );
    setApprovedCustomers(filteredCustomersByStatus);
  }, [filteredCustomersBySearch]);

  return (
    <div className="overflow-x-auto w-full py-10 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Tiktok Filter</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterCustomersBySearch}
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
          selectedCustomers?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedCustomers, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedCustomers, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <FiltersAllTable
          rows={approvedCustomers}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
        ></FiltersAllTable>
      )}
    </div>
  );
};

export default TiktokFilter;
