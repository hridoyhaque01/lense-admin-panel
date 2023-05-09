import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { WarehouseContext } from "../../Contexts/WarehouseContext/WarehouseProvider";
import { firebaseFirestore } from "../../Firebase/firebase.config";

const WarehouseEdit = () => {
  const { id } = useParams();
  const { updateSingleWarehouse } = useContext(WarehouseContext);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/warehouseAll";

  useEffect(() => {
    const fetchSingleWarehouse = async () => {
      try {
        const ref = doc(firebaseFirestore, "warehouseDetails", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const warehouse = docSnap.data();
          return setCurrentWarehouse(warehouse);
        } else {
          console.log("No such doCUMent!");
        }
      } catch (error) {
        console.error("Error fetching doCUMent!", error);
      }
    };
    fetchSingleWarehouse();
  }, [id]);

  const handleEditBtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const warehouseName = form?.warehouseName.value;
    const warehouseEmail = form?.warehouseEmail.value;
    const warehouseCountry = form?.warehouseCountry.value;
    const warehouseState = form?.warehouseState.value;
    const warehouseCity = form?.warehouseCity.value;
    

    const newWarehouse = {
      warehouse_name: warehouseName,
      warehouse_email: warehouseEmail,
      warehouse_country: warehouseCountry,
      warehouse_state: warehouseState,
      warehouse_city: warehouseCity,
    };
    console.log(newWarehouse);
    updateSingleWarehouse(newWarehouse, id);
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <section className="w-full mt-10 mr-8">
      <div className="flex items-center bg-secondaryMain text-whiteHigh rounded-t-lg w-full">
        <p className="font-bold text-2xl pl-4 py-5">Edit</p>
      </div>
      <div>
        <section className="">
          <p className="text-center text-blackMid py-4 font-semibold text-xl">
            Editing the Warehouse: {currentWarehouse?.warehouse_name}
          </p>
          <div className="grid items-center justify-center gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleEditBtn}>
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Warehouse&nbsp;Name:</p>
                  <input
                    type="name"
                    name="warehouseName"
                    defaultValue={currentWarehouse?.warehouse_name}
                    placeholder="email"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Warehouse&nbsp;Email:</p>
                  <input
                    disabled
                    type="email"
                    name="warehouseEmail"
                    defaultValue={currentWarehouse?.warehouse_email}
                    placeholder="email"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Country:</p>
                  <input
                    type="text"
                    name="warehouseCountry"
                    defaultValue={currentWarehouse?.warehouse_country}
                    placeholder="Country"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">State:</p>
                  <input
                    type="text"
                    name="warehouseState"
                    defaultValue={currentWarehouse?.warehouse_state}
                    placeholder="State"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">City:</p>
                  <input
                    type="text"
                    name="warehouseCity"
                    defaultValue={currentWarehouse?.warehouse_city}
                    placeholder="City"
                    className="input bg-whiteHigh border-2 border-blackLow border-opacity-25 focus:outline-none w-96 font-bold"
                  />
                </div>
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

export default WarehouseEdit;
