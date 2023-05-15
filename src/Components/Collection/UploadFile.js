import React from 'react'
import { upload } from '../../Assets/getImages'

function UploadFile({handleChange,handleAddImage,handleDeleteFile,item}) {
  return (
    <div className="flex flex-col gap-4">
                {/* image upload  */}
                <div className="w-2/3 flex flex-col gap-4 ml-auto">
                  <div>
                    <p className="text-base font-bold text-pureBlackColor">Image {item?.id}</p>
                  </div>
                  <div className="border border-dotted border-primaryMain rounded-lg py-6 px-4 flex flex-col justify-center items-center gap-2">
                    <img src={upload} alt="" className="w-10" />
                    <label
                      className="cursor-pointer capitalize text-primaryMain font-medium"
                      htmlFor={`fileUpload${item?.id}`}
                    >
                      Upload Image( Recomended 1080x1920px)
                    </label>
                    <input
                      type="file"
                      name="file_info"
                      onChange={(e)=> handleChange(e,item?.id)}
                      id={`fileUpload${item?.id}`}
                      className="hidden"
                    />
                  </div>

                  {item?.file_info && (
                    <div className="flex items-center gap-4">
                      <p>{item?.file_info?.name}</p>{" "}
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-errorMidColor"
                        onClick={()=>handleDeleteFile(item?.id)}
                      >
                        <span className="material-symbols-outlined text-sm text-whiteHigh">
                          close
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                {/* color category  */}

                <div className="flex items-center justify-center gap-2">
                  <p className=" w-1/3 text-end">Color Category:</p>
                  <select
                    name={`color_category${item?.id}`}
                    className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium"
                    required
                    defaultValue="Select Any"
                  >
                    <option value="" disabled>
                      Select Any
                    </option>
                    <option value={""}>Bangladesh</option>
                    <option value={""}>USA</option>
                  </select>
                </div>
                {/* filter link  */}

                <div className="flex items-center justify-center gap-2">
                  <p className=" w-1/3 text-end">Filter Link(Except E-card):</p>
                  <input
                    type="text"
                    name={`filter_link${item?.id}`}
                    placeholder="Paste here Snapchat or TikTok Link"
                    className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                    required
                  />
                </div>
                {/* filter price  */}

                <div className="flex items-center justify-center gap-2">
                  <p className=" w-1/3 text-end">Filter Price:</p>
                  <input
                    type="text"
                    name={`filter_price${item?.id}`}
                    placeholder="Price counts on Coins"
                    className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                    required
                  />
                </div>
              </div>
  )
}

export default UploadFile