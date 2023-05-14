import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StaffContext } from "../../Contexts/StaffContext/StaffProvider";
import {upload} from "../../Assets/getImages"

const CollectionAddNew = () => {
  const { addOneStaff } = useContext(StaffContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/staffAll";

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleDeleteFile = () => {
    setSelectedFile(null);
  };


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
    <section className="w-full overflow-auto pt-10 pb-32 pr-10 rounded-lg ">
    <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
      <p className="font-bold text-2xl pl-4 py-5">Add Collection</p>
    </div>
    <div>
      <section className="py-4 bg-whiteHigh">
        <form className="w-8/12 flex flex-col mx-auto gap-2">

          {/* platform  */}
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end">Platform:</p>
            <input
              type="text"
              name="platform"
              placeholder="platform name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              required
            />
          </div>

          {/* category  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end">Category:</p>
            <select
              name="category"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium"
              required
            >
              <option value="" selected disabled>
                Select Any
              </option>
              <option value={""}>Bangladesh</option>
              <option value={""}>USA</option>
            </select>
          </div>

          {/* type  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end">Type:</p>
            <select
              name="type"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium"
              required
            >
              <option value="" selected disabled>
                Select Any
              </option>
              <option value={""}>Bangladesh</option>
              <option value={""}>USA</option>
            </select>
          </div>

          
          {/* Collection name  */}

          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end">Collection name:</p>
            <input
              type="text"
              name="collection-name"
              placeholder="collection name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              required
            />
          </div>

          {/* description  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end">Description:</p>

            <textarea name="description" className="h-16 pt-2 resize-none input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh" placeholder="description"></textarea>
          </div>

          
          {/* availibility  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end">Availability::</p>
            <select
              name="availability"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium"
              required
            >
              <option value="" selected disabled>
                Select Any
              </option>
              <option value={""}>Bangladesh</option>
              <option value={""}>USA</option>
            </select>
          </div>

          
          {/* Artist  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end">Artist name:</p>
            <input
              type="text"
              name="artist-name"
              placeholder="artist name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
              required
            />
          </div>

          
          {/* upload  */}

          <div className="w-2/3 flex flex-col gap-4 ml-auto">
              <div className="border border-dotted border-primaryMain rounded-lg py-6 px-4 flex flex-col justify-center items-center gap-2">
                <img src={upload} alt="" className="w-10" />
                <label
                  className="cursor-pointer capitalize text-primaryMain font-medium"
                  htmlFor="fileUpload"
                >
                  file upload
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="fileUpload"
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="flex items-center gap-4">
                  <p>{selectedFile?.name}</p>{" "}
                  <button
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-errorMidColor"
                    onClick={handleDeleteFile}
                  >
                    <span className="material-symbols-outlined text-sm text-whiteHigh">
                      close
                    </span>
                  </button>
                </div>
              )}
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
};

export default CollectionAddNew;
