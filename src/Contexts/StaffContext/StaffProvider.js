import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../../Firebase/firebase.config";
import { v4 as uuidv4 } from "uuid";
import {
  // collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  //   getDoc,
  // getDocs,
  //   serverTimestamp,
  //   setDoc,
  updateDoc,
} from "firebase/firestore";
import { CustomerContext } from "../CustomerContext/CustomerProvider";
// import { v4 as uuidv4 } from "uuid";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const StaffContext = createContext();
const StaffProvider = ({ children }) => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [filteredStaffsBySearch, setFilteredStaffsBySearch] = useState([]);
  const { customers, fetchCustomers } = useContext(CustomerContext);

  //update one Staff status
  const updateStaffStatus = async (staff, status) => {
    try {
      const db = firebaseFirestore;
      const staffDocRef = doc(db, "userDetails", staff);
      try {
        await updateDoc(staffDocRef, {
          user_status: status,
        });
        fetchStaffs();
        console.log("Staff status updated successfully");
      } catch {
        console.error("Staff document not found");
      }
    } catch (error) {
      console.error("Error updating Staff status", error);
    }
  };

  //update one Staff type
  const updateStaffType = async (staff, type) => {
    try {
      const db = firebaseFirestore;
      const staffDocRef = doc(db, "userDetails", staff);
      try {
        await updateDoc(staffDocRef, {
          user_type: type,
        });
        fetchStaffs();
        console.log("Staff type updated successfully");
      } catch {
        console.error("Staff document not found");
      }
    } catch (error) {
      console.error("Error updating Staff type", error);
    }
  };

  //update state in modals
  const clickHandlerForModals = (staffId, status) => {
    updateStaffStatus(staffId, status);
  };

  // fetch one Staff
  const fetchSingleStaff = async (staffId) => {
    console.log(staffId);
    try {
      const ref = doc(firebaseFirestore, "userDetails", staffId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const staff = docSnap.data();
        if (currentStaff?.user_id === staff?.user_id) {
          return;
        } else {
          setCurrentStaff(staff);
          console.log(staff);
        }
      } else {
        console.log("No such doCUMent!");
      }
    } catch (error) {
      console.error("Error fetching doCUMent!", error);
    }
  };

  // add one staff
  const addOneStaff = async (newStaff) => {
    try {
      const db = firebaseFirestore;
      const userId = uuidv4();
      const timeStamp = serverTimestamp();
      const riderDocRef = doc(db, "userDetails", userId);
      try {
        await setDoc(riderDocRef, {
          user_name: newStaff?.user_name,
          user_email: newStaff?.user_email,
          user_contact: newStaff?.user_contact,
          user_dob: newStaff?.user_dob,
          user_gender: newStaff?.user_gender,
          user_country: newStaff?.user_country,
          user_address: newStaff?.user_address,
          user_type: newStaff?.user_type,
          timestamp: timeStamp,
        });
        fetchCustomers();
        console.log("staff successfully added");
      } catch (error) {
        console.error("Error adding staff", error);
      }
    } catch (error) {
      console.error("Error adding staff", error);
    }
  };

  // update one Staff
  const updateSingleStaff = async (newStaff, id) => {
    try {
      const db = firebaseFirestore;
      const staffDocRef = doc(db, "userDetails", id);
      try {
        await updateDoc(staffDocRef, {
          user_name: newStaff?.user_name,
          user_email: newStaff?.user_email,
          user_contact: newStaff?.user_contact,
          user_dob: newStaff?.user_dob,
          user_gender: newStaff?.user_gender,
          user_country: newStaff?.user_country,
          user_address: newStaff?.user_address,
          user_type: newStaff?.user_type,
        });
        fetchCustomers();
        console.log("staff updated successfully");
      } catch {
        console.error("staff document not found");
      }
    } catch (error) {
      console.error("Error updating staff", error);
    }
  };

  //fetch Staffs from database
  const fetchStaffs = async () => {
    setIsLoading(true);
    setAllCustomers(customers);
    setIsLoading(false);
  };

  // reload the current page id
  const reloadCurrentPage = (setCurrentPage) => {
    setCurrentPage(1);
  };

  //filter Staff by search value
  const filterStaffsBySearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === null) {
      setFilteredStaffsBySearch(staffs);
    }
    const filteredStaffs = staffs?.filter((staff) =>
      staff?.user_name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredStaffsBySearch(filteredStaffs);
    setSearchBarValue(searchValue);
  };

  //filter Staff by user type
  const filterStaffsByUserType = (userType, e) => {
    if (userType === null) {
      setFilteredStaffsBySearch(staffs);
    }
    const filteredStaffs = staffs?.filter((staff) =>
      staff?.user_type?.includes(userType)
    );
    setFilteredStaffsBySearch(filteredStaffs);
  };

  //filter Staff by location type
  const filterStaffsByLocationType = (locationType, e) => {
    if (locationType === null) {
      setFilteredStaffsBySearch(staffs);
    }
    const filteredStaffs = staffs?.filter((staffs) =>
      staffs?.user_type?.includes(locationType)
    );
    setFilteredStaffsBySearch(filteredStaffs);
  };

  //fetches all Staffs upon load
  useEffect(() => {
    const fetchStaffsOnLoad = async () => {
      setIsLoading(true);
      setAllCustomers(customers);
      setIsLoading(false);
    };
    fetchStaffsOnLoad();
  }, [customers]);

  useEffect(() => {
    setFilteredStaffsBySearch(staffs);
  }, [staffs]);

  useEffect(() => {
    const specialUsers = customers?.filter((customer) => {
      return customer?.user_type !== "Customer";
    });
    setStaffs(specialUsers);
  }, [customers]);

  //exports
  const StaffInfo = {
    fetchStaffs,
    fetchSingleStaff,
    updateSingleStaff,
    customers,
    staffs,
    addOneStaff,
    allCustomers,
    setAllCustomers,
    searchBarValue,
    setSearchBarValue,
    filterStaffsBySearch,
    filteredStaffsBySearch,
    setFilteredStaffsBySearch,
    filterStaffsByUserType,
    filterStaffsByLocationType,
    reloadCurrentPage,
    updateStaffStatus,
    updateStaffType,
    // updateManyStaffStatus,
    isLoading,
    setIsLoading,
    currentStaff,
    setCurrentStaff,
    // uploadImages,
    clickHandlerForModals,
  };

  return (
    <StaffContext.Provider value={StaffInfo}>{children}</StaffContext.Provider>
  );
};

export default StaffProvider;
