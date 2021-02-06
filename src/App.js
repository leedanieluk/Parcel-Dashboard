import "./App.css";
import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
import RoomGrid from "./components/RoomGrid";

function App() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rooms, setRooms] = useState([]);

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    axios({
      withCredentials: true,
      method: "post",
      url: "http://localhost:8080/login",
      data: qs.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((response) => {
      console.log("logged in");
    });
  }

  useEffect(() => {
    axios({
      withCredentials: true,
      method: "get",
      url: "http://localhost:8080/room",
    }).then((response) => {
      let tmpRooms = [];
      response.data.forEach((room) => {
        tmpRooms = [
          ...tmpRooms,
          {
            id: room.email + room.number,
            number: room.number,
            parcels: room.parcels.map((parcel) => {
              return parcel.localDateTime;
            }),
            fullName: room.fullName,
            tenantEmail: room.tenantEmail,
            lastNotified: room.lastNotified,
          },
        ];
      });
      setRooms(tmpRooms);
    });
  }, []);

  return (
    <div className="App">
      <div className="login-form">
        <form onSubmit={submitHandler}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="room-grid">
        <RoomGrid rooms={rooms} />
      </div>
    </div>
  );
}

export default App;
