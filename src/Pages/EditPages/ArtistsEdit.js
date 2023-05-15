import React from "react";
import { Link } from "react-router-dom";

export default function ArtistsEdit() {
  const handleEditBtn = () => {
    console.log("hello");
  };

  return (
    <section className="w-full overflow-auto pt-10 pb-32 pr-10 rounded-lg ">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
        <p className="font-bold text-2xl pl-4 py-5">Edit Artist</p>
      </div>
      <div>
        <section className="py-4 bg-whiteHigh">
          <form className="w-8/12 flex flex-col mx-auto gap-2">

            {/* name  */}
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Name:</p>
              <input
                type="text"
                name="name"
                placeholder="artist name"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>

            
            {/* username name  */}

            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Username:</p>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            
            {/* mobile nubmer  */}

            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Mobile number:</p>
              <input
                type="number"
                name="mobile-number"
                placeholder="contact number"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>

            {/* email  */}
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Email:</p>
              <input
                type="email"
                name="email"
                placeholder="artis email"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>

                       
            {/* description  */}
            
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Description:</p>

              <textarea name="description" className="h-16 pt-2 resize-none input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh" placeholder="description"></textarea>
            </div>


            {/* bank number  */}

            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Bank Account Number / IBAN::</p>
              <input
                type="number"
                name="bank-number"
                placeholder="bank account number"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>

            {/* bank name  */}

            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Bank Official Name:</p>
              <input
                type="text"
                name="bank-name"
                placeholder="bank official name"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            {/* country  */}

            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Country:</p>
              <select
                name="userType"
                className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium"
                required
                defaultValue="Select Country"
              >
                <option disabled>
                  Select Country
                </option>
                <option value={"Admin"}>Bangladesh</option>
                <option value={"Manager"}>USA</option>
              </select>
            </div>


            {/* address  */}

            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 text-end">Address:</p>
              <input
                type="text"
                name="address"
                placeholder="address"
                className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            {/* buttons  */}

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
}
