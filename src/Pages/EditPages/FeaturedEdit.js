import React from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedEdit() {

    const handleEditBtn = () => {
        console.log("hello")
    }

  return (
    <section className="w-full mt-10 mr-8 rounded-lg bg-whiteHigh">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
        <p className="font-bold text-2xl pl-4 py-5">Featured Edit</p>
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

                {/* name  */}
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Name:</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>
                {/* email  */}
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Email:</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>

                {/* Full Legal Name  */}

                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Full Legal Name:</p>
                  <input
                    type="text"
                    name="legalName"
                    placeholder="Enter full name"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>

                {/* Bank Account Number / IBAN */}
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Bank Account Number / IBAN:</p>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter bank account number"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>

                {/* Bank Official Name */}

                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Bank Official Name:</p>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Enter bank official name"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>
                
                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">country:</p>
                  <select
                    name="userType"
                    className="select bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh font-medium"
                  >
                    <option value="" selected disabled>Select country</option>
                    <option value={"Admin"}>Bangladesh</option>
                    <option value={"Manager"}>United States</option>
                  </select>
                </div>

                {/* Address  */}

                <div className="flex items-center justify-center gap-1">
                  <p className=" w-96 text-end">Address:</p>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="input bg-whiteHigh border-1 border-whiteLow focus:outline-none w-96 text-blackHigh"
                  />
                </div>
                
              </div>
              <div className="flex items-center justify-end gap-4">
                <Link to={"/snapchatFilter"}>
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
  )
}
