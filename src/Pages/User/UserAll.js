import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { Link } from "react-router-dom";
import UsersTable from "../../Components/Tables/Users/UsersTable";
import db from "../../Assets/json/db.json"

const UserAll = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [approvedCustomers, setApprovedCustomers] = useState([]);
  const {users} = db || {}
  const {
    isLoading,
    searchBarValue,
    filteredCustomersBySearch,
    filterCustomersBySearch,
    setCurrentCustomer,
    updateManyCustomerStatus,
  } = useContext(CustomerContext);

  const handleSelectCheckbox = (user, e) => {
    const selectedUsersList = [...selectedUsers];
    if (e.target.checked) {
      selectedUsersList.push(user?.user_id);
    } else {
      const index = selectedUsersList.indexOf(user?.user_id);
      if (index !== -1) {
        selectedUsersList.splice(index, 1);
      }
    }
    setSelectedUsers(selectedUsersList);
  };

  const handleSelectAllCheckbox = (users, e) => {
    const selectAllUser = [];
    if (e?.target?.checked) {
      users?.map((user) => {
        return selectAllUser?.push(user?.user_id);
      });
    } else {
      setSelectedUsers([]);
    }
    setSelectedUsers(selectAllUser);
  };

  const handleApproveAll = (customer, status) => {
    updateManyCustomerStatus(customer, status);
    setSelectedUsers([]);
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
            <p className="font-bold text-2xl">Users</p>
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
          {/* <p>
          <Link
              to="/userAddNew"
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
          selectedUsers?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedUsers, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedUsers, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <UsersTable
          rows={users}
          setCurrentCustomer={setCurrentCustomer}
          handleSelectCheckbox={handleSelectCheckbox}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          selectedUsers={selectedUsers}
        ></UsersTable>
      )}
    </div>
  );
};

export default UserAll;
