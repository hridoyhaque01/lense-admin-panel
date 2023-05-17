import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { Link } from "react-router-dom";
import CategoriesTable from "../../Components/Tables/Categories/CategoriesTable";

import db from "../../Assets/json/db.json"

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);

  const {categories:dbCategories} = db || {};
  const [Categories ,setCategories] = useState(dbCategories);

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

  const handleSelectCheckbox = (category, e) => {
    const selectedCategoriesList = [...selectedCategories];
    if (e.target.checked) {
      selectedCategoriesList.push(category?.id);
    } else {
      const index = selectedCategoriesList.indexOf(category?.id);
      if (index !== -1) {
        selectedCategoriesList.splice(index, 1);
      }
    }
    setSelectedCategories(selectedCategoriesList);
  };

  const handleSelectAllCheckbox = (categories, e) => {
    const selectAllCategory = [];
    if (e?.target?.checked) {
      categories?.map((category) => {
        return selectAllCategory?.push(category?.id);
      });
    } else {
      setSelectedCategories([]);
    }
    setSelectedCategories(selectAllCategory);
  };

  //filter categories by search value
  const filterCategoriesBySearch = (e) => {
    const searchValue = e.target.value;
    const filterUsers = dbCategories?.filter((user)=> searchBarValue?.trim() !== "" ?  user?.collection_name?.toLowerCase().includes(searchValue?.toLowerCase()) : true )
    setCategories(filterUsers)
    setSearchBarValue(searchValue)
  };

  const handleApproveAll = (category, status) => {
    updateManyCustomerStatus(category, status);
    setSelectedCategories([]);
  };

  useEffect(() => {
    const filteredCustomersByStatus = filteredCustomersBySearch?.filter(
      (category) => category?.user_status?.toLowerCase() === "active"
    );
    setApprovedCustomers(filteredCustomersByStatus);
  }, [filteredCustomersBySearch]);

  return (
    <div className="overflow-auto w-full pt-10 pb-32 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Categories</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterCategoriesBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <p>
          <Link
              to="/categoriesAddNew"
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
          selectedCategories?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedCategories, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedCategories, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <CategoriesTable
          rows={Categories}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          selectedCategories={selectedCategories}
        ></CategoriesTable>
      )}
    </div>
  );
};

export default Categories;
