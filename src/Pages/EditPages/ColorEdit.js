import React, { useState } from 'react'
import { upload } from '../../Assets/getImages';
import { Link } from 'react-router-dom';

function ColorEdit() {

    
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  return (
    <section className="overflow-auto w-full pt-10 pb-32 pr-10 rounded-lg">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
        <p className="font-bold text-2xl pl-4 py-5">Add Color</p>
      </div>
      <div>
        <section className="py-4 bg-whiteHigh">
          <form className="w-8/12 flex flex-col mx-auto gap-2">
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 shrink-0 text-end">Color name:</p>
              <input
                type="text"
                name="name"
                placeholder="type name here"
                className="input w-2/3 flex-1 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/3 shrink-0"></div>
              <div className="w-2/3 flex-1 flex flex-col gap-4 ml-auto">
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
            </div>

            

            <div className="flex items-center justify-end gap-4 mt-4">
              <Link to="/colors">
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
  )
}

export default ColorEdit;