import React, { useContext } from "react";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";
// import OrdersLoading from "../Shared/LoadingScreens/OrdersLoading";

const HomeOrders = () => {
  const { orders, isLoading } = useContext(OrderContext);
  return (
    <section>
      <div className="overflow-x-auto overflow-y-auto max-h-64">
        {isLoading ? (
          // <OrdersLoading></OrdersLoading>
          ""
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Created</th>
                <th>Customer</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, i) => {
                return (
                  <tr key={i}>
                    <th>{order?.order_id}</th>
                    <td>{order?.timestamp?.toDate().toLocaleDateString()}</td>
                    <td>{order?.sender_name}</td>
                    <td>{order?.id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default HomeOrders;
