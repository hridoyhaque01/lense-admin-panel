import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../Contexts/OrdersContext/OrdersProvider";
import EmptyScreen from "../../Shared/EmptyScreens/EmptyScreen";

const OrdersProcessingTable = ({
  rows,
  setCurrentOrder,
  handleSelectCheckbox,
}) => {
  const { searchBarValue } = useContext(OrderContext);
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

  // const handleAllCheckbox = () => {
  //   console.log("selected all");
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
      {rows.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr className="font-bold text-center text-3xl">
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                {/* <input
                type="checkbox"
                className="checkbox rounded-none"
                value="allChecked"
                onChange={handleAllCheckbox}
              /> */}
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Serial
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Order ID
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Created
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Customer
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Total
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Pickup Address
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Destination Address
              </th>
              <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
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
                        handleSelectCheckbox(order.order_id, e);
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
                    <div className="flex items-center justify-center">
                      <label
                        onClick={() => setCurrentOrder(order)}
                        htmlFor="ordersBlockPopup"
                        className="btn rounded-full bg-whiteHigh text-primaryMain border-none hover:bg-whiteHigh"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.2536 6.04355L17.6522 5.64491L17.2088 5.29674C15.7736 4.16987 13.9656 3.5 12 3.5C7.30386 3.5 3.5 7.30386 3.5 12C3.5 13.9656 4.16987 15.7736 5.29674 17.2088L5.64491 17.6522L6.04355 17.2536L17.2536 6.04355ZM6.74645 17.9564L6.3478 18.3551L6.79122 18.7033C8.22638 19.8301 10.0344 20.5 12 20.5C16.6961 20.5 20.5 16.6961 20.5 12C20.5 10.0344 19.8301 8.22638 18.7033 6.79122L18.3551 6.3478L17.9564 6.74645L6.74645 17.9564ZM2.5 12C2.5 6.75614 6.75614 2.5 12 2.5C17.2439 2.5 21.5 6.75614 21.5 12C21.5 17.2439 17.2439 21.5 12 21.5C6.75614 21.5 2.5 17.2439 2.5 12Z"
                            fill="black"
                            stroke="#797979"
                          />
                        </svg>
                      </label>
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
    </div>
  );
};

export default OrdersProcessingTable;
