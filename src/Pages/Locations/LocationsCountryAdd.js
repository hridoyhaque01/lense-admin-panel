import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryManAddConfirmationPopup from "../../Components/Modals/DeliveryMan/DeliveryManAddConfirmationPopup";
import { LocationContext } from "../../Contexts/LocationContext/LocationProvider";

const LocationsCountryAdd = () => {
  const { addCountry } = useContext(LocationContext);
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
    const countryName = form?.countryName.value;

    const newCountry = {
      name: countryName,
    };
    try {
      addCountry(newCountry);
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
          <h2 className="font-bold text-2xl pl-4 py-5">Country</h2>
        </div>
        <div>
          <section className="">
            <p className="text-center text-blackMid py-4 font-semibold text-xl">
              Add a Country
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
                  <p className=" w-96 text-end">Country Name:</p>
                  <input
                    required
                    type="text"
                    name="countryName"
                    placeholder="Enter Country name"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-end gap-4 pb-4">
                  <Link to="/locationsCountry">
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

export default LocationsCountryAdd;
