import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryManAddConfirmationPopup from "../../Components/Modals/DeliveryMan/DeliveryManAddConfirmationPopup";
import { DeliveryContext } from "../../Contexts/DeliveryContext/DeliveryProvider";

const DeliveryAddNew = () => {
  const { addOneRider } = useContext(DeliveryContext);
  const [popupIsOpen, setPopupIsOpen] = useState(null);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/deliveryAllDeliveryMan";

  const handlePopup = (value) => {
    setPopupIsOpen(value);
  };

  const handleSubmitBtn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const riderName = form?.riderName.value;
    const riderEmail = form?.riderEmail.value;
    const riderContact = form?.riderContact.value;
    const riderDOB = form?.riderDOB.value;
    const riderGender = form?.riderGender.value;
    const riderCountry = form?.riderCountry.value;
    const riderState = form?.riderState.value;
    const riderWorkLocation = form?.riderWorkLocation.value;
    const riderAddress = form?.riderAddress.value;
    const documentsImages = form?.documentsImage.files;
    const riderStatus = "Approved";

    const newRider = {
      rider_name: riderName,
      rider_email: riderEmail,
      rider_contact: riderContact,
      rider_dob: riderDOB,
      rider_gender: riderGender,
      rider_country: riderCountry,
      rider_state: riderState,
      rider_work_location: riderWorkLocation,
      rider_address: riderAddress,
      rider_status: riderStatus,
    };
    try {
      addOneRider(newRider, documentsImages);
      setTimeout(() => {
        handlePopup("modal-open");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full mt-10 mr-8">
      <section className="bg-whiteHigh rounded-b-lg">
        <div className="flex items-center bg-secondaryMain text-whiteHigh rounded-t-lg w-full">
          <h2 className="font-bold text-2xl pl-4 py-5">Delivery Man</h2>
        </div>
        <div>
          <section className="">
            <p className="text-center text-blackMid py-4 font-semibold text-xl">
              Add a Delivery Man
            </p>
            {/* {riders.map((rider, i) => {
            return rider?.rider_documents?.map((image) => {
              return <img src={image} alt="" />;
            });
          })} */}
            <div className="grid items-center justify-center gap-4">
              <form
                className="flex flex-col w-full items-center justify-center gap-2"
                onSubmit={handleSubmitBtn}
              >
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Name:</p>
                  <input
                    required
                    type="text"
                    name="riderName"
                    placeholder="Rider's name"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className="w-96 text-end">Email:</p>
                  <input
                    required
                    type="email"
                    name="riderEmail"
                    placeholder="Rider's email address"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Phone&nbsp;No:</p>
                  <input
                    required
                    type="text"
                    name="riderContact"
                    placeholder="Mobile with country code"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Date&nbsp;of&nbsp;Birth:</p>
                  <input
                    required
                    type="text"
                    name="riderDOB"
                    placeholder="DD/MM/YYYY"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Gender:</p>
                  <input
                    required
                    type="text"
                    name="riderGender"
                    placeholder="Gender"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Country:</p>
                  <input
                    required
                    type="text"
                    name="riderCountry"
                    placeholder="Country"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">State:</p>
                  <input
                    required
                    type="text"
                    name="riderState"
                    placeholder="State"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Work&nbsp;Location:</p>
                  <input
                    required
                    type="text"
                    name="riderWorkLocation"
                    placeholder="Select one"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Present&nbsp;Address:</p>
                  <input
                    required
                    type="text"
                    name="riderAddress"
                    placeholder="Rider full address"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <input
                  type="file"
                  multiple="multiple"
                  name="documentsImage"
                  className="file-input outline-none w-full max-w-xs my-4 focus:outline-none"
                />
                <div className="flex items-center justify-end gap-4 pb-4">
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
        <DeliveryManAddConfirmationPopup
          popupIsOpen={popupIsOpen}
          handlePopup={handlePopup}
        ></DeliveryManAddConfirmationPopup>
      </section>
    </div>
  );
};

export default DeliveryAddNew;
