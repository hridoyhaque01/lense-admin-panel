import React, { createContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../../Firebase/firebase.config";
import {
  collection,
  doc,
  getDoc,
  //   getDoc,
  getDocs,
  //   serverTimestamp,
  //   setDoc,
  updateDoc,
} from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const CustomerContext = createContext();
const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [filteredCustomersBySearch, setFilteredCustomersBySearch] = useState(
    []
  );

  //update one customer status
  const updateCustomerStatus = async (customer, status) => {
    try {
      const db = firebaseFirestore;
      const customerDocRef = doc(db, "userDetails", customer);
      try {
        await updateDoc(customerDocRef, {
          user_status: status,
        });
        fetchCustomers();
        console.log("customer status updated successfully");
      } catch {
        console.error("customer document not found");
      }
    } catch (error) {
      console.error("Error updating customer status", error);
    }
  };

  //update one customer type
  const updateCustomerType = async (customer, type) => {
    try {
      const db = firebaseFirestore;
      const customerDocRef = doc(db, "userDetails", customer);
      try {
        await updateDoc(customerDocRef, {
          user_type: type,
        });
        fetchCustomers();
        console.log("customer type updated successfully");
      } catch {
        console.error("customer document not found");
      }
    } catch (error) {
      console.error("Error updating customer type", error);
    }
  };

  //update state in modals
  const clickHandlerForModals = (customerId, status) => {
    updateCustomerStatus(customerId, status);
  };

  //update many customer status
  //   const updateManyCustomerStatus = async (customers, status) => {
  //     try {
  //       const db = firebaseFirestore;
  //       const customerDocsRefs = customers.map((customer) =>
  //         doc(db, "userDetails", customer)
  //       );
  //       try {
  //         await Promise.all(
  //           customerDocsRefs.map((customerDocRef) =>
  //             updateDoc(customerDocRef, {
  //               customer_status: status,
  //             })
  //           )
  //         );
  //         fetchCustomers();
  //         console.log("customer statuses updated successfully");
  //       } catch {
  //         console.error("One or more customer documents not found");
  //       }
  //     } catch (error) {
  //       console.error("Error updating customer statuses", error);
  //     }
  //   };

  // fetch one customer
  const fetchSingleCustomer = async (customerId) => {
    console.log(customerId);
    try {
      const ref = doc(firebaseFirestore, "userDetails", customerId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const customer = docSnap.data();
        if (currentCustomer?.user_id === customer?.user_id) {
          return;
        } else {
          setCurrentCustomer(customer);
          console.log(customer);
        }
      } else {
        console.log("No such doCUMent!");
      }
    } catch (error) {
      console.error("Error fetching doCUMent!", error);
    }
  };

  // update one customer
  const updateSingleCustomer = async (newCustomer, id) => {
    try {
      const db = firebaseFirestore;
      const customerDocRef = doc(db, "userDetails", id);
      try {
        await updateDoc(customerDocRef, {
          user_name: newCustomer?.user_name,
          user_email: newCustomer?.user_email,
          user_contact: newCustomer?.user_contact,
          user_dob: newCustomer?.user_dob,
          user_gender: newCustomer?.user_gender,
          user_country: newCustomer?.user_country,
          user_address: newCustomer?.user_address,
        });
        fetchCustomers();
        console.log("customer updated successfully");
      } catch {
        console.error("customer document not found");
      }
    } catch (error) {
      console.error("Error updating customer", error);
    }
  };

  // Upload images to Firebase Storage
  //   const uploadImages = async (images) => {
  //     const storage = getStorage();
  //     const imageUrls = [];

  //     for (const image of images) {
  //       try {
  //         const imageName = uuidv4();
  //         const storageRef = ref(storage, `customer_documents/${imageName}`);
  //         const snapshot = await uploadBytes(storageRef, image);
  //         const downloadURL = await getDownloadURL(snapshot.ref);
  //         imageUrls.push(downloadURL);
  //       } catch (error) {
  //         console.error("Error uploading image", error);
  //       }
  //     }
  //     console.log(imageUrls);
  //     return imageUrls;
  //   };

  // add one customer
  //   const addOneCustomer = async (newCustomer, images) => {
  //     try {
  //       const db = firebaseFirestore;
  //       const customerId = uuidv4();
  //       const timeStamp = serverTimestamp();
  //       const customerDocRef = doc(db, "userDetails", customerId);
  //       try {
  //         await setDoc(customerDocRef, {
  //           rider_id: customerId,
  //           rider_name: newCustomer?.rider_name,
  //           rider_email: newCustomer?.rider_email,
  //           rider_contact: newCustomer?.rider_contact,
  //           rider_dob: newCustomer?.rider_dob,
  //           rider_gender: newCustomer?.rider_gender,
  //           rider_country: newCustomer?.rider_country,
  //           rider_state: newCustomer?.rider_state,
  //           rider_work_location: newCustomer?.rider_work_location,
  //           rider_address: newCustomer?.rider_address,
  //           rider_status: newCustomer?.rider_status,
  //           timestamp: timeStamp,
  //           rider_documents: await uploadImages(images),
  //         });
  //         fetchCustomers();
  //         console.log("customer successfully added");
  //       } catch (error) {
  //         console.error("Error adding customer", error);
  //       }
  //     } catch (error) {
  //       console.error("Error adding customer", error);
  //     }
  //   };

  //fetch customers from database
  const fetchCustomers = async () => {
    setIsLoading(true);
    await getDocs(collection(firebaseFirestore, "userDetails")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCustomers(newData);
        setIsLoading(false);
      }
    );
  };

  // reload the current page id
  const reloadCurrentPage = (setCurrentPage) => {
    setCurrentPage(1);
  };

  //filter customer by search value
  const filterCustomersBySearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === null) {
      setFilteredCustomersBySearch(customers);
    }
    const filteredCustomers = customers?.filter((customer) =>
      customer?.user_name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCustomersBySearch(filteredCustomers);
    setSearchBarValue(searchValue);
  };

  //filter customer by user type
  const filterCustomersByUserType = (userType, e) => {
    if (userType === null) {
      setFilteredCustomersBySearch(customers);
    }
    const filteredCustomers = customers?.filter((customer) =>
      customer?.user_type?.includes(userType)
    );
    setFilteredCustomersBySearch(filteredCustomers);
  };

  //filter customer by location type
  const filterCustomersByLocationType = (locationType, e) => {
    if (locationType === null) {
      setFilteredCustomersBySearch(customers);
    }
    const filteredCustomers = customers?.filter((customers) =>
      customers?.user_type?.includes(locationType)
    );
    setFilteredCustomersBySearch(filteredCustomers);
  };

  //fetches all customers upon load
  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    setFilteredCustomersBySearch(customers);
  }, [customers]);

  //exports
  const CustomerInfo = {
    fetchCustomers,
    fetchSingleCustomer,
    updateSingleCustomer,
    customers,
    // addOneCustomer,
    setCustomers,
    searchBarValue,
    setSearchBarValue,
    filterCustomersBySearch,
    filteredCustomersBySearch,
    setFilteredCustomersBySearch,
    filterCustomersByUserType,
    filterCustomersByLocationType,
    reloadCurrentPage,
    updateCustomerStatus,
    updateCustomerType,
    // updateManyCustomerStatus,
    isLoading,
    setIsLoading,
    currentCustomer,
    setCurrentCustomer,
    // uploadImages,
    clickHandlerForModals,
  };
  return (
    <CustomerContext.Provider value={CustomerInfo}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
