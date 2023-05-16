import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { Link } from "react-router-dom";
import PlatformTable from "../../Components/Tables/Categories/PlatformTable";
import db from "../../Assets/json/db.json"

const Featured = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);
  const {featured}  = db || {}

  const {
    isLoading,
    fetchCustomers,
    searchBarValue,
    filteredCustomersBySearch,
    filterCustomersBySearch,
    setCurrentCustomer,
    updateManyCustomerStatus,
  } = useContext(CustomerContext);

  const handleSelectCheckbox = (platfrom, e) => {
    const selectedPlatformsList = [...selectedPlatforms];
    if (e.target.checked) {
      selectedPlatformsList.push(platfrom?.id);
    } else {
      const index = selectedPlatformsList.indexOf(platfrom?.id);
      if (index !== -1) {
        selectedPlatformsList.splice(index, 1);
      }
    }
    setSelectedPlatforms(selectedPlatformsList);
  };

  const handleSelectAllCheckbox = (platfroms, e) => {
    const selectAllPlatform = [];
    if (e?.target?.checked) {
      platfroms?.map((platfrom) => {
        return selectAllPlatform?.push(platfrom?.id);
      });
    } else {
      setSelectedPlatforms([]);
    }
    setSelectedPlatforms(selectAllPlatform);
  };

  const handleApproveAll = (platfrom, status) => {
    updateManyCustomerStatus(platfrom, status);
    setSelectedPlatforms([]);
  };

  useEffect(() => {
    const filteredCustomersByStatus = filteredCustomersBySearch?.filter(
      (customer) => customer?.user_status?.toLowerCase() === "active"
    );
    setApprovedCustomers(filteredCustomersByStatus);
  }, [filteredCustomersBySearch]);

  return (
    <div className="overflow-auto w-full pt-10 pb-32 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Featured</p>
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
          {/* <Link
              to="/categoriesAddNew"
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-primaryMain">
                add
              </span>
            </Link> */}
          </p>
        </section>
      </div>

      <div
        className={` ${
          selectedPlatforms?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedPlatforms, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedPlatforms, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <PlatformTable
          rows={featured}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          selectedPlatforms={selectedPlatforms}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
        ></PlatformTable>
      )}
    </div>
  );
};

export default Featured;
