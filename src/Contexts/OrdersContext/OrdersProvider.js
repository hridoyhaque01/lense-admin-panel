import React, { createContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../../Firebase/firebase.config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const OrderContext = createContext();
const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(null);
  const [filteredOrdersBySearch, setFilteredOrdersBySearch] = useState([]);

  //update one order status
  const updateOrderStatus = async (order, status) => {
    try {
      const db = firebaseFirestore;
      const orderDocRef = doc(db, "orders", order);
      try {
        await updateDoc(orderDocRef, {
          order_status: status,
        });
        fetchOrders();
        console.log("Order status updated successfully");
      } catch {
        console.error("Order document not found");
      }
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  //update many order status
  const updateManyOrderStatus = async (orders, status) => {
    try {
      const db = firebaseFirestore;
      const orderDocsRefs = orders.map((order) => doc(db, "orders", order));
      try {
        await Promise.all(
          orderDocsRefs.map((orderDocRef) =>
            updateDoc(orderDocRef, {
              order_status: status,
            })
          )
        );
        fetchOrders();
        console.log("Order statuses updated successfully");
      } catch {
        console.error("One or more order documents not found");
      }
    } catch (error) {
      console.error("Error updating order statuses", error);
    }
  };

  //update one order
  const updateSingleOrder = async (newOrder, id) => {
    try {
      const db = firebaseFirestore;
      const orderDocRef = doc(db, "orders", id);
      try {
        await updateDoc(orderDocRef, {
          sender_name: newOrder?.sender_name,
          sender_contact: newOrder?.sender_contact,
          sender_address: newOrder?.sender_address,
          receiver_name: newOrder?.receiver_name,
          receiver_contact: newOrder?.receiver_contact,
          receiver_address: newOrder?.receiver_address,
          parcel_weight: newOrder?.parcel_weight,
          price: newOrder?.price,
        });
        fetchOrders();
        console.log("Order updated successfully");
      } catch {
        console.error("Order document not found");
      }
    } catch (error) {
      console.error("Error updating order", error);
    }
  };

  //fetch orders from database
  const fetchOrders = async () => {
    setIsLoading(true);
    await getDocs(collection(firebaseFirestore, "orders")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(newData);
        setFilteredOrdersBySearch(newData);
        setIsLoading(false);
      }
    );
  };

  // reload the current page id
  const reloadCurrentPage = (setCurrentPage) => {
    setCurrentPage(1);
  };

  //filter order by search value
  const filterOrdersBySearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue === null) {
      setFilteredOrdersBySearch(orders);
    }
    const filteredOrders = orders?.filter((order) =>
      order?.order_id?.includes(searchValue)
    );
    setFilteredOrdersBySearch(filteredOrders);
    setSearchBarValue(searchValue);
  };

  //filter order by user type
  const filterOrdersByUserType = (userType, e) => {
    if (userType === null) {
      setFilteredOrdersBySearch(orders);
    }
    const filteredOrders = orders?.filter((order) =>
      order?.user_type?.includes(userType)
    );
    setFilteredOrdersBySearch(filteredOrders);
  };

  //filter order by location type
  const filterOrdersByLocationType = (locationType, e) => {
    if (locationType === null) {
      setFilteredOrdersBySearch(orders);
    }
    const filteredOrders = orders?.filter((order) =>
      order?.order_type?.toLowerCase()?.includes(locationType.toLowerCase())
    );
    setFilteredOrdersBySearch(filteredOrders);
  };

  //update state in modals
  const clickHandlerForModals = (id) => {
    updateOrderStatus(id, "Returned");
  };

  //fetches all orders upon load
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    //filter order by location type
    const getDeliveredOrdersCount = () => {
      const filterDeliveredOrders = orders?.filter((order) =>
        order?.order_status?.includes("Delivered")
      );
      setDeliveredOrderCount(filterDeliveredOrders.length);
    };
    getDeliveredOrdersCount();
  }, [orders]);

  //exports
  const OrderInfo = {
    fetchOrders,
    orders,
    orderToEdit,
    setOrderToEdit,
    setOrders,
    searchBarValue,
    setSearchBarValue,
    filterOrdersBySearch,
    filteredOrdersBySearch,
    setFilteredOrdersBySearch,
    filterOrdersByUserType,
    filterOrdersByLocationType,
    reloadCurrentPage,
    updateOrderStatus,
    updateManyOrderStatus,
    isLoading,
    setIsLoading,
    currentOrder,
    setCurrentOrder,
    updateSingleOrder,
    deliveredOrderCount,
    clickHandlerForModals,
  };
  return (
    <OrderContext.Provider value={OrderInfo}>{children}</OrderContext.Provider>
  );
};

export default OrdersProvider;
