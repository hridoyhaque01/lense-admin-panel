import React from "react";

const ArtistsConfirmationBlockPopup = ({
  currentOrder,
  clickHandlerForModals,
}) => {
  return (
    <section>
      <input type="checkbox" id="ordersBlockPopup" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col items-center justify-center gap-4">
          <div>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60 10C32.4 10 10 32.4 10 60C10 87.6 32.4 110 60 110C87.6 110 110 87.6 110 60C110 32.4 87.6 10 60 10ZM65 85H55V75H65V85ZM65 65H55V35H65V65Z"
                fill="url(#paint0_linear_630_70960)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_630_70960"
                  x1="60"
                  y1="10"
                  x2="60"
                  y2="110"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#37B6B6" />
                  <stop offset="1" stopColor="#37B6B6" stopOpacity="0.18" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">
              Do you want to {`cancel #${currentOrder?.order_id}`}?
            </p>
          </div>
          <div className="modal-action flex items-center justify-center">
            <label
              onClick={() => {
                clickHandlerForModals(currentOrder?.order_id);
              }}
              htmlFor="ordersBlockPopup"
              className="btn rounded-full bg-primaryMain border-primaryMain hover:text-primaryMain hover:bg-whiteHigh hover:border-primaryMain w-full"
            >
              Confirm
            </label>
            <label
              htmlFor="ordersBlockPopup"
              className="btn rounded-full bg-whiteHigh text-primaryMain w-full border-primaryMain hover:border-primaryMain hover:bg-whiteHigh"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsConfirmationBlockPopup;
