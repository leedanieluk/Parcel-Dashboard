import React from "react";
import Room from "./Room";
import "./RoomGrid.scss";

export default function RoomGrid(props) {
  return (
    <div className="RoomGrid">
      <div className="room-grid-header">
        <div className="number">No.</div>
        <div className="parcels">Parcels</div>
        <div className="full-name">Full Name</div>
        <div className="email">Email</div>
        <div className="last-notified">Last Notified</div>
      </div>
      {props.rooms.map((room) => {
        return (
          <Room
            key={room.id}
            number={room.number}
            parcels={room.parcels}
            fullName={room.fullName}
            tenantEmail={room.tenantEmail}
            lastNotified={room.lastNotified}
          />
        );
      })}
    </div>
  );
}
