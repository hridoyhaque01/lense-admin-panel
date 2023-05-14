import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import avater from "../../../Assets/img/profile/avater.png"

const TopNav = () => {
  const { dbUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar bg-navyDark px-6 py-3">
      {/* top nav left */}
      <div className="flex-1">
        {/* logo */}
        <svg
          width="95"
          height="28"
          viewBox="0 0 95 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2341 2.25098V25.7496H7.29086V2.25098H12.2341ZM19.6407 2.25098V6.04368H0V2.25098H19.6407Z"
            fill="#FC5B2B"
          />
          <path
            d="M22.4678 2.25098H31.4449C33.2856 2.25098 34.8672 2.51996 36.1898 3.05794C37.5234 3.59591 38.5484 4.39211 39.2648 5.44654C39.9813 6.50096 40.3395 7.79748 40.3395 9.33608C40.3395 10.5949 40.119 11.6763 39.6782 12.5801C39.2483 13.4731 38.6366 14.2209 37.843 14.8234C37.0605 15.4152 36.1402 15.8886 35.0821 16.2437L33.5115 17.0506H25.7081L25.6751 13.274H31.478C32.3487 13.274 33.0706 13.1234 33.6438 12.8221C34.2169 12.5209 34.6468 12.1013 34.9333 11.5633C35.2309 11.0253 35.3797 10.4013 35.3797 9.69114C35.3797 8.93798 35.2364 8.28703 34.9498 7.7383C34.6633 7.18957 34.2279 6.76995 33.6438 6.47944C33.0596 6.18894 32.3267 6.04368 31.4449 6.04368H27.4275V25.7496H22.4678V2.25098ZM35.9253 25.7496L30.4365 15.2753L35.6773 15.243L41.2322 25.5237V25.7496H35.9253Z"
            fill="#FC5B2B"
          />
          <path
            d="M57.6526 0L63.8622 3.49876L70.0739 6.99929V14.0004V21.0011L63.8622 24.4998L57.6526 28L51.4427 24.4998L45.2324 21.0011V14.0004V6.99929L51.4427 3.49876L57.6526 0Z"
            fill="#F7F7F7"
          />
          <path
            d="M56.0219 24.4906V14.8923L50.3126 11.6747L49.4763 15.3048L48.9789 10.9232L47.5107 10.0947V19.693L52.2731 22.3785L52.791 17.4694L53.352 22.9861L56.0219 24.4906Z"
            fill="#FC5B2B"
          />
          <path
            d="M49.1367 7.33937L50.8521 8.30722L54.6924 6.33413L52.0047 8.95644L57.6526 12.1398L63.5456 8.81742L60.8597 6.19688L64.7014 8.1682L66.1682 7.33937L57.6526 2.54004L49.1367 7.33937Z"
            fill="#FC5B2B"
          />
          <path
            d="M59.2842 24.4906V14.8923L64.9931 11.6747L65.8291 15.3048L66.3269 10.9232L67.7965 10.0947V19.693L63.0323 22.3785L62.5162 17.4694L61.9552 22.9861L59.2842 24.4906Z"
            fill="#FC5B2B"
          />
          <path
            d="M79.9588 2.25049L84.4888 10.4492L89.0187 2.25049H94.6894L87.6961 13.903L94.8712 25.7491H89.1509L84.4888 17.389L79.8266 25.7491H74.0732L81.2649 13.903L74.2551 2.25049H79.9588Z"
            fill="#FC5B2B"
          />
        </svg>
      </div>

      {/* top nav right */}
      <div className="flex-none">
        {/* notification dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0005 21.75C13.1005 21.75 14.0005 20.85 14.0005 19.75H10.0005C10.0005 20.85 10.8905 21.75 12.0005 21.75ZM18.0005 15.75V10.75C18.0005 7.68 16.3605 5.11 13.5005 4.43V3.75C13.5005 2.92 12.8305 2.25 12.0005 2.25C11.1705 2.25 10.5005 2.92 10.5005 3.75V4.43C7.63054 5.11 6.00054 7.67 6.00054 10.75V15.75L4.71054 17.04C4.08054 17.67 4.52054 18.75 5.41054 18.75H18.5805C19.4705 18.75 19.9205 17.67 19.2905 17.04L18.0005 15.75Z"
                  fill="#919191"
                />
              </svg>
              <span className="badge badge-sm rounded-full bg-successColor border-none indicator-item">
                5
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">5 New</span>
              <span className="text-info">New order recieved!</span>
              <span className="text-info">New order recieved 2!</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-sm btn-block">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* report generation */}
        <div>
          {/* <button className="btn bg-primaryMain font-normal normal-case border-none text-white mx-3">
            Generate Report
          </button> */}
        </div>
        {/* user avater */}
        <div className="dropdown dropdown-end">
          <label tabIndex={3} className="btn btn-ghost btn-circle avatar">
            <div className="w-12 h-12 rounded-full">
              <img src={avater} alt="" />
            </div>
          </label>
          <ul
            tabIndex={3}
            className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-box w-28"
          >
            <li>
              <Link
                to="/profile"
                className="justify-between active:bg-primaryMain"
              >
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <button onClick={logout} className="active:bg-primaryMain">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
