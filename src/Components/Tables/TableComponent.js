import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";

const TableComponent = ({ rows, handleSelectCheckbox }) => {
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

  const handleAllCheckbox = () => {
    console.log("selected all");
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
      <table className="table w-full">
        <thead>
          <tr className="font-bold text-center text-3xl">
            <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
              <input
                type="checkbox"
                className="checkbox rounded-none"
                value="allChecked"
                onChange={handleAllCheckbox}
              />
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
                <th className="px-0">
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
                <td className="px-0 mx-0">{order?.timestamp?.seconds}</td>
                <td className="px-0 mx-0">{order.sender_name}</td>
                <td className="px-0 mx-0">${order.totalAmount}.00</td>
                <td className="px-0">{order.sender_address}</td>
                <td className="px-0 mx-0">{order.receiver_address}</td>
                <td className="px-0 py-0">
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <label
                      tabIndex={1}
                      className="rounded-lg px-2 py-1 w-24 focus:outline-none active:border-none text-primaryMain bg-primaryMainLightest"
                    >
                      Pending &nbsp;
                      <i className="fa-solid fa-angle-down text-sm"></i>
                    </label>
                    <ul
                      tabIndex={1}
                      className="dropdown-content menu p-1 mt-2 m-0.5 shadow bg-base-100 rounded-md w-36"
                    >
                      <li>
                        <p className="text-successColor py-1 active:bg-blackLow w-full rounded-none">
                          Confirm
                        </p>
                      </li>
                      <hr className="text-disabledColor opacity-10" />
                      <li>
                        <p className="py-1 active:bg-blackLow">Edit</p>
                      </li>
                      <hr className="text-disabledColor opacity-10" />
                      <li>
                        <p className="py-1 active:bg-blackLow">Delete</p>
                      </li>
                      <hr className="text-disabledColor opacity-10" />
                      <li>
                        <p className="text-errorColor py-1 active:bg-blackLow">
                          Decline
                        </p>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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

export default TableComponent;
