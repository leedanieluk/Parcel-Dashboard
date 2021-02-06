import React from "react";
import "./Room.scss";
import parcelImg from "./parcel.svg";
import plusImg from "./plus.svg";
import ReactTooltip from "react-tooltip";
import axios from "axios";

export default function Room(props) {
  function addParcelHandler(e) {
    e.preventDefault();
    axios({
      withCredentials: true,
      method: "post",
      url: "http://localhost:8080/room/add-parcel/" + e.target.dataset.room,
    }).then((response) => {
      window.location.reload();
    });
  }

  function clearRoomHandler(e) {
    e.preventDefault();
    axios({
      withCredentials: true,
      method: "post",
      url: "http://localhost:8080/room/clear/" + e.target.dataset.room,
    }).then((response) => {
      window.location.reload();
    });
  }

  function notifyHandler(e) {
    e.preventDefault();
    axios({
      withCredentials: true,
      method: "post",
      url: "http://localhost:8080/room/notify/" + e.target.dataset.room,
    }).then((response) => {
      window.location.reload();
    });
  }

  return (
    <div className="Room">
      <ReactTooltip place="top" type="info" effect="solid" />
      <div className="number">{props.number}</div>
      <div className="parcel">
        {props.parcels.map((parcel, i) => {
          if (i < 5) {
            return (
              <img
                key={i}
                data-tip={new Date(parcel).toLocaleString()}
                className="parcel-img"
                src={parcelImg}
                alt="parcel"
              />
            );
          } else if (i === 5) {
            return (
              <img
                key={i}
                data-tip={"More..."}
                className="parcel-img"
                src={plusImg}
                alt="plus"
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="full-name" data-tip={props.fullName}>
        {props.fullName}
      </div>
      <div className="email" data-tip={props.tenantEmail}>
        {props.tenantEmail}
      </div>
      <div className="last-notified">
        {props.lastNotified
          ? new Date(props.lastNotified).toLocaleString()
          : null}
      </div>
      <div className="buttons">
        <div
          data-room={props.number}
          className="add-parcel-button"
          onClick={addParcelHandler}
        >
          Add Parcel
        </div>
        <div
          data-room={props.number}
          className="notify-button"
          onClick={notifyHandler}
        >
          Notify
        </div>
        {/* test git */}
        <div
          data-room={props.number}
          className="clear-room-button"
          onClick={clearRoomHandler}
        >
          Clear
        </div>
      </div>
    </div>
  );
}
