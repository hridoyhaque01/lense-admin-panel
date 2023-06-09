import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import avater from "../../../Assets/img/profile/avater.png";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import "./SideNav.css";

const SideNav = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");
  const [isSubmenuActive, setIsSubmenuActive] = useState();

  const { dbUser, userType } = useContext(AuthContext);

  // const navigate = useNavigate();

  const toggleSideNav = () => {
    setIsClosed(!isClosed);
    setCanShow(!canShow);
  };

  // const openSideNav = (e) => {
  //   setIsClosed(false);
  // };

  const handleMouseEnter = () => {
    setIsClosed(false);
    setTimeout(() => {
      setCanShow(false);
    }, 150);
  };
  const handleMouseLeave = () => {
    setIsClosed(true);
    setTimeout(() => {
      setCanShow(true);
    }, 150);
    // setCanShow(true);
  };

  const activateMenu = (index) => {
    setIsActive(index);
  };

  // const handleNavigation = (navRoute) => {
  //   const navigationRoute = `/${navRoute}`;
  //   navigate(navigationRoute, { replace: true });
  //   activateMenu(navRoute);
  // };

  console.log(isActive)
  console.log(isSubmenuActive)

  return (
    <div
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      className={`${
        isClosed ? "w-20" : "w-72"
      } bg-whiteHigh flex flex-col gap-1 h-full mt-10 rounded-r-lg sideNav overflow-x-hidden `}
    >
      {/* user area */}
      <section
        className={`flex items-center justify-between p-3 gap-2 rounded-tr-lg`}
      >
        <div className="flex items-center gap-2 shrink-0">
          <div>
            <img
              className="w-12 h-12 rounded-full"
              src={avater}
              alt=""
            />
          </div>
          <div className={`${
            canShow ? "hidden" : "block"
          }`}>
            <p className="font-black">Lense App</p>
            <p className="text-sm">Super Admin</p>
          </div>
        </div>

        
      </section>
      {/* routes */}
      <section className="flex flex-col justify-start items-start gap-1">
        {/* dashboard */}
        {(userType === "Admin" || userType === "Manager") && (
          <div className="w-full">
            <Link
              onClick={() => activateMenu("dashboard")}
              className={`flex items-center w-full py-4 ${
                isActive === "dashboard"
                  ? "bg-whiteMid text-primaryMain border-r-2 border-primaryMain"
                  : "text-blackMid"
              }`}
              to="/"
            >
              <span className="material-symbols-outlined pl-6">dashboard</span>
              &nbsp;
              <p className={`${canShow ? "hidden" : "block"} shrink-0`}>Dashboard</p>
            </Link>
          </div>
        )}

        {/* users */}

        {(userType === "Admin" || userType === "Manager") && (
          <div className="w-full">
            <Link
              onClick={() => activateMenu("users")}
              className={`flex items-center w-full py-4 ${
                isActive === "users"
                  ? "bg-whiteMid text-primaryMain border-r-2 border-primaryMain"
                  : "text-blackMid"
              }`}
              to="/userAll"
            >
              <span className="material-symbols-outlined pl-6">person</span>
              &nbsp;
              <p className={`${canShow ? "hidden" : "block"} shrink-0`}>Users</p>
            </Link>
          </div>
        )}

        {/* staffs */}

        {(userType === "Admin" || userType === "Manager") && (
          <div className="w-full">
            <Link
              onClick={() => activateMenu("staffs")}
              className={`flex items-center w-full py-4 ${
                isActive === "staffs"
                  ? "bg-whiteMid text-primaryMain border-r-2 border-primaryMain"
                  : "text-blackMid"
              }`}
              to="/staffAll"
            >
              <span className="material-symbols-outlined pl-6 ">group</span>
              &nbsp;
              <p className={`${canShow ? "hidden" : "block"} shrink-0`}>Staffs</p>
            </Link>
          </div>
        )}

        {/* filters */}
        {(userType === "Admin" || userType === "Manager") && (


          <div
            onClick={() => activateMenu("filters")}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed || isActive !== "filters" ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === "filters" ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" className="cursor-pointer" />
            <div className="collapse-title">
              <div className="flex items-center">
                <span className="material-symbols-outlined pl-2">
                  photo_library
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full shrink-0`}
                >
                  <span>Filters</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "filters" &&
                    isSubmenuActive === "snapchat" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/snapchatFilter"
                  onClick={() => setIsSubmenuActive("snapchat")}
                >
                  <p>Snapchat</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "filters" &&
                    isSubmenuActive === "tiktok" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/tiktokFilter"
                  onClick={() => setIsSubmenuActive("tiktok")}
                >
                  <p>Tiktok</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "filters" &&
                    isSubmenuActive === "e-card" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/ecardFilter"
                  onClick={() => setIsSubmenuActive("e-card")}
                >
                  <p>E-Cards</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* artists */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu("artists")}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed || isActive !== "artists" ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === "artists" ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="flex items-center">
                <span className="material-symbols-outlined pl-2">
                  imagesearch_roller
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full shrink-0`}
                >
                  <span>Artists</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "artists" &&
                    isSubmenuActive === "pending" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/artistsPending"
                  onClick={() => setIsSubmenuActive("pending")}
                >
                  <p>Pending</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "artists" &&
                    isSubmenuActive === "approved" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/artistsApproved"
                  onClick={() => setIsSubmenuActive("approved")}
                >
                  <p>Approved</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* category */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu("category")}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed || isActive !== "category" ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === "category" ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="flex items-center">
                <span className="material-symbols-outlined pl-2">
                  receipt_long
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full shrink-0`}
                >
                  <span>Category</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "category" &&
                    isSubmenuActive === "categories" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/categories"
                  onClick={() => setIsSubmenuActive("categories")}
                >
                  <p>Categories</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "category" &&
                    isSubmenuActive === "Collections" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/collections"
                  onClick={() => setIsSubmenuActive("Collections")}
                >
                  <p>Collections</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "category" &&
                    isSubmenuActive === "Featured" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/featured"
                  onClick={() => setIsSubmenuActive("Featured")}
                >
                  <p>Featured</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* withdraws */}

        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu("withdraws")}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed || isActive !== "withdraws" ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === "withdraws" ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="flex items-center">
                <span className="material-symbols-outlined pl-2">paid</span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full shrink-0`}
                >
                  <span>Withdraws</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "withdraws" &&
                    isSubmenuActive === "Pending" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/withdrawPending"
                  onClick={() => setIsSubmenuActive("Pending")}
                >
                  <p>Pending</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "withdraws" &&
                    isSubmenuActive === "Completed" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/withdrawConfirmed"
                  onClick={() => setIsSubmenuActive("Completed")}
                >
                  <p>Completed</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "withdraws" &&
                    isSubmenuActive === "Cancelled" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/withdrawCancelled"
                  onClick={() => setIsSubmenuActive("Cancelled")}
                >
                  <p>Cancelled</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* app setings */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu("appSetting")}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed || isActive !== "appSetting" ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === "appSetting" ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="flex items-center">
                <span className="material-symbols-outlined pl-2">
                  app_settings_alt
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full shrink-0`}
                >
                  <span>App Settings</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "appSetting" &&
                    isSubmenuActive === "Notifications" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/orderspending"
                  onClick={() => setIsSubmenuActive("Notifications")}
                >
                  <p>Snapchat Filter</p>
                </Link>
                <Link
                  className={`w-full py-2 pl-12 ${
                    isActive === "appSetting" &&
                    isSubmenuActive === "Others" &&
                    "bg-blueLight text-primaryMain border-r-2 border-primaryMain"
                  }`}
                  to="/ordersprocessing"
                  onClick={() => setIsSubmenuActive("Others")}
                >
                  <p>Tiktok Filter</p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
      <div
          className="flex items-start justify-between gap-4 overflow-auto pl-6"
        >
          <button onClick={toggleSideNav} className="btn-btn-ghost">
            <span className="material-symbols-outlined">
              menu_open
            </span>
          </button>
        </div>
    </div>
  );
};

export default SideNav;
