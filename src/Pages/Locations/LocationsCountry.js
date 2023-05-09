import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import LocationCountryTable from "../../Components/Tables/Locations/LocationCountryTabls";
import { LocationContext } from "../../Contexts/LocationContext/LocationProvider";

const LocationCountry = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const {
    isLoading,
    fetchCountries,
    searchBarValue,
    updateManyCountriesStatus,
    filterCountriesBySearch,
    filteredCountriesBySearch,
    setCurrentCountry,
  } = useContext(LocationContext);

  const handleSelectCheckbox = (country, e) => {
    const selectedCountriesList = [...selectedCountries];
    if (e.target.checked) {
      selectedCountriesList.push(country?.country_id);
    } else {
      const index = selectedCountriesList.indexOf(country?.country_id);
      if (index !== -1) {
        selectedCountriesList.splice(index, 1);
      }
    }
    setSelectedCountries(selectedCountriesList);
  };

  const handleSelectAllCheckbox = (countries, e) => {
    const selectAllCountry = [];
    if (e?.target?.checked) {
      countries?.map((country) => {
        return selectAllCountry?.push(country?.country_id);
      });
    } else {
      setSelectedCountries([]);
    }
    setSelectedCountries(selectAllCountry);
  };

  const handleApproveAll = (country, status) => {
    updateManyCountriesStatus(country, status);
    setSelectedCountries([]);
  };

  return (
    <div className="overflow-x-auto w-full py-10 pr-10">
      <div className="flex items-center justify-between p-3 bg-secondaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Location</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterCountriesBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={fetchCountries}
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-secondaryMain">
                refresh
              </span>
            </button>
            <Link
              to="/locationsCountryAdd"
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
          selectedCountries?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedCountries, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedCountries, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <LocationCountryTable
          rows={filteredCountriesBySearch}
          setCurrentCountry={setCurrentCountry}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          handleSelectCheckbox={handleSelectCheckbox}
        ></LocationCountryTable>
      )}
      {/* cancel modal popup */}
    </div>
  );
};

export default LocationCountry;
