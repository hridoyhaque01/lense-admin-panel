import React, { createContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../../Firebase/firebase.config";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDoc,
  //   getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  //   serverTimestamp,
  //   setDoc,
  updateDoc,
} from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const WarehouseContext = createContext();
const WarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [filteredWarehousesBySearch, setFilteredWarehousesBySearch] = useState(
    []
  );

  //update one Warehouse status
  const updateWarehouseStatus = async (warehouse, status) => {
    try {
      const db = firebaseFirestore;
      const warehouseDocRef = doc(db, "warehouseDetails", warehouse);
      try {
        await updateDoc(warehouseDocRef, {
          warehouse_status: status,
        });
        fetchWarehouses();
        console.log("warehouse status updated successfully");
      } catch {
        console.error("warehouse document not found");
      }
    } catch (error) {
      console.error("Error updating warehouse status", error);
    }
  };

  //update state in modals
  const clickHandlerForModals = (warehouseId, status) => {
    updateWarehouseStatus(warehouseId, status);
  };

  // fetch one warehouse
  const fetchSingleWarehouse = async (warehouseId) => {
    console.log(warehouseId);
    try {
      const ref = doc(firebaseFirestore, "warehouseDetails", warehouseId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const warehouse = docSnap.data();
        if (currentWarehouse?.warehouse_id === warehouse?.warehouse_id) {
          return;
        } else {
          setCurrentWarehouse(warehouse);
          console.log(warehouse);
        }
      } else {
        console.log("No such doCUMent!");
      }
    } catch (error) {
      console.error("Error fetching doCUMent!", error);
    }
  };

  // update one warehouse
  const updateSingleWarehouse = async (newWarehouse, id) => {
    try {
      const db = firebaseFirestore;
      const warehouseDocRef = doc(db, "warehouseDetails", id);
      try {
        await updateDoc(warehouseDocRef, {
          warehouse_name: newWarehouse?.warehouse_name,
          warehouse_email: newWarehouse?.warehouse_email,
          warehouse_country: newWarehouse?.warehouse_country,
          warehouse_state: newWarehouse?.warehouse_state,
          warehouse_city: newWarehouse?.warehouse_city,
        });
        fetchWarehouses();
        console.log("warehouse updated successfully");
      } catch {
        console.error("warehouse document not found");
      }
    } catch (error) {
      console.error("Error updating warehouse", error);
    }
  };

  // Upload images to Firebase Storage
  //   const uploadImages = async (images) => {
  //     const storage = getStorage();
  //     const imageUrls = [];

  //     for (const image of images) {
  //       try {
  //         const imageName = uuidv4();
  //         const storageRef = ref(storage, `warehouse_documents/${imageName}`);
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

  // add one warehouse
  const addOneWarehouse = async (newWarehouse) => {
    try {
      const db = firebaseFirestore;
      const warehouseId = uuidv4();
      const timeStamp = serverTimestamp();
      const warehouseDocRef = doc(db, "warehouseDetails", warehouseId);
      try {
        await setDoc(warehouseDocRef, {
          warehouse_id: warehouseId,
          warehouse_name: newWarehouse?.warehouse_name,
          warehouse_email: newWarehouse?.warehouse_email,
          warehouse_password: newWarehouse?.warehouse_password,
          warehouse_password_confirm: newWarehouse?.warehouse_password_confirm,
          warehouse_country: newWarehouse?.warehouse_country,
          warehouse_state: newWarehouse?.warehouse_state,
          warehouse_city: newWarehouse?.warehouse_city,
          warehouse_status: newWarehouse?.warehouse_status,
          timestamp: timeStamp,
        });
        fetchWarehouses();
        console.log("warehouse successfully added");
      } catch (error) {
        console.error("Error adding warehouse", error);
      }
    } catch (error) {
      console.error("Error adding warehouse", error);
    }
  };

  //fetch warehouses from database
  const fetchWarehouses = async () => {
    setIsLoading(true);
    await getDocs(collection(firebaseFirestore, "warehouseDetails")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setWarehouses(newData);
        setIsLoading(false);
      }
    );
  };

  // reload the current page id
  const reloadCurrentPage = (setCurrentPage) => {
    setCurrentPage(1);
  };

  //filter warehouse by search value
  const filterWarehousesBySearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === null) {
      setFilteredWarehousesBySearch(warehouses);
    }
    const filteredWarehouses = warehouses?.filter((warehouse) =>
      warehouse?.warehouse_name
        ?.toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setFilteredWarehousesBySearch(filteredWarehouses);
    setSearchBarValue(searchValue);
  };


  //fetches all warehouses upon load
  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    setFilteredWarehousesBySearch(warehouses);
  }, [warehouses]);

  //exports
  const WarehouseInfo = {
    fetchWarehouses,
    fetchSingleWarehouse,
    updateSingleWarehouse,
    warehouses,
    addOneWarehouse,
    setWarehouses,
    searchBarValue,
    setSearchBarValue,
    filterWarehousesBySearch,
    filteredWarehousesBySearch,
    setFilteredWarehousesBySearch,
    reloadCurrentPage,
    updateWarehouseStatus,
    // updateManyWarehouseStatus,
    isLoading,
    setIsLoading,
    currentWarehouse,
    setCurrentWarehouse,
    // uploadImages,
    clickHandlerForModals,
  };
  return (
    <WarehouseContext.Provider value={WarehouseInfo}>
      {children}
    </WarehouseContext.Provider>
  );
};

export default WarehouseProvider;
