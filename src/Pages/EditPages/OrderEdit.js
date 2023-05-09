import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";
import { firebaseFirestore } from "../../Firebase/firebase.config";

const OrderEdit = () => {
  const { id } = useParams();
  const { updateSingleOrder } = useContext(OrderContext);
  const [currentOrder, setCurrentOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/orderspending";

  useEffect(() => {
    const fetchSingleOrder = async () => {
      try {
        const ref = doc(firebaseFirestore, "orders", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const order = docSnap.data();
          return setCurrentOrder(order);
        } else {
          console.log("No such doCUMent!");
        }
      } catch (error) {
        console.error("Error fetching doCUMent!", error);
      }
    };
    fetchSingleOrder();
  }, [id]);

  const handleEditBtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const senderName = form.senderName.value;
    const senderContact = form.senderContact.value;
    const senderAddress = form.senderAddress.value;
    const receiverName = form.receiverName.value;
    const receiverContact = form.receiverContact.value;
    const receiverAddress = form.receiverAddress.value;
    const parcelWeight = form.parcelWeight.value;
    const deliveryFee = form.deliveryFee.value;

    const newOrder = {
      sender_name: senderName,
      sender_contact: senderContact,
      sender_address: senderAddress,
      receiver_name: receiverName,
      receiver_contact: receiverContact,
      receiver_address: receiverAddress,
      parcel_weight: parcelWeight,
      price: deliveryFee,
    };
    console.log(newOrder);
    updateSingleOrder(newOrder, id);
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <section className="w-full mt-10 mr-8">
      <div className="flex items-center bg-secondaryMain text-whiteHigh rounded-t-lg w-full">
        <p className="font-bold text-2xl pl-4 py-6">Edit</p>
      </div>
      <div>
        <section className="">
          <p className="text-center text-blackMid py-4 font-semibold text-xl">
            Editing the order: #{currentOrder?.order_id}
          </p>
          <div className="grid items-center justify-center gap-4">
            <form
              className="flex flex-col w-full items-center justify-center gap-2"
              onSubmit={handleEditBtn}
            >
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Sender&nbsp;Name:</p>
                <input
                  type="text"
                  name="senderName"
                  defaultValue={currentOrder?.sender_name}
                  placeholder="enter full name"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className="w-96 text-end">Sender&nbsp;Number:</p>
                <input
                  type="text"
                  name="senderContact"
                  defaultValue={currentOrder?.sender_contact}
                  placeholder="sender's phone number"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Sender&nbsp;Address:</p>
                <input
                  type="text"
                  name="senderAddress"
                  defaultValue={currentOrder?.sender_address}
                  placeholder="sender's address"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Receiver&nbsp;Name:</p>
                <input
                  type="text"
                  name="receiverName"
                  defaultValue={currentOrder?.receiver_name}
                  placeholder="enter full name"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Receiver&nbsp;Number:</p>
                <input
                  type="text"
                  name="receiverContact"
                  defaultValue={currentOrder?.receiver_contact}
                  placeholder="reciever's phone number"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Receiver&nbsp;Address:</p>
                <input
                  type="text"
                  name="receiverAddress"
                  defaultValue={currentOrder?.receiver_address}
                  placeholder="sender's address"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Weight:</p>
                <input
                  type="number"
                  name="parcelWeight"
                  defaultValue={currentOrder?.parcel_weight}
                  placeholder="enter weight in kg"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Delivery&nbsp;Fee:</p>
                <input
                  type="number"
                  name="deliveryFee"
                  defaultValue={currentOrder?.price}
                  placeholder="delivery fee amount"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Discount:</p>
                <input
                  type="number"
                  name="discount"
                  defaultValue={currentOrder?.receiver_contact}
                  placeholder="discount"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Total&nbsp;Amount:</p>
                <input
                  type="number"
                  name="totalAmount"
                  defaultValue={currentOrder?.receiver_contact}
                  placeholder="total amount"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-end gap-4">
                <Link to={"/orderspending"}>
                  <label className="btn rounded-full w-36 normal-case bg-whiteHigh text-primaryMain border-primaryMain hover:border-primaryMain hover:bg-whiteHigh">
                    Cancel
                  </label>
                </Link>
                <button className="btn submit rounded-full w-36 normal-case bg-primaryMain border-primaryMain hover:text-primaryMain hover:bg-whiteHigh hover:border-primaryMain">
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OrderEdit;
