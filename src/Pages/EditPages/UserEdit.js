import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";
import { firebaseFirestore } from "../../Firebase/firebase.config";

const UserEdit = () => {
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
    <section className="w-full overflow-auto pt-10 pb-32 pr-10 rounded-2xl">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg w-full">
        <p className="font-bold text-2xl pl-4 py-6">Users</p>
      </div>
      <div>
        <section className="py-4 bg-whiteHigh ">
          <form className="w-8/12 flex flex-col mx-auto gap-2">

            {/* name  */}
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Name:</p>
              <input
                type="text"
                name="name"
                defaultValue={currentOrder?.sender_name}
                placeholder="set name"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              />
            </div>


            {/* user name  */}
            
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Username:</p>
              <input
                type="text"
                name="username"
                defaultValue={currentOrder?.sender_name}
                placeholder="set username"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              />
            </div>

            {/* mobile number  */}

            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Mobile number::</p>
              <input
                type="number"
                name="mobile-number"
                defaultValue={currentOrder?.sender_name}
                placeholder="set mobile number"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              />
            </div>

            {/* email  */}

            <div className="flex items-center justify-center gap-2">
              <p className="w-1/3 text-end">Email:</p>
              <input
                type="email"
                name="email"
                defaultValue={currentOrder?.sender_contact}
                placeholder="set email"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              />
            </div>

            {/* description  */}
            
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Description:</p>

              <textarea name="description" className="h-16 pt-2 resize-none input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh" placeholder="description"></textarea>
              {/* <input
                type="text"
                name="name"
                defaultValue={currentOrder?.sender_name}
                placeholder="user name"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              /> */}
            </div>

            {/* subscription  */}
            
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Name:</p>
              <input
                type="text"
                name="name"
                defaultValue={currentOrder?.sender_name}
                placeholder="user name"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              />
            </div>

            

            <div className="flex items-center justify-end gap-4 mt-4">
              <Link to={"/userAll"}>
                <label className="btn rounded-full w-36 normal-case bg-whiteHigh text-primaryMain border-primaryMain hover:border-primaryMain hover:bg-whiteHigh">
                  Cancel
                </label>
              </Link>
              <button className="btn submit rounded-full w-36 normal-case bg-primaryMain border-primaryMain hover:text-primaryMain hover:bg-whiteHigh hover:border-primaryMain">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default UserEdit;
