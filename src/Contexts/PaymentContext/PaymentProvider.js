import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firebaseFirestore } from "../../Firebase/firebase.config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const PaymentContext = createContext();
const PaymentProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allGateways, setAllGateways] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [currentGateway, setCurrentGateway] = useState(null);
  const [filteredGatewaysBySearch, setFilteredGatewaysBySearch] =
    useState(false);

  //   const [currentPaymentType, setCurrentPaymentType] = useState(false);

  //fetch payment method from database
  const fetchGateways = async () => {
    setIsLoading(true);
    await getDocs(collection(firebaseFirestore, "paymentDetails")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllGateways(newData);
        setFilteredGatewaysBySearch(newData);
        setIsLoading(false);
      }
    );
  };

  // add Gateway
  const addGateway = async (newGateway, logo) => {
    setIsLoading(true);
    const gatewaysCollection = collection(firebaseFirestore, "paymentDetails");
    const readyGateway = {
      gateway_name: newGateway?.gateway_name,
      gateway_status: newGateway?.gateway_status,
      gateway_secret_key: newGateway?.gateway_secret_key,
      gateway_public_key: newGateway?.gateway_public_key,
      gateway_logo: await uploadImages(logo),
    };
    const gatewayRef = doc(gatewaysCollection, newGateway?.gateway_name);
    await setDoc(gatewayRef, readyGateway)
      .then(() => {
        setFilteredGatewaysBySearch((prevGateways) => {
          if (Array.isArray(prevGateways)) {
            return [...prevGateways, readyGateway];
          }
          return [readyGateway];
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding gateway: ", error);
        setIsLoading(false);
      });
  };

  //   update one payment method
  const updateSingleGateway = async (newGateway, id, logo) => {
    try {
      const db = firebaseFirestore;
      const paymentDocRef = doc(db, "paymentDetails", id);
      try {
        await updateDoc(paymentDocRef, {
          gateway_name: newGateway?.gateway_name,
          gateway_status: newGateway?.gateway_status,
          gateway_secret_key: newGateway?.gateway_secret_key,
          gateway_public_key: newGateway?.gateway_public_key,
          gateway_logo: await uploadImages(logo),
        });
        console.log("Payment method updated successfully");
      } catch {
        console.error("Payment method document not found");
      }
    } catch (error) {
      console.error("Error updating Payment method", error);
    }
  };

  //update one gateway status
  const updateSingleGatewayStatus = async (gatewayName, status) => {
    try {
      const db = firebaseFirestore;
      const paymentDocRef = doc(db, "paymentDetails", gatewayName);
      try {
        await updateDoc(paymentDocRef, {
          gateway_status: status,
        });
        console.log("Gateway status updated successfully");
      } catch {
        console.error("Gateway document not found");
      }
    } catch (error) {
      console.error("Error updating Gateway status", error);
    }
  };

  //update state in modals
  const clickHandlerForModals = (gatewayName, status) => {
    updateSingleGatewayStatus(gatewayName, status);
  };

  // Upload images to Firebase Storage
  const uploadImages = async (images) => {
    const storage = getStorage();
    const imageUrls = [];

    for (const image of images) {
      try {
        const imageName = uuidv4();
        const storageRef = ref(storage, `payment_type_logos/${imageName}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
    return imageUrls;
  };

  //filter order by search value
  const filterGatewaysBySearch = (e) => {
    const searchValue = e?.target?.value;
    if (searchValue === null) {
      setFilteredGatewaysBySearch(allGateways);
    }
    const filteredGateways = allGateways?.filter((gateway) =>
      gateway?.gateway_name?.toLowerCase().includes(searchValue)
    );
    setFilteredGatewaysBySearch(filteredGateways);
    setSearchBarValue(searchValue);
  };

  //fetches all gateways upon load
  useEffect(() => {
    fetchGateways();
  }, []);

  //exports
  const GatewayInfo = {
    isLoading,
    addGateway,
    setIsLoading,
    fetchGateways,
    currentGateway,
    setCurrentGateway,
    updateSingleGateway,
    filterGatewaysBySearch,
    searchBarValue,
    filteredGatewaysBySearch,
    clickHandlerForModals,
    allGateways,
  };
  return (
    <PaymentContext.Provider value={GatewayInfo}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
