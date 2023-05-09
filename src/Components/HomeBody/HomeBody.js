import React, { useContext } from "react";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { DeliveryContext } from "../../Contexts/DeliveryContext/DeliveryProvider";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";
import HomeTopCard from "../Cards/HomeTopCard";
import Chart from "../Charts/Chart";

const HomeBody = () => {
  const { orders, deliveredOrderCount } = useContext(OrderContext);
  const { riders } = useContext(DeliveryContext);
  const { customers } = useContext(CustomerContext);
  const data = [
    {
      title: "Total Placed Order",
      number: orders?.length,
      color: "bg-primaryMainLight",
    },
    {
      title: "Delivered Parcel",
      number: deliveredOrderCount,
      color: "bg-secondaryMain",
    },
    {
      title: "Total Customers",
      number: customers?.length,
      color: "bg-infoColor",
    },
    {
      title: "Total Delivery Man",
      number: riders?.length,
      color: "bg-successColor",
    },
  ];
  return (
    <div className="flex flex-col justify-around pt-10 gap-4 w-full">
      {/* 4 top cards */}
      <section className="flex justify-between gap-8 px-4">
        {data.map((data, index) => (
          <HomeTopCard data={data} key={index}></HomeTopCard>
        ))}
      </section>
      <Chart></Chart>
    </div>
  );
};

export default HomeBody;
