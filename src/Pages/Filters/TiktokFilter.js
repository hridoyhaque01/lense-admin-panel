import React, { useContext, useEffect, useState } from "react";
import db from "../../Assets/json/db.json";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import FiltersAllTable from "../../Components/Tables/FiltersTable/FiltersAllTable";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";

const TiktokFilter = () => {
  const [selectedTiktoks, setSelectedTiktoks] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);
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

  const handleSelectCheckbox = (tiktok, e) => {
    const selectedTiktoksList = [...selectedTiktoks];
    if (e.target.checked) {
      selectedTiktoksList.push(tiktok?.user_id);
    } else {
      const index = selectedTiktoksList.indexOf(tiktok?.user_id);
      if (index !== -1) {
        selectedTiktoksList.splice(index, 1);
      }
    }
    setSelectedTiktoks(selectedTiktoksList);
  };

  const handleSelectAllCheckbox = (tiktoks, e) => {
    const selectAllCustomer = [];
    if (e?.target?.checked) {
      tiktoks?.map((tiktok) => {
        return selectAllCustomer?.push(tiktok?.user_id);
      });
    } else {
      setSelectedTiktoks([]);
    }
    setSelectedTiktoks(selectAllCustomer);
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
    setSelectedTiktoks([]);
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
            <p className="font-bold text-2xl">Tiktok Filter</p>
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
          selectedTiktoks?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedTiktoks, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedTiktoks, "Approved")}
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
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          selectedFilters={selectedTiktoks}
          redirect="tiktokFilter"
        ></FiltersAllTable>
      )}
    </div>
  );
};

export default TiktokFilter;
