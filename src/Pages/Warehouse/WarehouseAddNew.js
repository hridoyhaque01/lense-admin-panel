import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { WarehouseContext } from "../../Contexts/WarehouseContext/WarehouseProvider";

const WarehouseAddNew = () => {
  const { createNewUserEmail } = useContext(AuthContext);
  const { addOneWarehouse } = useContext(WarehouseContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/warehouseAll";

  const handleSubmitBtn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const warehouseName = form?.warehouseName.value;
    const warehouseEmail = form?.warehouseEmail.value;
    const warehousePassword = form?.warehousePassword.value;
    const warehousePasswordConfirm = form?.warehousePasswordConfirm.value;
    const warehouseCountry = form?.warehouseCountry.value;
    const warehouseState = form?.warehouseState.value;
    const warehouseCity = form?.warehouseCity.value;
    const warehouseStatus = "Active";

    const newWarehouse = {
      warehouse_name: warehouseName,
      warehouse_email: warehouseEmail,
      warehouse_password: warehousePassword,
      warehouse_password_confirm: warehousePasswordConfirm,
      warehouse_country: warehouseCountry,
      warehouse_state: warehouseState,
      warehouse_city: warehouseCity,
      warehouse_status: warehouseStatus,
    };
    if (warehousePassword === warehousePasswordConfirm) {
      try {
        createNewUserEmail(warehouseEmail, warehousePassword);
        addOneWarehouse(newWarehouse);
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 5000);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("password mila bhai");
    }
  };

  return (
    <div className="w-full mt-10 mr-8">
      <section className="bg-whiteHigh rounded-b-lg">
        <div className="flex items-center bg-secondaryMain text-whiteHigh rounded-t-lg w-full">
          <h2 className="font-bold text-2xl pl-4 py-5">Add Warehouse</h2>
        </div>
        <div>
          <section className="">
            <p className="text-center text-blackMid py-4 font-semibold text-xl">
              Add a Delivery Man
            </p>
            <div className="grid items-center justify-center gap-4">
              <form
                className="flex flex-col w-full items-center justify-center gap-2"
                onSubmit={handleSubmitBtn}
              >
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Warehouse Name:</p>
                  <input
                    required
                    type="text"
                    name="warehouseName"
                    placeholder="Warehouse Name"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className="w-96 text-end">Warehouse Email:</p>
                  <input
                    required
                    type="email"
                    name="warehouseEmail"
                    placeholder="Warehouse Email Address"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Create&nbsp;Password:</p>
                  <input
                    required
                    type="password"
                    name="warehousePassword"
                    placeholder="Create Password"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Confirm&nbsp;Password:</p>
                  <input
                    required
                    type="password"
                    name="warehousePasswordConfirm"
                    placeholder="Confirm Password"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">Country:</p>
                  <input
                    required
                    type="text"
                    name="warehouseCountry"
                    placeholder="Country"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">State:</p>
                  <input
                    required
                    type="text"
                    name="warehouseState"
                    placeholder="State"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <p className=" w-96 text-end">City:</p>
                  <input
                    required
                    type="text"
                    name="warehouseCity"
                    placeholder="City"
                    className="input border-2 border-blackLow border-opacity-20 p-2 focus:outline-none w-96"
                  />
                </div>
                <div className="flex items-center justify-end gap-4 pb-4">
                  <Link to={"/warehouseAll"}>
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
    </div>
  );
};

export default WarehouseAddNew;
