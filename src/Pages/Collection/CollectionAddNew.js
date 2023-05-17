import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StaffContext } from "../../Contexts/StaffContext/StaffProvider";
import {upload} from "../../Assets/getImages"
import UploadFile from "../../Components/Collection/UploadFile";

const CollectionAddNew = () => {
  const { addOneStaff } = useContext(StaffContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/staffAll";
  const fileRef = useRef({})


  const [uploadData, setUploadData] = useState([
    {
      id: 1,
      file_info1 : "",
      color_category1: "",
      filter_link1: "",
      filter_price1: "",
    },
    {
      id: 2,
      file_info2 : "",
      color_category2: "",
      filter_link2: "",
      filter_price2: "",
    },
    {
      id: 3,
      file_info3 : "",
      color_category3: "",
      filter_link3: "",
      filter_price3: "",
    },
    {
      id: 4,
      file_info4 : "",
      color_category4: "",
      filter_link4: "",
      filter_price4: "",
    },
    {
      id: 5,
      file_info5 : "",
      color_category5: "",
      filter_link5: "",
      filter_price5: "",
    },
  ])


  const handleChange = (value,file_name,id) => {
    const updatedData = uploadData?.map((item)=> {
      if(item?.id === id && value !== undefined ) {
        return {
          ...item,
          [file_name] : value,
        }
      }
      return item
    })
    setUploadData(updatedData)
  };

  // form submit handler 

  const handleSubmit = (event) =>{

    event.preventDefault()
    const form = event.target;
    const platform = form?.platform.value;
    const category = form?.category.value;
    const type = form?.type.value;
    const collection_name = form?.collection_name.value;
    const description = form?.description.value;
    const availibility = form?.availability.value;
    const artist = form?.artist_name.value;

    const newObj = {
      platform,
      category,
      type,
      collection_name,
      description,
      availibility,
      artist,
      ...uploadData
    }
    console.log(newObj)
  }

  
  const handleDeleteFile = (file_name, id) => {
    const updatedData = uploadData?.map((item)=> {
      if(item?.id === id) {
        fileRef.current[file_name].value = "" ;
        return {
          ...item,
          [file_name] : ""
        }
      }
      return item
    })
    setUploadData(updatedData)
  };


  const handleAddImage = () => {
    const maxId = Math.max(...uploadData.map(obj => obj.id)) + 1;
    const file_info = `file_info${maxId}`
    const color_category = `color_category${maxId}`
    const filter_link = `filter_link${maxId}`
    const filter_price = `filter_price${maxId}`
    setUploadData([...uploadData,
      {
      id: maxId,
      [file_info] : "",
      [color_category] : "",
      [filter_link] : "",
      [filter_price] : "",
    }])
  }


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
        <form className="w-8/12 flex flex-col mx-auto gap-2" onSubmit={handleSubmit}>

          {/* platform  */}
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Platform:</p>
            <input
              type="text"
              name="platform"
              placeholder="platform name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh  flex-1"
              required
            />
          </div>

          {/* category  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className="w-1/3 text-end shrink-0">Category:</p>
            <select
              onChange={() => console.log("hello")}
              name="category"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium flex-1"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Any
              </option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="USA">USA</option>
            </select>
          </div>



          {/* type  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Type:</p>
            <select
            onChange={()=> console.log("hello")}
              name="type"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium flex-1"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Any
              </option>
              <option value="bd">Bangladesh</option>
              <option value="usa">USA</option>
            </select>
          </div>

          
          {/* Collection name  */}

          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Collection name:</p>
            <input
              type="text"
              name="collection_name"
              placeholder="collection name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1"
              required
            />
          </div>

          {/* description  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Description:</p>

            <textarea name="description" required className="h-16 pt-2 resize-none input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1" placeholder="description"></textarea>
          </div>

          
          {/* availibility  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Availability:</p>
            <select
            onChange={()=> console.log("hello")}
              name="availability"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium flex-1"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Any
              </option>
              <option value="bd">Bangladesh</option>
              <option value="usa">USA</option>
            </select>
          </div>

          
          {/* Artist  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Artist name:</p>
            <input
              type="text"
              name="artist_name"
              placeholder="artist name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1"
              required
            />
          </div>

          
          {/* upload  */}

          <div className="">
            <div className="w-2/3 ml-auto mt-7 mb-6">
              <h2 className="text-2xl text-center font-bold text-pureBlackColor">Add Filters</h2>
            </div>

            <div className="flex flex-col gap-6">
              {uploadData?.map((item)=> {
                return (
                    <UploadFile key={item?.id} item={item} handleChange={handleChange} handleDeleteFile={handleDeleteFile} fileRef={(ref) => (fileRef.current[`file_info${item?.id}`] = ref)}></UploadFile>
                )
              })}
            </div>
              
              <div className="flex justify-end mt-6">
                <button className="flex items-center" type="button" onClick={handleAddImage}>
                  <span className="material-symbols-outlined text-primaryMain">
                    add_circle
                  </span>
                  <span className="text-base text-pureBlackColor">Add another image</span>
                </button>
              </div>
          </div>

          

          {/* buttons  */}

          <div className="flex items-center justify-end gap-4 mt-4">
            <Link to={"/collections"}>
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
