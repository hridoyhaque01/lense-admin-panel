import React, { useContext, useEffect, useState } from "react";
import db from "../../Assets/json/db.json";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import FiltersAllTable from "../../Components/Tables/FiltersTable/FiltersAllTable";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";

const SnapchatFilter = () => {
  const [selectedSnapchats, setSelectedSnapchats] = useState([]);
  const [approvedCustomers, setApprovedSnapchats] = useState([]);
  
  const {filters:dbFilters}  = db || {}
  const [filters ,setCollections] = useState(dbFilters);


 
  const {
    isLoading,
    fetchCustomers,
    setSearchBarValue,
    searchBarValue,
    filteredCustomersBySearch,
    filterCustomersBySearch,
    setCurrentCustomer,
    updateManyCustomerStatus,
  } = useContext(CustomerContext);

  const handleSelectCheckbox = (snapchat, e) => {
    const selectedSnapchatsList = [...selectedSnapchats];
    if (e.target.checked) {
      selectedSnapchatsList.push(snapchat?.user_id);
    } else {
      const index = selectedSnapchatsList.indexOf(snapchat?.user_id);
      if (index !== -1) {
        selectedSnapchatsList.splice(index, 1);
      }
    }
    setSelectedSnapchats(selectedSnapchatsList);
  };

  const handleSelectAllCheckbox = (snapchats, e) => {
    const selectAllCustomer = [];
    if (e?.target?.checked) {
      snapchats?.map((snapchat) => {
        return selectAllCustomer?.push(snapchat?.user_id);
      });
    } else {
      setSelectedSnapchats([]);
    }
    setSelectedSnapchats(selectAllCustomer);
  };

   //filter categories by search value
 const filterBySearch = (e) => {
  const searchValue = e.target.value;
  const filterType = dbFilters?.filter((user)=> searchBarValue !== null ?  user?.user_name?.toLowerCase().includes(searchValue?.toLowerCase()) : true )
  setSearchBarValue(searchValue)
  setCollections(filterType)
};



  const handleApproveAll = (customer, status) => {
    updateManyCustomerStatus(customer, status);
    setSelectedSnapchats([]);
  };

  useEffect(() => {
    const filteredCustomersByStatus = filteredCustomersBySearch?.filter(
      (customer) => customer?.user_status?.toLowerCase() === "active"
    );
    setApprovedSnapchats(filteredCustomersByStatus);
  }, [filteredCustomersBySearch]);

  return (
    <div className="overflow-auto w-full pt-10 pb-32 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Snapchat Filter</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          {/* <p>
          <Link
              to="/filtersAddNew"
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-primaryMain">
                add
              </span>
            </Link>
          </p> */}
        </section>
      </div>

      <div
        className={` ${
          selectedSnapchats?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedSnapchats, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedSnapchats, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <FiltersAllTable
          rows={filters}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          selectedFilters={selectedSnapchats}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          redirect="snapchatFilter"
        ></FiltersAllTable>
      )}
    </div>
  );
};

export default SnapchatFilter;
