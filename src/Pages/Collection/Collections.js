import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { Link } from "react-router-dom";
import CollectionTable from "../../Components/Tables/Collection/CollectionTable";

import db from "../../Assets/json/db.json"


const Collections = () => {
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);

  const {collections} = db || {}


  const {
    isLoading,
    fetchCustomers,
    searchBarValue,
    filteredCustomersBySearch,
    filterCustomersBySearch,
    setCurrentCustomer,
    updateManyCustomerStatus,
  } = useContext(CustomerContext);

  const handleSelectCheckbox = (collection, e) => {
    const selectedCollectionsList = [...selectedCollections];
    if (e.target.checked) {
      selectedCollectionsList.push(collection?.user_id);
    } else {
      const index = selectedCollectionsList.indexOf(collection?.user_id);
      if (index !== -1) {
        selectedCollectionsList.splice(index, 1);
      }
    }
    setSelectedCollections(selectedCollectionsList);
  };

  const handleSelectAllCheckbox = (collections, e) => {
    const selectAllCollection = [];
    if (e?.target?.checked) {
      collections?.map((collection) => {
        return selectAllCollection?.push(collection?.user_id);
      });
    } else {
      setSelectedCollections([]);
    }
    setSelectedCollections(selectAllCollection);
  };

  const handleApproveAll = (collection, status) => {
    updateManyCustomerStatus(collection, status);
    setSelectedCollections([]);
  };

  useEffect(() => {
    const filteredCustomersByStatus = filteredCustomersBySearch?.filter(
      (collection) => collection?.user_status?.toLowerCase() === "active"
    );
    setApprovedCustomers(filteredCustomersByStatus);
  }, [filteredCustomersBySearch]);

  return (
    <div className="overflow-auto w-full pt-10 pb-32 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Collections</p>
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
              to="/collectionAddNew"
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
          selectedCollections?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedCollections, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedCollections, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <CollectionTable
          rows={collections}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          selectedCollections={selectedCollections} 
          handleSelectAllCheckbox={handleSelectAllCheckbox}
        ></CollectionTable>
      )}
    </div>
  );
};

export default Collections;
