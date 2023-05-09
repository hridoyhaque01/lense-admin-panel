import React from "react";

const DeliveryManAddConfirmationPopup = ({ popupIsOpen, handlePopup }) => {
  return (
    <section>
      <input
        type="checkbox"
        id="deliveryManConfirmed"
        className="modal-toggle"
      />
      <div className={`modal ${popupIsOpen} modal-bottom sm:modal-middle`}>
        <div className="modal-box flex flex-col items-center justify-center gap-4">
          <div>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="120"
                height="120"
                rx="60"
                fill="url(#paint0_linear_976_104062)"
              />
              <path
                d="M48.2667 74.3003L32.8667 58.9003L27.7334 64.0336L48.2667 84.5669L92.2667 40.5669L87.1334 35.4336L48.2667 74.3003Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_976_104062"
                  x1="60"
                  y1="0"
                  x2="60"
                  y2="120"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#37B6B6" />
                  <stop offset="1" stopColor="#37B6B6" stopOpacity="0.18" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">Congratulation!</p>
            <p>Delivery Man has been Added.</p>
          </div>
          <div className="modal-action flex items-center justify-center">
            <label
              onClick={() => {
                handlePopup(null);
              }}
              className="btn normal-case rounded-full bg-whiteHigh text-primaryMain w-36 border-primaryMain hover:border-primaryMain hover:bg-whiteHigh"
            >
              Got it
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryManAddConfirmationPopup;
