import React, { useContext } from "react";
import { BusinessContext } from "../../Contexts/BusinessContext/BusinessProvider";

const BusinessDeliveryManCharge = () => {
  const { addDeliveryManCharge, deliveryManCharges } =
    useContext(BusinessContext);

  const handleSubmitBtn = async (event) => {
    event.preventDefault();
    const form = event?.target;
    const localDeliveryCharge = form?.localDeliveryCharge?.value;
    const domesticDeliveryCharge = form?.domesticDeliveryCharge?.value;
    const internationalDeliveryCharge =
      form?.internationalDeliveryCharge?.value;

    const DeliveryCost = {
      local_delivery_charge: localDeliveryCharge,
      domestic_delivery_charge: domesticDeliveryCharge,
      international_delivery_charge: internationalDeliveryCharge,
      package_type: "deliveryManCharge",
    };
    try {
      addDeliveryManCharge(DeliveryCost);
      console.log(DeliveryCost);
      setTimeout(() => {}, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full mt-10 mr-8">
      <section className=" bg-whiteHigh rounded-b-xl">
        <div className="flex items-center bg-secondaryMain text-whiteHigh rounded-t-lg w-full">
          <h2 className="font-bold text-2xl pl-4 py-5">Business Setup</h2>
        </div>
        <div>
          <section className="">
            <div className="">
              <form
                onSubmit={handleSubmitBtn}
                className="flex flex-col w-full items-center justify-center gap-2"
              >
                {/* type toggler */}
                {/* <div className="py-4 flex items-center justify-center">
                  <div>
                    <label className="label cursor-pointer">
                      <span
                        className={`label-text ${
                          selectedValue === "parcel"
                            ? "bg-pureBlackColor text-whiteHigh"
                            : "text-pureBlackColor bg-whiteHigh"
                        } px-4 py-2 rounded-full`}
                      >
                        Parcel
                      </span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio hidden"
                        value="parcel"
                        checked={selectedValue === "parcel"}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span
                        className={`label-text ${
                          selectedValue === "document"
                            ? "bg-pureBlackColor text-whiteHigh"
                            : "text-pureBlackColor bg-whiteHigh"
                        } px-4 py-2 rounded-full`}
                      >
                        Document
                      </span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio hidden"
                        value="document"
                        checked={selectedValue === "document"}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div> */}
                {/* 3 types based on location */}
                <section className="flex items-center justify-evenly w-full">
                  {/* local */}
                  <div>
                    <p className="text-2xl py-4 text-blackHigh text-center font-bold">
                      Local
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">Charge:</p>
                        <input
                          required
                          type="number"
                          name="localDeliveryCharge"
                          defaultValue={
                            deliveryManCharges?.local_delivery_charge
                          }
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-20 text-right"
                        />
                      </div>
                    </div>
                  </div>
                  {/* domestic */}
                  <div>
                    <p className="text-2xl py-4 text-blackHigh text-center font-bold">
                      Domestic
                    </p>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">Charge:</p>
                        <input
                          required
                          type="number"
                          name="domesticDeliveryCharge"
                          defaultValue={
                            deliveryManCharges?.domestic_delivery_charge
                          }
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-20 text-right"
                        />
                      </div>
                    </div>
                  </div>
                  {/* international */}
                  <div>
                    <p className="text-2xl py-4 text-blackHigh text-center font-bold">
                      International
                    </p>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">Charge:</p>
                        <input
                          required
                          type="number"
                          name="internationalDeliveryCharge"
                          defaultValue={
                            deliveryManCharges?.international_delivery_charge
                          }
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-20 text-right"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                {/* action buttons */}
                <div className="flex items-center justify-end gap-4 py-8">
                  <label className="btn rounded-full w-36 normal-case bg-whiteHigh text-primaryMain border-primaryMain hover:border-primaryMain hover:bg-whiteHigh">
                    Cancel
                  </label>
                  <button className="btn submit rounded-full w-36 normal-case bg-primaryMain border-primaryMain hover:text-primaryMain hover:bg-whiteHigh hover:border-primaryMain">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default BusinessDeliveryManCharge;
