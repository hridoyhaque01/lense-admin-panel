import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import avater from "../../../Assets/img/profile/avater.png";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import "./SideNav.css";

const SideNav = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [canShow, setCanShow] = useState(false);
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

  const handleMenus = (menu, submenu, submenuOpen) => {
    setIsActive(menu);
    setIsSubmenuActive(submenu);

    if (isSubmenuActive !== "") {
      console.log(true);
    }

    if (!submenuOpen) {
      setIsSubmenuOpen((prev) => ({
        [menu]: !prev[menu],
      }));
    }
  };

  // const handleNavigation = (navRoute) => {
  //   const navigationRoute = `/${navRoute}`;
  //   navigate(navigationRoute, { replace: true });
  //   activateMenu(navRoute);
  // };

  return (
    <div
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
            <img className="w-12 h-12 rounded-full" src={avater} alt="" />
          </div>
          <div className={`${canShow ? "hidden" : "block"}`}>
            <p className="font-black">Lense App</p>
            <p className="text-sm">Super Admin</p>
          </div>
        </div>
      </section>
      {/* routes */}
      <section className="flex flex-col justify-start items-start gap-1">
        {/* dashboard  */}
        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "dashboard"
                ? "text-primaryMain bg-whiteMid border-r-2 border-primaryMain"
                : "text-blackMid"
            }`}
            onClick={() => handleMenus("dashboard", "", false)}
          >
            <span className="material-symbols-outlined">dashboard</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>dashboard</span>
            </p>
          </Link>
        </div>

        {/* users  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/userAll"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "users"
                ? "text-primaryMain bg-whiteMid border-r-2 border-primaryMain"
                : "text-blackMid"
            }`}
            onClick={() => handleMenus("users", "", false)}
          >
            <span className="material-symbols-outlined">person</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>users</span>
            </p>
          </Link>
        </div>

        {/* staffs  */}

        <div className="w-full overflow-hidden capitalize">
          <Link
            to="/staffAll"
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "staffs"
                ? "text-primaryMain bg-whiteMid border-r-2 border-primaryMain"
                : "text-blackMid"
            }`}
            onClick={() => handleMenus("staffs", "", false)}
          >
            <span className="material-symbols-outlined">group</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>staffs</span>
            </p>
          </Link>
        </div>

        {/* filters  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "filter" ? "text-primaryMain" : "text-blackMid"
            }`}
            onClick={() => handleMenus("filter", "")}
          >
            <span className="material-symbols-outlined">photo_library</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>filters</span>
            </p>
            <span
              class={`material-symbols-outlined duration-100 ${
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
                isSubmenuOpen["filter"] && isActive === "filter"
                  ? `${submenuRef.current["filter"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/snapchatFilter"
              className={`py-3 pl-12 ${
                isSubmenuActive === "snapchat"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("filter", "snapchat", true)}
            >
              <p>Snapchat</p>
            </Link>
            <Link
              to="/tiktokFilter"
              className={`py-3 pl-12 ${
                isSubmenuActive === "tiktok"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("filter", "tiktok", true)}
            >
              <p>tiktok</p>
            </Link>
            <Link
              to="/ecardFilter"
              className={`py-3 pl-12 ${
                isSubmenuActive === "card"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("filter", "card", true)}
            >
              <p>e-card</p>
            </Link>
          </div>
        </div>

        {/* artists  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "artists" ? "text-primaryMain" : "text-blackMid"
            }`}
            onClick={() => handleMenus("artists", "")}
          >
            <span className="material-symbols-outlined">
              imagesearch_roller
            </span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>artists</span>
            </p>
            <span
              class={`material-symbols-outlined duration-100 ${
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
                isSubmenuOpen["artists"] && isActive === "artists"
                  ? `${submenuRef.current["artists"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/artistsPending"
              className={`py-3 pl-12 ${
                isSubmenuActive === "pending"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("artists", "pending", true)}
            >
              <p>pending</p>
            </Link>
            <Link
              to="/artistsApproved"
              className={`py-3 pl-12 ${
                isSubmenuActive === "approved"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("artists", "approved", true)}
            >
              <p>approved</p>
            </Link>
          </div>
        </div>

        {/* category  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "category" ? "text-primaryMain" : "text-blackMid"
            }`}
            onClick={() => handleMenus("category", "")}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>categories</span>
            </p>
            <span
              class={`material-symbols-outlined duration-100 ${
                isSubmenuOpen["category"] ? "rotate-180" : "rotate-0"
              } ${isClosed && "hidden"}`}
            >
              expand_more
            </span>
          </div>
          {/* submenu  */}

          <div
            ref={(ref) => (submenuRef.current["category"] = ref)}
            className={`flex flex-col gap-1 duration-200`}
            style={{
              maxHeight:
                isSubmenuOpen["category"] && isActive === "category"
                  ? `${submenuRef.current["category"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/categories"
              className={`py-3 pl-12 ${
                isSubmenuActive === "categories"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("category", "categories", true)}
            >
              <p>categories</p>
            </Link>
            <Link
              to="/collections"
              className={`py-3 pl-12 ${
                isSubmenuActive === "collections"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("category", "collections", true)}
            >
              <p>collections</p>
            </Link>
            <Link
              to="/featured"
              className={`py-3 pl-12 ${
                isSubmenuActive === "featured"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("category", "featured", true)}
            >
              <p>featured</p>
            </Link>
          </div>
        </div>

        {/* withdraw  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "withdraw" ? "text-primaryMain" : "text-blackMid"
            }`}
            onClick={() => handleMenus("withdraw", "")}
          >
            <span className="material-symbols-outlined">paid</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>withdraw</span>
            </p>
            <span
              class={`material-symbols-outlined duration-100 ${
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
                isSubmenuOpen["withdraw"] && isActive === "withdraw"
                  ? `${submenuRef.current["withdraw"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/withdrawPending"
              className={`py-3 pl-12 ${
                isSubmenuActive === "pending"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("withdraw", "pending", true)}
            >
              <p>pending</p>
            </Link>
            <Link
              to="/withdrawConfirmed"
              className={`py-3 pl-12 ${
                isSubmenuActive === "completed"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("withdraw", "completed", true)}
            >
              <p>completed</p>
            </Link>
            <Link
              to="/withdrawCancelled"
              className={`py-3 pl-12 ${
                isSubmenuActive === "cancelled"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("withdraw", "cancelled", true)}
            >
              <p>cancelled</p>
            </Link>
          </div>
        </div>

        {/* app settings  */}

        <div className="w-full overflow-hidden capitalize">
          <div
            className={`flex items-center pl-6 pr-3 py-4 cursor-pointer select-none ${
              isActive === "appSetting" ? "text-primaryMain" : "text-blackMid"
            }`}
            onClick={() => handleMenus("appSetting", "")}
          >
            <span className="material-symbols-outlined">app_settings_alt</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>app settings</span>
            </p>
            <span
              class={`material-symbols-outlined duration-100 ${
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
                isSubmenuOpen["appSetting"] && isActive === "appSetting"
                  ? `${submenuRef.current["appSetting"]?.scrollHeight}px`
                  : "0",
            }}
          >
            {/* Submenu items */}
            <Link
              to="/"
              className={`py-3 pl-12 ${
                isSubmenuActive === "notifications"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("appSetting", "notifications", true)}
            >
              <p>notifications</p>
            </Link>
            <Link
              to="/otherSetting"
              className={`py-3 pl-12 ${
                isSubmenuActive === "others"
                  ? "bg-blueLight border-r-2 border-primaryMain text-primaryMain"
                  : "text-blackMid"
              }`}
              onClick={() => handleMenus("appSetting", "others", true)}
            >
              <p>others</p>
            </Link>
          </div>
        </div>
      </section>
      <div className="flex items-start justify-between gap-4 overflow-auto pl-6">
        <button onClick={toggleSideNav} className="btn-btn-ghost">
          <span className="material-symbols-outlined">menu_open</span>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
