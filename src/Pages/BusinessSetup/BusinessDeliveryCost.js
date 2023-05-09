import React, { useContext, useState } from "react";
import { BusinessContext } from "../../Contexts/BusinessContext/BusinessProvider";

const BusinessDeliveryCost = () => {
  const { addDeliveryCost, documentPrices } = useContext(BusinessContext);
  const [selectedValue, setSelectedValue] = useState("parcel");

  const handleChange = (event) => {
    setSelectedValue(event?.target?.value);
  };

  const handleSubmitBtn = async (event) => {
    event.preventDefault();
    const form = event?.target;
    const localBellowOnePrice = form?.localBellowOnePrice?.value;
    const localOneToFivePrice = form?.localOneToFivePrice?.value;
    const localFiveToTenPrice = form?.localFiveToTenPrice?.value;
    const domesticBellowOnePrice = form?.domesticBellowOnePrice?.value;
    const domesticOneToFivePrice = form?.domesticOneToFivePrice?.value;
    const domesticFiveToTenPrice = form?.domesticFiveToTenPrice?.value;
    const internationalBellowOnePrice =
      form?.internationalBellowOnePrice?.value;
    const internationalOneToFivePrice =
      form?.internationalOneToFivePrice?.value;
    const internationalFiveToTenPrice =
      form?.internationalFiveToTenPrice?.value;
    const packageType = selectedValue;

    const DeliveryCost = {
      local_bellow_one: localBellowOnePrice,
      local_one_to_five: localOneToFivePrice,
      local_five_to_ten: localFiveToTenPrice,
      domestic_bellow_one: domesticBellowOnePrice,
      domestic_one_to_five: domesticOneToFivePrice,
      domestic_five_to_ten: domesticFiveToTenPrice,
      international_bellow_one: internationalBellowOnePrice,
      international_one_to_five: internationalOneToFivePrice,
      international_five_to_ten: internationalFiveToTenPrice,
      package_type: packageType,
    };
    try {
      addDeliveryCost(DeliveryCost);
      // addOneRider(newRider, documentsImages);
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
                <div className="py-4 flex items-center justify-center">
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
                </div>
                {/* 3 types based on location */}
                <section className="flex items-center justify-evenly w-full">
                  {/* local */}
                  <div>
                    <p className="text-2xl py-4 text-blackHigh text-center font-bold">
                      Local
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">Bellow&nbsp;1KG:</p>
                        <input
                          required
                          type="number"
                          name="localBellowOnePrice"
                          defaultValue={documentPrices?.local_bellow_one}
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">1-5KG:</p>
                        <input
                          required
                          type="number"
                          name="localOneToFivePrice"
                          defaultValue={documentPrices?.local_one_to_five}
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">5-10KG:</p>
                        <input
                          required
                          type="number"
                          name="localFiveToTenPrice"
                          defaultValue={documentPrices?.local_five_to_ten}
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
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
                        <p className=" w-24 text-end">Bellow&nbsp;1KG:</p>
                        <input
                          required
                          type="number"
                          name="domesticBellowOnePrice"
                          defaultValue={documentPrices?.domestic_bellow_one}
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">1-5KG:</p>
                        <input
                          required
                          type="number"
                          name="domesticOneToFivePrice"
                          defaultValue={documentPrices?.domestic_one_to_five}
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">5-10KG:</p>
                        <input
                          required
                          type="number"
                          name="domesticFiveToTenPrice"
                          defaultValue={documentPrices?.domestic_five_to_ten}
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
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
                        <p className=" w-24 text-end">Bellow&nbsp;1KG:</p>
                        <input
                          required
                          type="number"
                          name="internationalBellowOnePrice"
                          defaultValue={
                            documentPrices?.international_bellow_one
                          }
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">1-5KG:</p>
                        <input
                          required
                          type="number"
                          name="internationalOneToFivePrice"
                          defaultValue={
                            documentPrices?.international_one_to_five
                          }
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className=" w-24 text-end">5-10KG:</p>
                        <input
                          required
                          type="number"
                          name="internationalFiveToTenPrice"
                          defaultValue={
                            documentPrices?.international_five_to_ten
                          }
                          className="input border-2 border-blackLow border-opacity-20 p-1 focus:outline-none w-24 text-right"
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

export default BusinessDeliveryCost;
