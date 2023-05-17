import React, { useContext, useEffect, useState } from "react";
import OrdersLoading from "../../Components/Shared/LoadingScreens/OrdersLoading";
import { OrderContext } from "../../Contexts/OrdersContext/OrdersProvider";
import ArtistsConfirmationBlockPopup from "../../Components/Modals/Artists/ArtistsConfirmationBlockPopup";
import ArtistsPendingTable from "../../Components/Tables/Artists/ArtistsPendingTable";
import { Link } from "react-router-dom";
import db from "../../Assets/json/db.json"

const ArtistsPending = () => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const {artists:dbArtists} = db || {};
  const [artists ,setArtists] = useState(dbArtists);

  const {
    isLoading,
    fetchOrders,
    searchBarValue,
    filteredOrdersBySearch,
    filterOrdersBySearch,
    filterOrdersByUserType,
    filterOrdersByLocationType,
    currentOrder,
    setCurrentOrder,
    updateManyOrderStatus,
    clickHandlerForModals,
    setSearchBarValue
  } = useContext(OrderContext);

  const handleSelectCheckbox = (artist, e) => {
    const selectedArtistsList = [...selectedArtists];
    if (e.target.checked) {
      selectedArtistsList.push(artist?.user_id);
    } else {
      const index = selectedArtistsList.indexOf(artist?.user_id);
      if (index !== -1) {
        selectedArtistsList.splice(index, 1);
      }
    }
    setSelectedArtists(selectedArtistsList);
  };

  const handleSelectAllCheckbox = (artists, e) => {
    const selectAllOrder = [];
    if (e?.target?.checked) {
      artists?.map((artists) => {
        return selectAllOrder?.push(artists?.user_id);
      });
    } else {
      setSelectedArtists([]);
    }
    setSelectedArtists(selectAllOrder);
  };

  //filter user by search value
  const filterArtistsBySearch = (e) => {
    const searchValue = e.target.value;
    const filterUsers = dbArtists?.filter((user)=> searchBarValue !== null ?  user?.user_name?.toLowerCase().includes(searchValue?.toLowerCase()) : true )
    setArtists(filterUsers)
    setSearchBarValue(searchValue)
  };

  const handleApproveAll = (order, status) => {
    updateManyOrderStatus(order, status);
    setSelectedArtists([]);
  };

  const handleUserTypeToggle = (userType) => {
    filterOrdersByUserType(userType);
  };
  const handleLocationTypeToggle = (locationType) => {
    filterOrdersByLocationType(locationType);
  };

  useEffect(() => {
    const filteredOrdersByStatus = filteredOrdersBySearch?.filter(
      (order) => order?.order_status?.toLowerCase() === "pending"
    );
    setPendingOrders(filteredOrdersByStatus);
  }, [filteredOrdersBySearch]);


  return (
    <div className="overflow-auto w-full pt-10 pb-32 pr-10">
      <div className="flex items-center justify-between p-3 bg-primaryMain text-whiteHigh rounded-t-lg">
        <section className="flex items-center gap-4">
          <div>
            <p className="font-bold text-2xl">Artists</p>
          </div>
        </section>
        <section className="flex items-center gap-4 w-2/5">
          <input
            defaultValue={searchBarValue}
            onChange={filterArtistsBySearch}
            className="p-3 w-full text-blackMid rounded-md border-none focus:outline-none focus:bg-whiteLow"
            type="text"
            name="searchInput"
            placeholder="search"
          />
          {/* <p>
          <Link
              to="/filtersAddNew"
              className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            >
              <span className="material-symbols-outlined text-primaryMain">
                add
              </span>
            </Link>
          </p> */}
        </section>
      </div>

      <div
        className={` ${
          selectedArtists.length < 1
            ? "hidden"
            : "flex items-center justify-start gap-4"
        } p-4 bg-whiteHigh`}
      >
        <label
          onClick={() => handleApproveAll(selectedArtists, "Returned")}
          className="btn btn-sm border-none bg-primaryMain"
        >
          Decline Selected
        </label>
        <button
          className="btn btn-sm border-none text-blackMid hover:text-whiteHigh bg-whiteLow"
          onClick={() => handleApproveAll(selectedArtists, "Processing")}
        >
          Approve Selected
        </button>
      </div>
      {isLoading ? (
        <OrdersLoading></OrdersLoading>
      ) : (
        <ArtistsPendingTable
          rows={artists}
          setCurrentOrder={setCurrentOrder}
          handleSelectAllCheckbox={handleSelectAllCheckbox}
          handleSelectCheckbox={handleSelectCheckbox}
          selectedArtists={selectedArtists}
        ></ArtistsPendingTable>
      )}
      {/* block modal popup */}
      <ArtistsConfirmationBlockPopup
        currentOrder={currentOrder}
        clickHandlerForModals={clickHandlerForModals}
      ></ArtistsConfirmationBlockPopup>
    </div>
  );
};

export default ArtistsPending;
