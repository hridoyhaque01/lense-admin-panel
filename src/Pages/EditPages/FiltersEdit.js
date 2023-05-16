import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { upload } from "../../Assets/getImages";

export default function FiltersEdit() {
  const handleEditBtn = () => {
    console.log("hello");
  };

  const [fileInfo, setFileInfo] = useState("")

  const handleFile = (event) =>{
    setFileInfo(event.target.files[0])

    console.log(event.target.files[0])
  }

  const handleDeleteFile = () =>{
    setFileInfo("")
  }



  const { state } = useLocation();
  const { redirect } = state || {};

  return (
    <section className="w-full overflow-auto pt-10 pb-32 pr-10 rounded-lg">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
        <p className="font-bold text-2xl pl-4 py-5">Edit Filter</p>
      </div>
      <div>
        <section className="py-4 bg-whiteHigh">
          <form className="w-8/12 flex flex-col mx-auto gap-2">

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
            <p className=" w-1/3 text-end shrink-0">Category:</p>
            <select
            onChange={()=> console.log("hello")}
              name="category"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium flex-1"
              required
              defaultValue="Select Any"
            >
              <option  disabled>
                Select Any
              </option>
              <option value="Elon's Adventure">Elon's Adventure</option>
              <option value="Cronostars">Cronostars</option>
              <option value="MOAR by Joan Cornella">"MOAR" by Joan Cornella</option>
              <option value="Bored Ape Yacht Club">Bored Ape Yacht Club</option>
              <option value="Mutant Ape Yacht Club">Mutant Ape Yacht Club</option>
              <option value="IcyHouses">IcyHouses</option>
              <option value="Game Art NFT">Game Art NFT</option>
              <option value="Azuki">Azuki</option>
              <option value="Honorary Chimps">Honorary Chimps</option>
              <option value="Cronos Rocks">Cronos Rocks</option>
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
              defaultValue="Select Any"
            >
              <option  disabled>
                Select Any
              </option>
              <option value="Std">Std</option>
              <option value="Gif">Gif</option>
              <option value="Ar">Ar</option>
            </select>
          </div>

          
          {/* Collection name  */}

          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Collection name:</p>
            <input
              type="text"
              name="collection-name"
              placeholder="collection name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1"
              required
            />
          </div>

          {/* description  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Description:</p>

            <textarea name="description" className="h-16 pt-2 resize-none input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1" placeholder="description"></textarea>
          </div>

          
          {/* Artist name  */}
          
          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Artist name:</p>
            <input
              type="text"
              name="artist-name"
              placeholder="artist name"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1"
              required
            />
          </div>
          

          {/* color category  */}

          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Color Category:</p>
            <select
              name="color_category"
              className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium flex-1"
              required
              defaultValue="Select Any"
            >
              <option value="" disabled>
                Select Any
              </option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Violet">Violet</option>
              <option value="Black">Black</option>
              
            </select>
          </div>

          {/* filter link  */}

          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Filter Link(Except E-card):</p>
            <input
              type="text"
              name="filter_link"
              placeholder="Paste here Snapchat or TikTok Link"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1"
              required
            />
          </div>

          {/* filter price  */}

          <div className="flex items-center justify-center gap-2">
            <p className=" w-1/3 text-end shrink-0">Filter Price:</p>
            <input
              type="text"
              name="filter_price"
              placeholder="Price counts on Coins"
              className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1"
              required
            />
          </div>

          {/* image upload  */}

          <div className="flex w-full gap-2 ml-auto">
              <div className='w-1/3 shrink-0'></div>
              <div className='w-2/3 flex-1'>
                
                <div className="border border-dotted border-primaryMain rounded-lg py-6 px-4 flex flex-col justify-center items-center gap-2 mb-2">
                  <img src={upload} alt="" className="w-10" />
                  <label
                    className="cursor-pointer capitalize text-primaryMain font-medium"
                    htmlFor="file_upload"
                  >
                    Upload Image( Recomended 1080x1920px)
                  </label>
                  <input
                    type="file"
                    name="file_info"
                    onChange={(e)=> handleFile(e)}
                    id="file_upload"
                    className="hidden"
                  />
                </div>

                {fileInfo?.name && (
                  <div className="flex items-center gap-4">
                    <p>{fileInfo.name}</p>
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
