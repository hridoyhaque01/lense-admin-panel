import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import avater from "../../../Assets/img/profile/avater.png";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import "./SideNav.css";

const SideNav = () => {
  const [isClosed, setIsClosed] = useState();
  const [canShow, setCanShow] = useState();
  const [isActive, setIsActive] = useState("dashboard");
  const [isSubmenuActive, setIsSubmenuActive] = useState();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});
  const submenuRef = useRef({});

  const { dbUser, userType } = useContext(AuthContext);

  // const navigate = useNavigate();

  const toggleSideNav = () => {
    setIsClosed(!isClosed);
    setCanShow(!canShow);
  };

  const handleMenus = (menu, submenu) => {
    setIsActive(menu);
    setIsSubmenuActive(submenu);
  };

  const handleDropdown = (menu, submenuOpen) => {
    if (!submenuOpen) {
      setIsSubmenuOpen((prev) => ({
        [menu]: !prev[menu],
      }));
    }
  }

  // const handleNavigation = (navRoute) => {
  //   const navigationRoute = `/${navRoute}`;
  //   navigate(navigationRoute, { replace });
  //   activateMenu(navRoute);
  // };

  return (
    <div
      className={`${
        isClosed ? "w-20" : "w-72"
      } bg-navyDark flex flex-col gap-1 h-full sideNav pb-24 overflow-auto text-whiteHigh`}
    >
      {/* user area */}


      {/* <section
        className={`flex items-center justify-between p-3 gap-2 rounded-tr-lg`}
      >
        <div className="flex items-center gap-2 shrink-0">
          <div>
            <img className="w-12 h-12 rounded-full" src={avater} alt="" />
          </div>
          <div className={`${canShow ? "hidden" : "block"} `}>
            <p className="font-black">Lense App</p>
            <p className="text-sm">Super Admin</p>
          </div>
        </div>
      </section> */}


      {/* routes */}
      <section className="flex flex-col flex-1 justify-start items-start gap-1 py-4">
        {/* dashboard  */}
        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "dashboard"
                && "bg-primaryMain"
            }`}
            onClick={() => handleMenus("dashboard", "")}
          >
            <span className="material-symbols-outlined">dashboard</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>dashboard</span>
            </p>
          </Link>
        </div>

        
        {/* filters  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none`}
            onClick={() => handleDropdown("filter", )}
          >
            <span className="material-symbols-outlined">photo_library</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>filters</span>
            </p>
            <span
              className={`material-symbols-outlined duration-100 ${
                isSubmenuOpen["filter"] ? "rotate-180" : "rotate-0"
              } ${isClosed && "hidden"}`}
            >
              expand_more
            </span>
          </div>
          {/* submenu  */}

          <div
            ref={(ref) => (submenuRef.current["filter"] = ref)}
            className={`flex flex-col gap-1 duration-200`}
            style={{
              maxHeight:
                isSubmenuOpen["filter"] 
                  ? `${submenuRef.current["filter"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/snapchatFilter"
              className={`py-3 pl-12 ${
                isSubmenuActive === "snapchat"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("filter", "snapchat")}
            >
              <p>Snapchat</p>
            </Link>
            <Link
              to="/tiktokFilter"
              className={`py-3 pl-12 ${
                isSubmenuActive === "tiktok"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("filter", "tiktok")}
            >
              <p>tiktok</p>
            </Link>
            <Link
              to="/ecardFilter"
              className={`py-3 pl-12 ${
                isSubmenuActive === "card"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("filter", "card")}
            >
              <p>e-card</p>
            </Link>
          </div>
        </div>

        
        {/* Upload requests  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/upload_request"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "upload" && "bg-primaryMain"
            }`}
            onClick={() => handleMenus("upload", )}
          >
            <span className="material-symbols-outlined">photo_library</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>upload request</span>
            </p>
          </Link>
        </div>

        {/* users  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/userAll"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "users" && "bg-primaryMain"
            }`}
            onClick={() => handleMenus("users", "")}
          >
            <span className="material-symbols-outlined">person</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>users</span>
            </p>
          </Link>
        </div>

        
        {/* artists  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none`}
            onClick={() => handleDropdown("artists", )}
          >
            <span className="material-symbols-outlined">
              imagesearch_roller
            </span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>artists</span>
            </p>
            <span
              className={`material-symbols-outlined duration-100 ${
                isSubmenuOpen["artists"] ? "rotate-180" : "rotate-0"
              } ${isClosed && "hidden"}`}
            >
              expand_more
            </span>
          </div>
          {/* submenu  */}

          <div
            ref={(ref) => (submenuRef.current["artists"] = ref)}
            className={`flex flex-col gap-1 duration-200`}
            style={{
              maxHeight:
                isSubmenuOpen["artists"]
                  ? `${submenuRef.current["artists"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/artistsPending"
              className={`py-3 pl-12 ${
                isSubmenuActive === "pending"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("artists", "pending")}
            >
              <p>pending</p>
            </Link>
            <Link
              to="/artistsApproved"
              className={`py-3 pl-12 ${
                isSubmenuActive === "approved"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("artists", "approved")}
            >
              <p>approved</p>
            </Link>
          </div>
        </div>


        {/* Platform  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/platform"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "platform" && "bg-primaryMain"
            }`}
            onClick={() => handleMenus("platform", "",)}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>platform</span>
            </p>
          </Link>
        </div>

        {/* Category  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/categories"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "categories" && "bg-primaryMain"
            }`}
            onClick={() => handleMenus("categories", "", )}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>Category</span>
            </p>
          </Link>
        </div>

        {/* Collections  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/collections"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "collections" && "bg-primaryMain"
            }`}
            onClick={() => handleMenus("collections", "", )}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>collections</span>
            </p>
          </Link>
        </div>

        {/* staffs  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/staffAll"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "staffs" && "bg-primaryMain"
            }`}
            onClick={() => handleMenus("staffs", "", )}
          >
            <span className="material-symbols-outlined">group</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>staffs</span>
            </p>
          </Link>
        </div>



        {/* category  */}

        {/* <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none`}
            onClick={() => handleMenus("category", "",)}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>categories</span>
            </p>
            <span
              className={`material-symbols-outlined duration-100 ${
                isSubmenuOpen["category"] ? "rotate-180" : "rotate-0"
              } ${isClosed && "hidden"}`}
            >
              expand_more
            </span>
          </div>

          <div
            ref={(ref) => (submenuRef.current["category"] = ref)}
            className={`flex flex-col gap-1 duration-200`}
            style={{
              maxHeight:
                isSubmenuOpen["category"]
                  ? `${submenuRef.current["category"]?.scrollHeight}px`
                  : "0",
            }}
          >
            <Link
              to="/categories"
              className={`py-3 pl-12 ${
                isSubmenuActive === "categories"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("category", "categories")}
            >
              <p>categories</p>
            </Link>
            <Link
              to="/collections"
              className={`py-3 pl-12 ${
                isSubmenuActive === "collections"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("category", "collections")}
            >
              <p>collections</p>
            </Link>
            <Link
              to="/featured"
              className={`py-3 pl-12 ${
                isSubmenuActive === "featured"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("category", "featured")}
            >
              <p>featured</p>
            </Link>
          </div>
        </div> */}

        {/* withdraw  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none`}
            onClick={() => handleDropdown("withdraw", false)}
          >
            <span className="material-symbols-outlined">paid</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>withdraw</span>
            </p>
            <span
              className={`material-symbols-outlined duration-100 ${
                isSubmenuOpen["withdraw"] ? "rotate-180" : "rotate-0"
              } ${isClosed && "hidden"}`}
            >
              expand_more
            </span>
          </div>
          {/* submenu  */}

          <div
            ref={(ref) => (submenuRef.current["withdraw"] = ref)}
            className={`flex flex-col gap-1 duration-200`}
            style={{
              maxHeight:
                isSubmenuOpen["withdraw"]
                  ? `${submenuRef.current["withdraw"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/withdrawPending"
              className={`py-3 pl-12 ${
                isSubmenuActive === "pending"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("withdraw", "pending")}
            >
              <p>pending</p>
            </Link>
            <Link
              to="/withdrawConfirmed"
              className={`py-3 pl-12 ${
                isSubmenuActive === "completed"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("withdraw", "completed")}
            >
              <p>approved</p>
            </Link>
            <Link
              to="/withdrawCancelled"
              className={`py-3 pl-12 ${
                isSubmenuActive === "cancelled"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("withdraw", "cancelled")}
            >
              <p>cancelled</p>
            </Link>
          </div>
        </div>

        {/* app settings  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none`}
            onClick={() => handleDropdown("appSetting", false)}
          >
            <span className="material-symbols-outlined">app_settings_alt</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>app settings</span>
            </p>
            <span
              className={`material-symbols-outlined duration-100 ${
                isSubmenuOpen["appSetting"] ? "rotate-180" : "rotate-0"
              } ${isClosed && "hidden"}`}
            >
              expand_more
            </span>
          </div>
          {/* submenu  */}

          <div
            ref={(ref) => (submenuRef.current["appSetting"] = ref)}
            className={`flex flex-col gap-1 duration-200`}
            style={{
              maxHeight:
                isSubmenuOpen["appSetting"]
                  ? `${submenuRef.current["appSetting"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/"
              className={`py-3 pl-12 ${
                isSubmenuActive === "notifications"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("appSetting", "notifications")}
            >
              <p>notifications</p>
            </Link>
            <Link
              to="/otherSetting"
              className={`py-3 pl-12 ${
                isSubmenuActive === "others"
                  ? "bg-primaryMain text-whiteHigh"
                  : "text-whiteHigh"
              }`}
              onClick={() => handleMenus("appSetting", "others")}
            >
              <p>others</p>
            </Link>
          </div>
        </div>
      </section>
      {/* <div className="pl-6">
        <button onClick={toggleSideNav} className="btn-btn-ghost">
          <span className="material-symbols-outlined">menu_open</span>
        </button>
      </div> */}
    </div>
  );
};

export default SideNav;
