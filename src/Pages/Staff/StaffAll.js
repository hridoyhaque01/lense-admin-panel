import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import StaffAllTable from "../../Components/Tables/Staff/StaffAllTable";
import { StaffContext } from "../../Contexts/StaffContext/StaffProvider";
import { Link } from "react-router-dom";
import db from "../../Assets/json/db.json"

const StaffAll = () => {
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [approvedStaffs, setApprovedStaffs] = useState([]);
  const {staffs} = db || {}
  const {
    isLoading,
    searchBarValue,
    setCurrentStaff,
    updateManyStaffStatus,
    fetchStaffs,
    // staffs,
    filteredStaffsBySearch,
    filterStaffsBySearch,
  } = useContext(StaffContext);

  const handleSelectCheckbox = (staff, e) => {
    const selectedStaffsList = [...selectedStaffs];
    if (e.target.checked) {
      selectedStaffsList.push(staff?.user_id);
    } else {
      const index = selectedStaffsList.indexOf(staff?.user_id);
      if (index !== -1) {
        selectedStaffsList.splice(index, 1);
      }
    }
    setSelectedStaffs(selectedStaffsList);
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

  const handleApproveAll = (staff, status) => {
    updateManyStaffStatus(staff, status);
    setSelectedStaffs([]);
  };

  useEffect(() => {
    const filteredStaffsByStatus = filteredStaffsBySearch?.filter(
      (staff) => staff?.user_status?.toLowerCase() === "active"
    );
    setApprovedStaffs(filteredStaffsByStatus);
  }, [filteredStaffsBySearch]);

  return (
    <div className="overflow-x-auto w-full py-10 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Staffs</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterStaffsBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <p>
            <button
              onClick={fetchStaffs}
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full"
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6415 3.35146C12.0115 1.72146 9.70148 0.781457 7.16148 1.04146C3.49148 1.41146 0.471476 4.39146 0.0614764 8.06146C-0.488524 12.9115 3.26148 17.0015 7.99148 17.0015C11.1815 17.0015 13.9215 15.1315 15.2015 12.4415C15.5215 11.7715 15.0415 11.0015 14.3015 11.0015C13.9315 11.0015 13.5815 11.2015 13.4215 11.5315C12.2915 13.9615 9.58148 15.5015 6.62148 14.8415C4.40148 14.3515 2.61148 12.5415 2.14148 10.3215C1.30148 6.44146 4.25148 3.00146 7.99148 3.00146C9.65148 3.00146 11.1315 3.69146 12.2115 4.78146L10.7015 6.29146C10.0715 6.92146 10.5115 8.00146 11.4015 8.00146H14.9915C15.5415 8.00146 15.9915 7.55146 15.9915 7.00146V3.41146C15.9915 2.52146 14.9115 2.07146 14.2815 2.70146L13.6415 3.35146Z"
                  fill="#37B6B6"
                />
              </svg>
            </button>
          </p>
          <p>
          <Link
              to="/staffAddNew"
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
          selectedStaffs?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedStaffs, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedStaffs, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <StaffAllTable
          rows={staffs}
          approvedStaffs={approvedStaffs}
          setCurrentCustomer={setCurrentStaff}
          handleSelectCheckbox={handleSelectCheckbox}
        ></StaffAllTable>
      )}
    </div>
  );
};

export default StaffAll;
