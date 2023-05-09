import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import avater from "../../../Assets/img/profile/avater.png"


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
    // setTimeout(() => {
    //   setCanShow(!canShow);
    // }, 100);
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

  console.log(isActive, isSubmenuActive)

  // const handleNavigation = (navRoute) => {
  //   const navigationRoute = `/${navRoute}`;
  //   navigate(navigationRoute, { replace: true });
  //   activateMenu(navRoute);
  // };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        isClosed ? "w-20" : "w-72"
      } bg-whiteHigh flex flex-col gap-1 h-full mt-10 rounded-r-lg sideNav overflow-x-auto `}
    >
      {/* user area */}
      <section
        className={`flex items-center justify-between p-3 gap-2 rounded-tr-lg`}
      >
        <div className="min-w-12">
          <img
            className="w-12 h-12 rounded-full"
            src={avater}
            alt=""
          />
        </div>
        <div
          className={`${
            canShow ? "hidden" : "block"
          } flex items-start justify-between gap-4 overflow-auto`}
        >
          <div>
            <p className="font-black">{dbUser?.user_name}</p>
            <p className="text-sm">{dbUser?.user_type}</p>
          </div>
        </div>
        <div
          className={`${
            canShow ? "hidden" : "block"
          } flex items-start justify-between gap-4 overflow-auto`}
        >
          <button onClick={toggleSideNav} className="btn-btn-ghost">
            <span className="material-symbols-outlined">
              menu_open
            </span>
          </button>
        </div>
      </section>
      {/* routes */}
      <section className="flex flex-col justify-start items-start gap-1">
        {/* dashboard */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu("dashboard")}
            className={`px-2 py-4 w-full ${
              isActive === "dashboard"
                ? "bg-whiteMid text-primaryMain border-r-2 border-primaryMain"
                : 'text-blackMid'
            }`}
          >
            <Link
              className={`flex items-center ${
                isClosed ? "justify-center" : "justify-start pl-2"
              }`}
              to="/"
            >
              <span className="material-symbols-outlined">
                dashboard
              </span>
              &nbsp;
              <p className={`${canShow ? "hidden" : "block"}`}>Dashboard</p>
            </Link>
          </div>
        )}
        
        {/* users */}

         {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu("users")}
            className={`px-2 py-4 w-full ${
              isActive === "users"
                ? "bg-whiteMid text-primaryMain border-r-2 border-primaryMain"
                : 'text-blackMid'
            }`}
          >
            <Link
              className={`flex items-center ${
                isClosed ? "justify-center" : "justify-start pl-2"
              }`}
              to="/"
            >
              <span className="material-symbols-outlined">
                person
              </span>
              &nbsp;
              <p className={`${canShow ? "hidden" : "block"}`}>Users</p>
            </Link>
          </div>
        )}

        {/* staffs */}

         {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu("staffs")}
            className={`px-2 py-4 w-full ${
              isActive === "staffs"
                ? "bg-whiteMid text-primaryMain border-r-2 border-primaryMain"
                : 'text-blackMid'
            }`}
          >
            <Link
              className={`flex items-center ${
                isClosed ? "justify-center" : "justify-start pl-2"
              }`}
              to="/"
            >
              <span className="material-symbols-outlined">
                group
              </span>
              &nbsp;
              <p className={`${canShow ? "hidden" : "block"}`}>Staffs</p>
            </Link>
          </div>
        )}

        {/* filters */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu('filters')}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === 'filters' ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div
                className={`flex items-center ${
                  isClosed ? "justify-center pl-2" : "justify-start"
                }`}
              >
                <span class="material-symbols-outlined">
                    photo_library
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full`}
                >
                  <span>Filters</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link className={`w-full py-2 pl-11 ${isActive === 'filters' && isSubmenuActive === 'snapchat' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/orderspending" onClick={()=> setIsSubmenuActive('snapchat')}>
                  <p>Snapchat Filter</p>
                </Link>
                <Link className={`w-full py-2 pl-11 ${isActive === 'filters' && isSubmenuActive === 'tiktok' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/ordersprocessing" onClick={()=> setIsSubmenuActive('tiktok')}>
                  <p>Tiktok Filter</p>
                </Link>
                <Link className={`w-full py-2 pl-11 ${isActive === 'filters' && isSubmenuActive === 'e-card' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/orderspickedup" onClick={()=> setIsSubmenuActive('e-card')}>
                  <p>E-Cards</p>
                </Link>
              </div>
            </div>
          </div>
        )}
       
        {/* artists */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu('artists')}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === 'artists' ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div
                className={`flex items-center ${
                  isClosed ? "justify-center pl-2" : "justify-start"
                }`}
              >
                <span class="material-symbols-outlined">
                  imagesearch_roller
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full`}
                >
                  <span>Artists</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link className={`w-full py-2 pl-11 ${isActive === 'artists' && isSubmenuActive === 'pending' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/orderspending" onClick={()=> setIsSubmenuActive('pending')}>
                  <p>Pending</p>
                </Link>
                <Link className={`w-full py-2 pl-11 ${isActive === 'artists' && isSubmenuActive === 'approved' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/ordersprocessing" onClick={()=> setIsSubmenuActive('approved')}>
                  <p>Approved</p>
                </Link>
                
              </div>
            </div>
          </div>
        )}
       
        {/* category */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu('category')}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === 'category' ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div
                className={`flex items-center ${
                  isClosed ? "justify-center pl-2" : "justify-start"
                }`}
              >
                <span class="material-symbols-outlined">
                  receipt_long
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full`}
                >
                  <span>Category</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link className={`w-full py-2 pl-11 ${isActive === 'category' && isSubmenuActive === 'Collections' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/orderspending" onClick={()=> setIsSubmenuActive('Collections')}>
                  <p>Collections</p>
                </Link>
                <Link className={`w-full py-2 pl-11 ${isActive === 'category' && isSubmenuActive === 'Featured' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/ordersprocessing" onClick={()=> setIsSubmenuActive('Featured')}>
                  <p>Featured</p>
                </Link>
                
              </div>
            </div>
          </div>
        )}

        {/* withdraws */}
        
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu('withdraws')}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === 'withdraws' ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div
                className={`flex items-center ${
                  isClosed ? "justify-center pl-2" : "justify-start"
                }`}
              >
                <span class="material-symbols-outlined">
                    paid
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full`}
                >
                  <span>Withdraws</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link className={`w-full py-2 pl-11 ${isActive === 'withdraws' && isSubmenuActive === 'Pending' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/orderspending" onClick={()=> setIsSubmenuActive('Pending')}>
                  <p>Pending</p>
                </Link>
                <Link className={`w-full py-2 pl-11 ${isActive === 'withdraws' && isSubmenuActive === 'Completed' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/ordersprocessing" onClick={()=> setIsSubmenuActive('Completed')}>
                  <p>Completed</p>
                </Link>
                <Link className={`w-full py-2 pl-11 ${isActive === 'withdraws' && isSubmenuActive === 'Cancelled' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/orderspickedup" onClick={()=> setIsSubmenuActive('Cancelled')}>
                  <p>Cancelled</p>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* app setings */}
        {(userType === "Admin" || userType === "Manager") && (
          <div
            onClick={() => activateMenu('appSetting')}
            className={`collapse ${!isClosed ? "collapse-arrow" : null} ${
              isClosed ? "collapse-close" : ""
            } w-full mx-auto ${
              isActive === 'appSetting' ? "text-primaryMain" : "text-blackMid"
            }`}
          >
            <input type="checkbox" />
            <div className="collapse-title">
              <div
                className={`flex items-center ${
                  isClosed ? "justify-center pl-2" : "justify-start"
                }`}
              >
                <span class="material-symbols-outlined">
                    app_settings_alt
                </span>
                &nbsp;
                <p
                  className={`${
                    canShow ? "hidden" : "block"
                  } flex items-center justify-between w-full`}
                >
                  <span>App Settings</span>
                </p>
              </div>
            </div>
            <div className="collapse-content p-0 bg-whiteHigh">
              <div className="flex flex-col justify-start items-start gap-2 text-blackMid">
                <Link className={`w-full py-2 pl-11 ${isActive === 'appSetting' && isSubmenuActive === 'Notifications' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/orderspending" onClick={()=> setIsSubmenuActive('Notifications')}>
                  <p>Snapchat Filter</p>
                </Link>
                <Link className={`w-full py-2 pl-11 ${isActive === 'appSetting' && isSubmenuActive === 'Others' && 'bg-blueLight text-primaryMain border-r-2 border-primaryMain'}`} to="/ordersprocessing" onClick={()=> setIsSubmenuActive('Others')}>
                  <p>Tiktok Filter</p>
                </Link>
                
              </div>
            </div>
          </div>
        )}

        
      </section>
    </div>
  );
};

export default SideNav;
