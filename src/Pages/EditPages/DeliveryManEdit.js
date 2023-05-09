import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DeliveryContext } from "../../Contexts/DeliveryContext/DeliveryProvider";
import { firebaseFirestore } from "../../Firebase/firebase.config";

const DeliveryManEdit = () => {
  const { id } = useParams();
  const { updateSingleRider } = useContext(DeliveryContext);
  const [currentRider, setCurrentRider] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/deliveryAllDeliveryMan";

  useEffect(() => {
    const fetchSingleRider = async () => {
      try {
        const ref = doc(firebaseFirestore, "riderDetails", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const rider = docSnap.data();
          return setCurrentRider(rider);
        } else {
          console.log("No such doCUMent!");
        }
      } catch (error) {
        console.error("Error fetching doCUMent!", error);
      }
    };
    fetchSingleRider();
  }, [id]);

  const handleEditBtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const contact = form.contact.value;
    const dob = form.dob.value;
    const gender = form.gender.value;
    const workLocation = form.workLocation.value;
    const presentAddress = form.presentAddress.value;

    const newRider = {
      rider_name: name,
      rider_email: email,
      rider_contact: contact,
      rider_dob: dob,
      rider_gender: gender,
      rider_work_location: workLocation,
      rider_address: presentAddress,
    };
    console.log(newRider);
    updateSingleRider(newRider, id);
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
            Editing the Rider: {currentRider?.rider_name}
          </p>
          <div className="grid items-center justify-center gap-4">
            <form
              className="flex flex-col w-full items-center justify-center gap-2"
              onSubmit={handleEditBtn}
            >
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Name:</p>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentRider?.rider_name}
                  placeholder="enter full name"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className="w-96 text-end">Email:</p>
                <input
                  type="text"
                  name="email"
                  defaultValue={currentRider?.rider_email}
                  placeholder="rider email"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Phone&nbsp;No:</p>
                <input
                  type="text"
                  name="contact"
                  defaultValue={currentRider?.rider_contact}
                  placeholder="rider contact"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Date&nbsp;of&nbsp;Birth:</p>
                <input
                  type="text"
                  name="dob"
                  defaultValue={currentRider?.rider_dob}
                  placeholder="date of birth"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Gender:</p>
                <input
                  type="text"
                  name="gender"
                  defaultValue={currentRider?.rider_gender}
                  placeholder="gender"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Work&nbsp;Location:</p>
                <input
                  type="text"
                  name="workLocation"
                  defaultValue={currentRider?.rider_work_location}
                  placeholder="work location"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className=" w-96 text-end">Present&nbsp;Address:</p>
                <input
                  type="text"
                  name="presentAddress"
                  defaultValue={currentRider?.rider_address}
                  placeholder="full address"
                  className="input bg-whiteLow border-none focus:outline-none w-96 font-bold"
                />
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

export default DeliveryManEdit;
