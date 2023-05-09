import React, { useContext } from "react";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";
// import OrdersLoading from "../Shared/LoadingScreens/OrdersLoading";
import { lense } from "../../Assets/getImages";

const HomeOrders = () => {
  const { orders, isLoading } = useContext(OrderContext);
  return (
    <section>
      <div className="overflow-x-auto overflow-y-auto max-h-80">
        {isLoading ? (
          // <OrdersLoading></OrdersLoading>
          ""
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="bg-primaryMain text-whiteHigh">Lense</th>
                <th className="bg-primaryMain text-whiteHigh">Created</th>
                <th className="bg-primaryMain text-whiteHigh">Artist</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, i) => {
                return (
                  <tr key={i}>
                    <th>
                      <img src={lense} alt="" className="w-8 h-8" />
                    </th>
                    <td>{order?.timestamp?.toDate().toLocaleDateString()}</td>
                    <td>{order?.sender_name}</td>
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
