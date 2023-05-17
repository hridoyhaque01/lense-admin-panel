import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { Link } from "react-router-dom";
import ColorTable from "../../Components/Tables/Categories/ColorTable";
import db from "../../Assets/json/db.json"

const Colors = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);

  const {colors:dbColors} = db || {};
  const [colors ,setColors] = useState(dbColors);


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
    const selectedColorsList = [...selectedColors];
    if (e.target.checked) {
      selectedColorsList.push(category?.id);
    } else {
      const index = selectedColorsList.indexOf(category?.id);
      if (index !== -1) {
        selectedColorsList.splice(index, 1);
      }
    }
    setSelectedColors(selectedColorsList);
  };

  const handleSelectAllCheckbox = (categories, e) => {
    const selectAllCategory = [];
    if (e?.target?.checked) {
      categories?.map((category) => {
        return selectAllCategory?.push(category?.id);
      });
    } else {
      setSelectedColors([]);
    }
    setSelectedColors(selectAllCategory);
  };

    //filter categories by search value
    const filterColorsBySearch = (e) => {
      const searchValue = e.target.value;
      const filterColors = dbColors?.filter((color)=> searchBarValue !== null ?  color?.color_name?.toLowerCase().includes(searchValue?.toLowerCase()) : true )
      setColors(filterColors)
      setSearchBarValue(searchValue)
    };
  

  const handleApproveAll = (category, status) => {
    updateManyCustomerStatus(category, status);
    setSelectedColors([]);
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
            <p className="font-bold text-2xl">Colors</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterColorsBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <p>
          <Link
              to="/colorAddNew"
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
          selectedColors?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedColors, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedColors, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <ColorTable
          rows={colors}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          selectedColors={selectedColors}
        ></ColorTable>
      )}
    </div>
  );
};

export default Colors;
