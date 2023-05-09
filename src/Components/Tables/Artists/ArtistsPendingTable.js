import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../../../Contexts/OrdersContext/OrdersProvider";
import EmptyScreen from "../../Shared/EmptyScreens/EmptyScreen";

const ArtistsPendingTable = ({
  rows,
  handleSelectCheckbox,
  handleSelectAllCheckbox,
}) => {
  const { searchBarValue, setCurrentOrder, updateOrderStatus } =
    useContext(OrderContext);
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

  const handleCheckbox = (order, e) => {
    handleSelectCheckbox(order, e);
  };

  const handleAllCheckbox = (orders, e) => {
    // handleSelectAllCheckbox(orders, e);
    console.log("hello world")
  };

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
      {rows.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr className="font-bold text-center text-3xl">
              <th className="bg-blueLight text-bold text-lg normal-case">
                <input
                type="checkbox"
                className="checkbox rounded-none"
                name="allCheckbox"
                onChange={(e) => {
                  handleAllCheckbox(currentRows, e);
                }}
              />
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
                Serial
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
                Created
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
                Name
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
                Email
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
               Payment Method
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
                Portfolio link
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
                Actions
              </th>
              <th className="bg-blueLight text-bold text-lg normal-case">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentRows?.map((order, i) => {
              return (
                <tr key={i} className="text-center">
                  <th className="px-0 pl-4">
                    <input
                      type="checkbox"
                      className="checkbox rounded-none"
                      name="checkbox"
                      onChange={(e) => {
                        handleCheckbox(order, e);
                      }}
                    />
                  </th>
                  <td className="px-0">{i + 1}</td>
                  <td className="px-0 mx-0">#{order.order_id}</td>
                  <td className="px-0 mx-0">
                    {order?.timestamp?.toDate().toLocaleDateString()}
                  </td>
                  <td className="px-0 mx-0">{order.sender_name}</td>
                  <td className="px-0 mx-0">${order.total_price}.00</td>
                  <td className="px-0">{order.sender_address}</td>
                  <td className="px-0 mx-0">{order.receiver_address}</td>
                  <td className="px-0 py-0">
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <label
                        tabIndex={1}
                        className="rounded-lg px-3 py-2 w-24 focus:outline-none active:border-none text-primaryMain bg-blueLight cursor-pointer"
                      >
                        Pending &nbsp;
                        <i className="fa-solid fa-angle-down text-sm"></i>
                      </label>
                      <ul
                        tabIndex={1}
                        className="dropdown-content menu mt-2 m-0.5 shadow bg-base-100 rounded-md w-36"
                      >
                        <label
                          onClick={() =>
                            updateOrderStatus(order?.order_id, "Processing")
                          }
                          // htmlFor="ordersBlockPopup"
                        >
                          <li>
                            <p className="text-successColor py-2 active:bg-blackLow w-full rounded-t-md">
                              Confirm
                            </p>
                          </li>
                        </label>
                        <hr className="text-disabledColor opacity-10" />
                        
                        <label
                          onClick={() => setCurrentOrder(order)}
                          htmlFor="ordersBlockPopup"
                        >
                          <li>
                            <p className="text-errorColor py-2 active:bg-blackLow rounded-b-md">
                              Cancel
                            </p>
                          </li>
                        </label>
                      </ul>
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
        <div>
            <p>Item per page:</p>
        </div>
      <div className="dropdown dropdown-top dropdown-end ">
          <label
            tabIndex={3}
            className="rounded-lg px-2 py-2 border border-blackLow text-blackMid cursor-pointer"
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
        {/* <div>{renderPagination()}</div> */}
        <div>
          <p>
            {indexOfFirstRow + 1}-
            {indexOfLastRow > rows?.length ? rows?.length : indexOfLastRow} of{" "}
            {rows?.length}
          </p>
        </div>
        <div className="flex gap-2">
            <button className="p-0">
                <span class="material-symbols-outlined">
                    chevron_left
                </span>
            </button>
            <button className="p-0">
                <span class="material-symbols-outlined">
                    chevron_right
                </span>
            </button>
        </div>
        
      </section>
    </div>
  );
};

export default ArtistsPendingTable;
