import React, { createContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../../Firebase/firebase.config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const LocationContext = createContext();
const LocationProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh");
  const [currentCountry, setCurrentCountry] = useState(null);
  const [selectedState, setSelectedState] = useState("select one");
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [filteredCountriesBySearch, setFilteredCountriesBySearch] = useState(
    []
  );
  const [filteredStatesBySearch, setFilteredStatesBySearch] = useState([]);
  const [filteredCitiesBySearch, setFilteredCitiesBySearch] = useState([]);

  //update one location status
  const updateLocationStatus = async (location, status) => {
    try {
      const db = firebaseFirestore;
      const locationDocRef = doc(db, "Countries", location);
      try {
        await updateDoc(locationDocRef, {
          user_status: status,
        });
        console.log("Location status updated successfully");
      } catch {
        console.error("Location document not found");
      }
    } catch (error) {
      console.error("Error updating Location status", error);
    }
  };

  //fetch countries from database upon load
  const fetchCountries = async () => {
    setIsLoading(true);
    await getDocs(collection(firebaseFirestore, "Countries")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCountries(newData);
        setFilteredCountriesBySearch(newData);
        setIsLoading(false);
      }
    );
  };

  //filter Countries by search value
  const filterCountriesBySearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === null) {
      setFilteredCountriesBySearch(countries);
    }
    const filteredCountries = countries?.filter((country) =>
      country?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountriesBySearch(filteredCountries);
    setSearchBarValue(searchValue);
  };

  //fetch States from database
  const fetchStates = async (selectedCountry) => {
    setIsLoading(true);
    await getDocs(
      collection(firebaseFirestore, "Countries", selectedCountry, "States")
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStates(newData);
      setFilteredStatesBySearch(newData);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchStates(selectedCountry);
  }, [selectedCountry]);

  //filter States by search value
  const filterStatesBySearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === null) {
      setFilteredStatesBySearch(states);
    }
    const filteredStates = states?.filter((state) =>
      states?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredStatesBySearch(filteredStates);
    setSearchBarValue(searchValue);
  };

  //fetch Cities from database
  const fetchCities = async (selectedCountry, selectedState) => {
    setIsLoading(true);
    await getDocs(
      collection(
        firebaseFirestore,
        "Countries",
        selectedCountry,
        "States",
        selectedState,
        "Cities"
      )
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCities(newData);
      setFilteredCitiesBySearch(newData);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchCities(selectedCountry, selectedState);
  }, [selectedCountry, selectedState]);

  //filter Cities by search value
  const filterCitiesBySearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === null) {
      setFilteredCitiesBySearch(cities);
    }
    const filteredCities = cities?.filter((city) =>
      city?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCitiesBySearch(filteredCities);
    setSearchBarValue(searchValue);
  };

  //add new

  //add country
  const addCountry = async (countryData) => {
    setIsLoading(true);
    const countriesCollection = collection(firebaseFirestore, "Countries");
    const countryDocRef = doc(countriesCollection, countryData?.name);
    await setDoc(countryDocRef, countryData)
      .then(() => {
        const newCountry = { ...countryData };
        setStates((prevCountries) => [...prevCountries, newCountry]);
        setFilteredCountriesBySearch((prevCountries) => [
          ...prevCountries,
          newCountry,
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding country: ", error);
        setIsLoading(false);
      });
  };

  //add state
  const addState = async (stateData) => {
    setIsLoading(true);
    const statesCollection = collection(
      firebaseFirestore,
      "Countries",
      selectedCountry,
      "States"
    );
    const stateDocRef = doc(statesCollection, stateData.name);
    await setDoc(stateDocRef, stateData)
      .then(() => {
        const newState = { ...stateData };
        setStates((prevStates) => [...prevStates, newState]);
        setFilteredStatesBySearch((prevStates) => [...prevStates, newState]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding state: ", error);
        setIsLoading(false);
      });
  };

  //add city
  const addCity = async (cityData) => {
    setIsLoading(true);
    const citiesCollection = collection(
      firebaseFirestore,
      "Countries",
      selectedCountry,
      "States",
      selectedState,
      "Cities"
    );
    const cityDocRef = doc(citiesCollection, cityData.name);
    await setDoc(cityDocRef, cityData)
      .then(() => {
        const newCity = { ...cityData };
        setCities((prevCities) => [...prevCities, newCity]);
        setFilteredCitiesBySearch((prevCities) => [...prevCities, newCity]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding city: ", error);
        setIsLoading(false);
      });
  };

  // reload the current page id
  const reloadCurrentPage = (setCurrentPage) => {
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setFilteredCountriesBySearch(countries);
  }, [countries]);

  //exports
  const LocationInfo = {
    fetchCountries,
    fetchStates,
    fetchCities,
    countries,
    states,
    cities,
    addCountry,
    addState,
    addCity,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    searchBarValue,
    setSearchBarValue,
    filterCountriesBySearch,
    filteredCountriesBySearch,
    setFilteredCountriesBySearch,
    filterStatesBySearch,
    filteredStatesBySearch,
    setFilteredStatesBySearch,
    filterCitiesBySearch,
    filteredCitiesBySearch,
    setFilteredCitiesBySearch,
    reloadCurrentPage,
    updateLocationStatus,
    isLoading,
    setIsLoading,
    currentCountry,
    setCurrentCountry,
  };
  return (
    <LocationContext.Provider value={LocationInfo}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
