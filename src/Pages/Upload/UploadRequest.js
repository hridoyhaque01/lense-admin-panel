import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { Link } from "react-router-dom";
import UploadTable from "../../Components/Tables/Upload/UploadTable";
import db from "../../Assets/json/db.json"

const UploadRequest = () => {
  const [selectedUploads, setSelectedUploads] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);

  const {upload_request:dbUploadRequest}  = db || {}
  const [UploadRequest ,setUploadRequest] = useState(dbUploadRequest);

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

  const handleSelectCheckbox = (upload, e) => {
    const selectedUploadsList = [...selectedUploads];
    if (e.target.checked) {
      selectedUploadsList.push(upload?.user_id);
    } else {
      const index = selectedUploadsList.indexOf(upload?.user_id);
      if (index !== -1) {
        selectedUploadsList.splice(index, 1);
      }
    }
    setSelectedUploads(selectedUploadsList);
  };

  const handleSelectAllCheckbox = (uploads, e) => {

    console.log(uploads)
    const selectAllUploads = [];
    if (e?.target?.checked) {
      uploads?.map((upload) => {
        return selectAllUploads?.push(upload?.user_id);
      });
    } else {
      setSelectedUploads([]);
    }
    setSelectedUploads(selectAllUploads);
  };

  const handleApproveAll = (customer, status) => {
    updateManyCustomerStatus(customer, status);
    setSelectedUploads([]);
  };


  
   //filter categories by search value
 const filterUploadRequestBySearch = (e) => {
  const searchValue = e.target.value;
  const filterRequest = dbUploadRequest?.filter((request)=> searchBarValue !== null ?  request?.user_name?.toLowerCase().includes(searchValue?.toLowerCase()) : true )
  setSearchBarValue(searchValue)
  setUploadRequest(filterRequest)
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
            <p className="font-bold text-2xl">Upload Requests</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterUploadRequestBySearch}
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
          selectedUploads?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedUploads, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedUploads, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <UploadTable
          rows={UploadRequest}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          handleSelectAllCheckbox= {handleSelectAllCheckbox}
          selectedUploads={selectedUploads}
        ></UploadTable>
      )}
    </div>
  );
};

export default UploadRequest;
