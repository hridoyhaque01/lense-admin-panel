import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryConfirmationCancelPopup from "../../Components/Modals/DeliveryMan/DeliveryConfirmationCancelPopup";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import PaymentGatewaysTable from "../../Components/Tables/PaymentGateways/PaymentGatewaysTable";
import { PaymentContext } from "../../Contexts/PaymentContext/PaymentProvider";

const PaymentGateway = () => {
  const [selectedGateways, setSelectedGateways] = useState([]);
  const {
    isLoading,
    fetchGateways,
    searchBarValue,
    filteredGatewaysBySearch,
    filterGatewaysBySearch,
    currentGateway,
    setCurrentGateway,
    updateManyGatewayStatus,
  } = useContext(PaymentContext);

  const handleSelectCheckbox = (gateway, e) => {
    const selectedGatewaysList = [...selectedGateways];
    if (e.target.checked) {
      selectedGatewaysList.push(gateway?.gateway_id);
    } else {
      const index = selectedGatewaysList.indexOf(gateway?.gateway_id);
      if (index !== -1) {
        selectedGatewaysList.splice(index, 1);
      }
    }
    setSelectedGateways(selectedGatewaysList);
  };

  const handleSelectAllCheckbox = (gateways, e) => {
    const selectAllGateway = [];
    if (e?.target?.checked) {
      gateways?.map((gateway) => {
        return selectAllGateway?.push(gateway?.gateway_id);
      });
    } else {
      setSelectedGateways([]);
    }
    setSelectedGateways(selectAllGateway);
  };

  const handleApproveAll = (gateway, status) => {
    updateManyGatewayStatus(gateway, status);
    setSelectedGateways([]);
  };

  return (
    <div className="overflow-x-auto w-full py-10 pr-10">
      <div className="flex items-center justify-between p-3 bg-secondaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Payment Gateway</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterGatewaysBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={fetchGateways}
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-secondaryMain">
                refresh
              </span>
            </button>
            <Link
              to="/paymentGatewayAdd"
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-secondaryMain">
                add
              </span>
            </Link>
          </div>
        </section>
      </div>

      <div
        className={` ${
          selectedGateways?.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedGateways, "Cancelled")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedGateways, "Approved")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <PaymentGatewaysTable
          rows={filteredGatewaysBySearch}
          setCurrentGateway={setCurrentGateway}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          handleSelectCheckbox={handleSelectCheckbox}
        ></PaymentGatewaysTable>
      )}
      {/* cancel modal popup */}
      <DeliveryConfirmationCancelPopup
        currentRider={currentGateway}
      ></DeliveryConfirmationCancelPopup>
    </div>
  );
};

export default PaymentGateway;
