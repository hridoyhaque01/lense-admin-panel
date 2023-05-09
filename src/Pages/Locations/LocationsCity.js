import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryConfirmationCancelPopup from "../../Components/Modals/DeliveryMan/DeliveryConfirmationCancelPopup";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import LocationCityTable from "../../Components/Tables/Locations/LocationCityTable";
import { LocationContext } from "../../Contexts/LocationContext/LocationProvider";

const LocationCity = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const {
    isLoading,
    fetchCities,
    countries,
    states,
    setSelectedCountry,
    setSelectedState,
    searchBarValue,
    currentCity,
    updateManyCitiesStatus,
    filterCitiesBySearch,
    filteredCitiesBySearch,
    setCurrentCity,
  } = useContext(LocationContext);

  const handleSelectCheckbox = (city, e) => {
    const selectedCitiesList = [...selectedCities];
    if (e.target.checked) {
      selectedCitiesList.push(city?.city_id);
    } else {
      const index = selectedCitiesList.indexOf(city?.city_id);
      if (index !== -1) {
        selectedCitiesList.splice(index, 1);
      }
    }
    setSelectedCities(selectedCitiesList);
  };

  const handleSelectAllCheckbox = (cities, e) => {
    const selectAllCity = [];
    if (e?.target?.checked) {
      cities?.map((city) => {
        return selectAllCity?.push(city?.city_id);
      });
    } else {
      setSelectedCities([]);
    }
    setSelectedCities(selectAllCity);
  };

  const handleStatesByCountry = (countryName) => {
    setSelectedCountry(countryName);
  };

  const handleCitiesByState = (stateName) => {
    setSelectedState(stateName);
  };

  const handleApproveAll = (city, status) => {
    updateManyCitiesStatus(city, status);
    setSelectedCities([]);
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
        <section>
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-sm normal-case m-1"
            >
              State &nbsp; <i className="fa-solid fa-angle-down"></i>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow bg-base-100 text-blackMid rounded-box w-52"
            >
              {states?.map((state, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={(e) => {
                        handleCitiesByState(state?.name, e);
                      }}
                      className="active:bg-primaryMain"
                    >
                      {state?.name}
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
            onChange={filterCitiesBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={fetchCities}
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-secondaryMain">
                refresh
              </span>
            </button>
            <Link
              to="/locationsCityAdd"
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
          selectedCities?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedCities, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedCities, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <LocationCityTable
          rows={filteredCitiesBySearch}
          setCurrentCountry={setCurrentCity}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          handleSelectCheckbox={handleSelectCheckbox}
        ></LocationCityTable>
      )}
      {/* cancel modal popup */}
      <DeliveryConfirmationCancelPopup
        currentCountry={currentCity}
      ></DeliveryConfirmationCancelPopup>
    </div>
  );
};

export default LocationCity;
