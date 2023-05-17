import React, { useRef } from 'react'
import { upload } from '../../Assets/getImages'

function UploadFile({handleChange,handleAddImage,handleDeleteFile,item,fileRef}) {
  const file_info = `file_info${item?.id}`
  const color_category = `color_category${item?.id}`
  const filter_link = `filter_link${item?.id}`
  const filter_price = `filter_price${item?.id}`
  

  return (
    <div className="flex flex-col gap-4">
                {/* image upload  */}
                <div className="flex w-full gap-2 ml-auto">
                  <div className='w-1/3 shrink-0'></div>
                  <div className='w-2/3 flex-1'>
                    <div className='mb-2'>
                      <p className="text-base font-bold text-pureBlackColor">Image {item?.id}</p>
                    </div>
                    <div className="border border-dotted border-primaryMain rounded-lg py-6 px-4 flex flex-col justify-center items-center ">
                      <img src={upload} alt="" className="w-10" />
                      <label
                        className="cursor-pointer capitalize text-primaryMain font-medium mt-2"
                        htmlFor={file_info}
                      >
                        Upload Image( Recomended 1080x1920px)
                      </label>
                      <input
                        type="file"
                        name={file_info}
                        onChange={(e)=> handleChange(e.target.files[0], file_info , item?.id )}
                        id={file_info}
                        className="w-1 h-1 opacity-0"
                        ref={fileRef}
                        required
                      />
                    </div>

                    {item?.[file_info] && (
                      <div className="flex items-center gap-4 mt-2">
                        <p>{item?.[file_info]?.name}</p>
                        <button
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-errorMidColor"
                          onClick={()=>handleDeleteFile(file_info , item?.id)}
                        >
                          <span className="material-symbols-outlined text-sm text-whiteHigh">
                            close
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* color category  */}

                <div className="flex items-center justify-center gap-2">
                  <p className=" w-1/3 text-end shrink-0">Color Category:</p>
                  <select
                    name={color_category}
                    onChange={(e)=> handleChange(e.target.value, color_category, item?.id)}
                    className="select w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh font-medium flex-1"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Any
                    </option>
                    <option value="bangladesh">Bangladesh</option>
                    <option value="usa">USA</option>
                  </select>
                </div>
                {/* filter link  */}

                <div className="flex items-center justify-center gap-2">
                  <p className=" w-1/3 text-end shrink-0">Filter Link(Except E-card):</p>
                  <input
                    type="text"
                    name={filter_link}
                    onChange={(e)=> handleChange(e.target.value, filter_link, item?.id)}
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
                    name={filter_price}
                    onChange={(e)=> handleChange(e.target.value, filter_price, item?.id)}
                    placeholder="Price counts on Coins"
                    className="input w-2/3 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh flex-1"
                    required
                  />
                </div>
              </div>
  )
}

export default UploadFile