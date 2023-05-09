import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryManAddConfirmationPopup from "../../Components/Modals/DeliveryMan/DeliveryManAddConfirmationPopup";
import { LocationContext } from "../../Contexts/LocationContext/LocationProvider";

const LocationsStateAdd = () => {
  const { addState, countries, selectedCountry, setSelectedCountry } =
    useContext(LocationContext);
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
    const stateName = form?.stateName.value;

    const newState = {
      name: stateName,
    };
    try {
      addState(newState);
      setTimeout(() => {
        handlePopup("modal-open");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event?.target?.value);
  };

  return (
    <div className="w-full mt-10 mr-8">
      <section className="bg-whiteHigh rounded-b-lg">
        <div className="flex items-center bg-secondaryMain text-whiteHigh rounded-t-lg w-full">
          <h2 className="font-bold text-2xl pl-4 py-5">State</h2>
        </div>
        <div>
          <section className="">
            <p className="text-center text-blackMid py-4 font-semibold text-xl">
              Add a State
            </p>
            <div className="grid items-center justify-center gap-4">
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <form className="flex flex-col gap-2" onSubmit={handleSubmitBtn}>
                  <div className="flex items-center justify-center gap-3">
                    <p className=" w-96 text-end">Country:</p>
                    <select
                      className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      {countries?.map((country, i) => {
                        return <option key={i}>{country?.name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <p className=" w-96 text-end">State Name:</p>
                    <input
                      required
                      type="text"
                      name="stateName"
                      placeholder="Enter State name"
                      className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-4 pb-4">
                    <Link to="/locationsState">
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

export default LocationsStateAdd;
