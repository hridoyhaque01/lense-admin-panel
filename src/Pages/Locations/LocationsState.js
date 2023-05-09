import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryConfirmationCancelPopup from "../../Components/Modals/DeliveryMan/DeliveryConfirmationCancelPopup";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import LocationStateTable from "../../Components/Tables/Locations/LocationStateTable";
import { LocationContext } from "../../Contexts/LocationContext/LocationProvider";

const LocationState = () => {
  const [selectedStates, setSelectedStates] = useState([]);
  const {
    isLoading,
    fetchStates,
    countries,
    searchBarValue,
    currentState,
    setSelectedCountry,
    updateManyStatesStatus,
    filterStatesBySearch,
    filteredStatesBySearch,
    setCurrentState,
  } = useContext(LocationContext);

  const handleSelectCheckbox = (state, e) => {
    const selectedStatesList = [...selectedStates];
    if (e.target.checked) {
      selectedStatesList.push(state?.state_id);
    } else {
      const index = selectedStatesList.indexOf(state?.state_id);
      if (index !== -1) {
        selectedStatesList.splice(index, 1);
      }
    }
    setSelectedStates(selectedStatesList);
  };

  const handleSelectAllCheckbox = (states, e) => {
    const selectAllState = [];
    if (e?.target?.checked) {
      states?.map((state) => {
        return selectAllState?.push(state?.state_id);
      });
    } else {
      setSelectedStates([]);
    }
    setSelectedStates(selectAllState);
  };

  const handleStatesByCountry = (countryName) => {
    setSelectedCountry(countryName);
  };

  const handleApproveAll = (state, status) => {
    updateManyStatesStatus(state, status);
    setSelectedStates([]);
  };

  return (
    <div className="overflow-x-auto w-full py-10 pr-10">
      <div className="flex items-center justify-between p-3 bg-secondaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Location</p>
          </div>
        </section>
        <section>
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-sm normal-case m-1"
            >
              Country &nbsp; <i className="fa-solid fa-angle-down"></i>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow bg-base-100 text-blackMid rounded-box w-52"
            >
              <option>select one</option>
              {countries?.map((country, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={(e) => {
                        handleStatesByCountry(country?.name, e);
                      }}
                      className="active:bg-primaryMain"
                    >
                      {country?.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterStatesBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={fetchStates}
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-secondaryMain">
                refresh
              </span>
            </button>
            <Link
              to="/locationsStateAdd"
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-secondaryMain">
                add
              </span>
            </Link>
          </div>
        </section>
      </div>

      <div
        className={` ${
          selectedStates?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedStates, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedStates, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <LocationStateTable
          rows={filteredStatesBySearch}
          setCurrentCountry={setCurrentState}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          handleSelectCheckbox={handleSelectCheckbox}
        ></LocationStateTable>
      )}
      {/* cancel modal popup */}
      <DeliveryConfirmationCancelPopup
        currentCountry={currentState}
      ></DeliveryConfirmationCancelPopup>
    </div>
  );
};

export default LocationState;
