import React from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StaffContext } from "../../Contexts/StaffContext/StaffProvider";

const FiltersAddNew = () => {
  const { addOneStaff } = useContext(StaffContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/staffAll";

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
    addOneStaff(newStaff);
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <section className="overflow-auto w-full pt-10 pb-32 pr-10 rounded-lg bg-whiteHigh">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
        <p className="font-bold text-2xl pl-4 py-5">Add Filter</p>
      </div>
      <div>
        <section className="pt-4">
        {/* 
Set Password
+01445 4564 2465
Select Role   */}
          <div className="grid items-center justify-center gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleEditBtn}>
              <div className="flex flex-col w-full items-center justify-center gap-2">
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Name:</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="enter full name"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>

                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Email Adress:</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Set Password:</p>
                  <input
                    type="text"
                    name="password"
                    placeholder="Set Password"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Confirm New Password:</p>
                  <input
                    type="text"
                    name="confirmPassword"
                    placeholder="Set Password"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>
                
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Phone Number:</p>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>
                
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Role:</p>
                  <select
                    name="userType"
                    className="select bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh font-medium"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value={"Admin"}>Admin</option>
                    <option value={"Manager"}>Manager</option>
                  </select>
                </div>
                
              </div>
              <div className="flex items-center justify-end gap-4">
                <Link to={"/staffAll"}>
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

export default FiltersAddNew;
