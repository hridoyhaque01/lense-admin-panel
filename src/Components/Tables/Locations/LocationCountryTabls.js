import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { LocationContext } from "../../../Contexts/LocationContext/LocationProvider";
import LocationsConfirmationDeletePopup from "../../Modals/Locations/LocationsConfirmationDeletePopup";
import EmptyScreen from "../../Shared/EmptyScreens/EmptyScreen";

const LocationCountryTable = ({ rows, handleSelectCheckbox }) => {
  const {
    searchBarValue,
    currentCountry,
    // setCurrentCountry,
    clickHandlerForModals,
  } = useContext(LocationContext);
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
                Country Name
              </th>
              {/* <th className="bg-secondaryMainLightest text-bold text-lg normal-case">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="text-center">
            {currentRows?.map((country, i) => {
              return (
                <tr key={i} className="text-center">
                  {/* <th className="px-0 pl-4">
                    <input
                      type="checkbox"
                      className="checkbox rounded-none"
                      name="checkbox"
                      onChange={(e) => {
                        handleCheckbox(country, e);
                      }}
                    />
                  </th> */}
                  <td className="px-0">{i + 1}</td>
                  <td className="px-0 mx-0">{country?.name}</td>
                  {/* <td className="px-0 mx-0">
                    <div className="flex items-center justify-center gap-0">
                      <Link
                        to={{
                          pathname: `/countryedit/${country?.name}`,
                          country: country,
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
                      <label
                        htmlFor="locationDeletePopup"
                        onClick={() => setCurrentCountry(country?.name)}
                        className="btn rounded-full p-0 bg-whiteHigh text-alertColor border-none hover:bg-whiteHigh"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </label>
                    </div>
                  </td> */}
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
      <LocationsConfirmationDeletePopup
        currentCountry={currentCountry}
        clickHandlerForModals={clickHandlerForModals}
      ></LocationsConfirmationDeletePopup>
    </div>
  );
};

export default LocationCountryTable;
