import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StaffContext } from "../../../Contexts/StaffContext/StaffProvider";
import CustomerConfirmationBlockPopup from "../../Modals/Customer/CustomerConfirmationBlockPopup";
import EmptyScreen from "../../Shared/EmptyScreens/EmptyScreen";

const StaffAllTable = ({ rows, handleSelectCheckbox }) => {
  const {
    searchBarValue,
    currentStaff,
    setCurrentStaff,
    clickHandlerForModals,
  } = useContext(StaffContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows?.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    if (searchBarValue !== null) {
      setCurrentPage(1);
      setActiveButton(1);
    }
  }, [searchBarValue]);

  const handleItemsPerPage = (value) => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    setCurrentPage(1);
    setRowsPerPage(value);
    console.log(value);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveButton(pageNumber);
  };

  //   const handleCheckbox = (order, e) => {
  //     handleSelectCheckbox(order, e);
  //   };

  // const handleAllCheckbox = (orders, e) => {
  //   handleSelectAllCheckbox(orders, e);
  // };

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(rows.length / rowsPerPage); i++) {
      pageNumbers?.push(i);
    }

    return (
      <nav>
        <ul className="pagination flex gap-2">
          {pageNumbers?.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
            >
              <button
                className={`page-link btn btn-sm ${
                  activeButton === pageNumber
                    ? "text-primaryMainLightest bg-primaryMain border-primaryMain hover:bg-primaryMain hover:text-whiteHigh hover:border-primaryMain"
                    : "text-blackMid bg-whiteMid border-primaryMainLighter hover:bg-primaryMain hover:text-whiteHigh hover:border-primaryMain"
                }`}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <div className=" relative pb-16">
      {rows?.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr className="font-bold text-center text-3xl">
              {/* <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                <input
                type="checkbox"
                className="checkbox rounded-none"
                name="allCheckbox"
                onChange={(e) => {
                  handleAllCheckbox(currentRows, e);
                }}
              />
              </th> */}
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Serial
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Name
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Role
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Email
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Phone Number
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentRows?.map((staff, i) => {
              return (
                <tr key={i} className="text-center">
                  {/* <th className="px-0 pl-4">
                    <input
                      type="checkbox"
                      className="checkbox rounded-none"
                      name="checkbox"
                      onChange={(e) => {
                        handleCheckbox(staff, e);
                      }}
                    />
                  </th> */}
                  <td className="px-0">{i + 1}</td>
                  <td className="px-0 mx-0">{staff?.user_name}</td>
                  <td className="px-0 mx-0">{staff?.user_type}</td>
                  <td className="px-0">{staff?.user_email}</td>
                  <td className="px-0 mx-0">{staff?.user_contact}</td>
                  <td className="px-0 mx-0">
                    <div className="flex items-center justify-center gap-0">
                      <label
                        htmlFor="customerBlockPopup"
                        onClick={() => setCurrentStaff(staff)}
                        className="btn rounded-full p-0 bg-whiteHigh text-blackMid border-none hover:bg-whiteHigh"
                      >
                        <span className="material-symbols-outlined p-0">
                          block
                        </span>
                      </label>
                      <Link
                        to={{
                          pathname: `/staffedit/${staff?.user_id}`,
                          staff: staff,
                        }}
                      >
                        <label
                          htmlFor="pausePopup"
                          className="btn rounded-full p-3 bg-whiteHigh text-alertColor border-none hover:bg-whiteHigh"
                        >
                          <span className="material-symbols-outlined">
                            border_color
                          </span>
                        </label>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <EmptyScreen></EmptyScreen>
      )}
      <section className="flex items-center justify-end gap-4 py-4 absolute bottom-0 right-0">
        <div>{renderPagination()}</div>
        <div>
          <p>
            Showing {indexOfFirstRow + 1}-
            {indexOfLastRow > rows?.length ? rows?.length : indexOfLastRow} of{" "}
            {rows?.length}
          </p>
        </div>
        <div className="dropdown dropdown-top dropdown-end">
          <label
            tabIndex={3}
            className="rounded-lg px-2 py-2 border-2 text-primaryMain bg-primaryMainLightest"
          >
            {rowsPerPage} &nbsp;
            <i className="fa-solid fa-angle-down text-sm"></i>
          </label>
          <ul
            tabIndex={3}
            className="dropdown-content menu p-1 mt-2 m-0.5 shadow bg-base-100 rounded-md "
          >
            <hr className="text-disabledColor opacity-10" />
            <li>
              <p
                onClick={() => handleItemsPerPage(10)}
                className="py-1 active:bg-blackLow"
              >
                10
              </p>
            </li>
            <hr className="text-disabledColor opacity-10" />
            <li>
              <p
                onClick={() => handleItemsPerPage(25)}
                className="py-1 active:bg-blackLow"
              >
                25
              </p>
            </li>
            <hr className="text-disabledColor opacity-10" />
            <li>
              <p
                onClick={() => handleItemsPerPage(50)}
                className="py-1 active:bg-blackLow"
              >
                50
              </p>
            </li>
          </ul>
        </div>
      </section>
      <CustomerConfirmationBlockPopup
        currentCustomer={currentStaff}
        clickHandlerForModals={clickHandlerForModals}
      ></CustomerConfirmationBlockPopup>
    </div>
  );
};

export default StaffAllTable;
