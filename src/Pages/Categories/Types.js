import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { Link } from "react-router-dom";
import db from "../../Assets/json/db.json"
import TypesTable from "../../Components/Tables/Categories/TypesTable";

const Types = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);

  const {types:dbTypes}  = db || {}
  const [types ,setTypes] = useState(dbTypes);

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

  const handleSelectCheckbox = (platfrom, e) => {
    const selectedTypesList = [...selectedTypes];
    if (e.target.checked) {
      selectedTypesList.push(platfrom?.id);
    } else {
      const index = selectedTypesList.indexOf(platfrom?.id);
      if (index !== -1) {
        selectedTypesList.splice(index, 1);
      }
    }
    setSelectedTypes(selectedTypesList);
  };

  const handleSelectAllCheckbox = (platfroms, e) => {
    const selectAllType = [];
    if (e?.target?.checked) {
      platfroms?.map((platfrom) => {
        return selectAllType?.push(platfrom?.id);
      });
    } else {
      setSelectedTypes([]);
    }
    setSelectedTypes(selectAllType);
  };


  
 //filter categories by search value
 const filterTypeBySearch = (e) => {
  const searchValue = e.target.value;
  const filterType = dbTypes?.filter((platform)=> searchBarValue !== null ?  platform?.type_name?.toLowerCase().includes(searchValue?.toLowerCase()) : true )
  setSearchBarValue(searchValue)
  setTypes(filterType)
};

  const handleApproveAll = (platfrom, status) => {
    updateManyCustomerStatus(platfrom, status);
    setSelectedTypes([]);
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
            <p className="font-bold text-2xl">Types</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterTypeBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <p>
          <Link
              to="/typesAdd"
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
          selectedTypes?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedTypes, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedTypes, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <TypesTable
          rows={types}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          selectedTypes={selectedTypes}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
        ></TypesTable>
      )}
    </div>
  );
};

export default Types;
