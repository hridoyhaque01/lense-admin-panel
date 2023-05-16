import React from 'react'
import { Link } from 'react-router-dom'

function PlatformAdd() {
  return (
    <section className="w-full overflow-auto pt-10 pb-32 pr-10 rounded-lg ">
      <div className="flex items-center bg-primaryMain text-whiteHigh rounded-t-lg  w-full">
        <p className="font-bold text-2xl pl-4 py-5">Add Platform</p>
      </div>
      <div>
        <div className="py-4 bg-whiteHigh">
          <form className="w-8/12 flex flex-col mx-auto gap-2">
            <div className="flex items-center justify-center gap-2">
              <p className=" w-1/3 shrink-0 text-end">Platform Name:</p>
              <input
                type="text"
                name="platform_name"
                placeholder="Type name here"
                className="input w-2/3 flex-1 bg-whiteHigh border-1 border-whiteLow focus:outline-none text-blackHigh"
                required
              />
            </div>
            <div className="flex items-center justify-end gap-4 mt-4">
              <Link to={"/platform"}>
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
          </div>
        </div>
    </section>

  )
}

export default PlatformAdd