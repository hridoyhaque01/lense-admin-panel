import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firebaseFirestore } from "../../Firebase/firebase.config";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const BusinessContext = createContext();
const BusinessProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allParcelTypes, setAllParcelTypes] = useState(false);
  const [currentParcelType, setCurrentParcelType] = useState(false);
  const [deliveryManCharges, setDeliveryManCharges] = useState(null);
  const [documentPrices, setDocumentPrices] = useState(null);
  const [parcelPrices, setParcelPrices] = useState(null);

  // Upload images to Firebase Storage
  const uploadImages = async (images) => {
    const storage = getStorage();
    const imageUrls = [];

    for (const image of images) {
      try {
        const imageName = uuidv4();
        const storageRef = ref(storage, `parcel_type_logos/${imageName}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
    console.log(imageUrls);
    return imageUrls;
  };

  //fetch prices
  // const fetchDocumentPrices = async () => {
  //   setIsLoading(true);
  //   await getDocs(doc(firebaseFirestore, "deliveryCost", "document")).then(
  //     (querySnapshot) => {
  //       const newData = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setDocumentPrices(newData);
  //       console.log(documentPrices);
  //       setIsLoading(false);
  //     }
  //   );
  // };

  //fetch delivery cost
  useEffect(() => {
    const fetchDocumentPrices = async () => {
      setIsLoading(true);
      await getDocs(collection(firebaseFirestore, "deliveryCost")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDocumentPrices(newData[0]);
          setParcelPrices(newData[1]);
          setIsLoading(false);
        }
      );
    };
    fetchDocumentPrices();
  }, []);

  //fetch delivery man charge
  useEffect(() => {
    const fetchDeliveryManCharge = async () => {
      setIsLoading(true);
      await getDocs(collection(firebaseFirestore, "deliveryManCharge")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDeliveryManCharges(newData[0]);
          setIsLoading(false);
        }
      );
    };
    fetchDeliveryManCharge();
  }, []);

  // add delivery cost
  const addDeliveryCost = async (deliveryCost) => {
    try {
      const db = firebaseFirestore;
      const packageType = deliveryCost?.package_type;
      const timeStamp = serverTimestamp();
      const deliveryCostDocRef = doc(db, "deliveryCost", packageType);
      try {
        await setDoc(deliveryCostDocRef, {
          local_bellow_one: parseInt(deliveryCost?.local_bellow_one),
          local_one_to_five: parseInt(deliveryCost?.local_one_to_five),
          local_five_to_ten: parseInt(deliveryCost?.local_five_to_ten),
          domestic_bellow_one: parseInt(deliveryCost?.domestic_bellow_one),
          domestic_one_to_five: parseInt(deliveryCost?.domestic_one_to_five),
          domestic_five_to_ten: parseInt(deliveryCost?.domestic_five_to_ten),
          international_bellow_one: parseInt(
            deliveryCost?.international_bellow_one
          ),
          international_one_to_five: parseInt(
            deliveryCost?.international_one_to_five
          ),
          international_five_to_ten: parseInt(
            deliveryCost?.international_five_to_ten
          ),
          package_type: deliveryCost?.package_type,
          timestamp: timeStamp,
        });
        console.log("Delivery Cost successfully added");
      } catch (error) {
        console.error("Error adding Delivery Cost", error);
      }
    } catch (error) {
      console.error("Error adding Delivery Cost", error);
    }
  };

  // add delivery man charge
  const addDeliveryManCharge = async (deliveryManCharge) => {
    try {
      const db = firebaseFirestore;
      const packageType = deliveryManCharge?.package_type;
      const timeStamp = serverTimestamp();
      const deliveryManChargeDocRef = doc(db, "deliveryManCharge", packageType);
      try {
        await setDoc(deliveryManChargeDocRef, {
          local_delivery_charge: parseInt(
            deliveryManCharge?.local_delivery_charge
          ),
          domestic_delivery_charge: parseInt(
            deliveryManCharge?.domestic_delivery_charge
          ),
          international_delivery_charge: parseInt(
            deliveryManCharge?.international_delivery_charge
          ),
          package_type: deliveryManCharge?.package_type,
          timestamp: timeStamp,
        });
        console.log("Delivery Cost successfully added");
      } catch (error) {
        console.error("Error adding Delivery Cost", error);
      }
    } catch (error) {
      console.error("Error adding Delivery Cost", error);
    }
  };

  // add delivery parcel types
  const addParcelTypes = async (parcelType, images) => {
    try {
      const db = firebaseFirestore;
      const typeOfParcel = parcelType?.parcel_type_name;
      const timeStamp = serverTimestamp();
      const parcelTypesDocRef = doc(db, "parcelTypes", typeOfParcel);
      try {
        await setDoc(parcelTypesDocRef, {
          parcel_type_name: parcelType?.parcel_type_name,
          parcel_type_subtitle: parcelType?.parcel_type_subtitle,
          parcel_type_logo: await uploadImages(images),
          timestamp: timeStamp,
        });
        console.log("Parcel Type successfully added");
      } catch (error) {
        console.error("Error adding Parcel Type", error);
      }
    } catch (error) {
      console.error("Error adding Parcel Type", error);
    }
  };

  //exports
  const BusinessInfo = {
    isLoading,
    deliveryManCharges,
    documentPrices,
    parcelPrices,
    setIsLoading,
    addDeliveryCost,
    addDeliveryManCharge,
    currentParcelType,
    setCurrentParcelType,
    addParcelTypes,
    allParcelTypes,
    setAllParcelTypes,
  };
  return (
    <BusinessContext.Provider value={BusinessInfo}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessProvider;
