import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomerContext } from "../../Contexts/CustomerContext/CustomerProvider";
import { firebaseFirestore } from "../../Firebase/firebase.config";

const CustomerEdit = () => {
  const { id } = useParams();
  const { updateSingleCustomer } = useContext(CustomerContext);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/customerAll";

  useEffect(() => {
    const fetchSingleCustomer = async () => {
      try {
        const ref = doc(firebaseFirestore, "userDetails", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const customer = docSnap.data();
          return setCurrentCustomer(customer);
        } else {
          console.log("No such doCUMent!");
        }
      } catch (error) {
        console.error("Error fetching doCUMent!", error);
      }
    };
    fetchSingleCustomer();
  }, [id]);

  const handleEditBtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const contact = form.contact.value;
    const dob = form.dob.value;
    const gender = form.gender.value;
    const country = form.country.value;
    const presentAddress = form.presentAddress.value;

    const newCustomer = {
      user_name: name,
      user_email: email,
      user_contact: contact,
      user_dob: dob,
      user_gender: gender,
      user_country: country,
      user_address: presentAddress,
    };
    console.log(newCustomer);
    updateSingleCustomer(newCustomer, id);
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <section className="w-full mt-10 mr-8">
      <div className="flex items-center bg-secondaryMain text-whiteHigh rounded-t-lg w-full">
        <p className="font-bold text-2xl pl-4 py-5">Edit</p>
      </div>
      <div>
        <section className="">
          <p className="text-center text-blackMid py-4 font-semibold text-xl">
            Editing the Customer: {currentCustomer?.user_name}
          </p>
          <div className="grid items-center justify-center gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleEditBtn}>
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Email:</p>
                  <input
                    disabled
                    type="email"
                    name="email"
                    defaultValue={currentCustomer?.user_email}
                    placeholder="email"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Name:</p>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentCustomer?.user_name}
                    placeholder="enter full name"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Phone&nbsp;No:</p>
                  <input
                    type="text"
                    name="contact"
                    defaultValue={currentCustomer?.user_contact}
                    placeholder="rider contact"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Date&nbsp;of&nbsp;Birth:</p>
                  <input
                    type="text"
                    name="dob"
                    defaultValue={currentCustomer?.user_dob}
                    placeholder="date of birth"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Gender:</p>
                  <input
                    type="text"
                    name="gender"
                    defaultValue={currentCustomer?.user_gender}
                    placeholder="gender"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Country:</p>
                  <input
                    type="text"
                    name="country"
                    defaultValue={currentCustomer?.user_country}
                    placeholder="work location"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Present&nbsp;Address:</p>
                  <input
                    type="text"
                    name="presentAddress"
                    defaultValue={currentCustomer?.user_address}
                    placeholder="full address"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-4">
                <Link to={"/deliveryAllDeliveryMan"}>
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

export default CustomerEdit;
