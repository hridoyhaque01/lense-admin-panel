import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { StaffContext } from "../../Contexts/StaffContext/StaffProvider";
import { firebaseFirestore } from "../../Firebase/firebase.config";

const StaffEdit = () => {
  const { id } = useParams();
  const { updateSingleStaff } = useContext(StaffContext);
  const [currentStaff, setCurrentStaff] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/staffAll";

  useEffect(() => {
    const fetchSingleStaff = async () => {
      try {
        const ref = doc(firebaseFirestore, "userDetails", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const staff = docSnap.data();
          return setCurrentStaff(staff);
        } else {
          console.log("No such doCUMent!");
        }
      } catch (error) {
        console.error("Error fetching doCUMent!", error);
      }
    };
    fetchSingleStaff();
  }, [id]);

  const handleEditBtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const contact = form.contact.value;
    const dob = form.dob.value;
    const gender = form.gender.value;
    const country = form.country.value;
    const presentAddress = form.presentAddress.value;
    const userType = form.userType.value;

    const newStaff = {
      user_name: name,
      user_email: email,
      user_contact: contact,
      user_dob: dob,
      user_gender: gender,
      user_country: country,
      user_address: presentAddress,
      user_type: userType,
    };
    console.log(newStaff);
    updateSingleStaff(newStaff, id);
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <section className="w-full mt-10 mr-8 rounded-lg ">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
        <p className="font-bold text-2xl pl-4 py-5">Edit Staffs</p>
      </div>
      <div>
        <section className="py-4 bg-whiteHigh">
          <form className="w-8/12 flex flex-col mx-auto gap-2">
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Name:</p>
              <input
                type="text"
                name="name"
                placeholder="staff name"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Email Address:</p>
              <input
                type="email"
                name="email"
                placeholder="staff email"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Set Password:</p>
              <input
                type="password"
                name="password"
                placeholder="set password"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Confirm Password:</p>
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Phone Number:</p>
              <input
                type="number"
                name="number"
                placeholder="staff phone number"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Role:</p>
              <select
                name="userType"
                className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value={"Admin"}>Admin</option>
                <option value={"Manager"}>Manager</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4">
              <Link to={"/staffAll"}>
                <label className="btn rounded-full w-36 normal-case bg-whiteHigh text-primaryMain border-primaryMain hover:border-primaryMain hover:bg-whiteHigh">
                  Cancel
                </label>
              </Link>
              <button
                type="submit"
                className="btn submit rounded-full w-36 normal-case bg-primaryMain border-primaryMain hover:text-primaryMain hover:bg-whiteHigh hover:border-primaryMain"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default StaffEdit;
