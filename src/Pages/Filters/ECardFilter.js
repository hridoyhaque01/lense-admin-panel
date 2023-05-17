import React, { useContext, useEffect, useState } from "react";
import db from "../../Assets/json/db.json";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import FiltersAllTable from "../../Components/Tables/FiltersTable/FiltersAllTable";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";

const ECardFilter = () => {
  const [selectedECards, setSelectedECards] = useState([]);
  const [approvedCustomers, setApprovedECards] = useState([]);

  const {filters:dbFilters}  = db || {}
  const [filters ,setCollections] = useState(dbFilters);

  const {
    isLoading,
    fetchCustomers,
    searchBarValue,
    filteredCustomersBySearch,
    filterCustomersBySearch,
    setCurrentCustomer,
    updateManyCustomerStatus,
    setSearchBarValue
  } = useContext(CustomerContext);

  const handleSelectCheckbox = (eCard, e) => {
    const selectedECardsList = [...selectedECards];
    if (e.target.checked) {
      selectedECardsList.push(eCard?.user_id);
    } else {
      const index = selectedECardsList.indexOf(eCard?.user_id);
      if (index !== -1) {
        selectedECardsList.splice(index, 1);
      }
    }
    setSelectedECards(selectedECardsList);
  };

  const handleSelectAllCheckbox = (eCards, e) => {
    const selectAllECards = [];
    if (e?.target?.checked) {
      eCards?.map((ecard) => {
        return selectAllECards?.push(ecard?.user_id);
      });
    } else {
      setSelectedECards([]);
    }
    setSelectedECards(selectAllECards);
  };


  //filter categories by search value
 const filterBySearch = (e) => {
  const searchValue = e.target.value;
  const filterType = dbFilters?.filter((user)=> searchBarValue !== null ?  user?.user_name?.toLowerCase().includes(searchValue?.toLowerCase()) : true )
  setSearchBarValue(searchValue)
  setCollections(filterType)
};


  // console.log(setSelectedECards)

  const handleApproveAll = (customer, status) => {
    updateManyCustomerStatus(customer, status);
    setSelectedECards([]);
  };

  useEffect(() => {
    const filteredECardsByStatus = filteredCustomersBySearch?.filter(
      (customer) => customer?.user_status?.toLowerCase() === "active"
    );
    setApprovedECards(filteredECardsByStatus);
  }, [filteredCustomersBySearch]);

  return (
    <div className="overflow-auto w-full pt-10 pb-32 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">E-Cards Filter</p>
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
          selectedECards?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedECards, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedECards, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <FiltersAllTable
          rows={filters}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          selectedFilters={selectedECards}
          redirect="ecardFilter"
        ></FiltersAllTable>
      )}
    </div>
  );
};

export default ECardFilter;
