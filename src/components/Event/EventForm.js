import React, { useState, useEffect } from "react";
import axios from "axios";

const EventForm = ({ event, setEvents, setEditingEvent }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (event) {
      setName(event.name || "");
      setDate(event.date ? new Date(event.date).toISOString().split("T")[0] : "");
      setLocation(event.location || "");
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { name, date, location };
    setEvents((prev) => [...prev, newEvent]);
    try {
      let response;
      if (event.id) {
        response = await axios.put(
          `http://localhost:3000/event/${event.id}`,
          newEvent,
          {
            headers: { jsonwebtoken: `${localStorage.getItem("token")}` }
          }
        );
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? response.data : e))
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/event",
          newEvent,
          {
            headers: { jsonwebtoken: `${localStorage.getItem("token")}` }
          }
        );
        setEvents((prev) => prev.map((e) => (e === newEvent ? response.data : e)));
      }
      setEditingEvent(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      // Revert optimistic update if there's an error
      setEvents((prev) => prev.filter((e) => e !== newEvent));
    }
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{event.id ? "Edit Acara" : "Tambah Acara"}</h5>
            <button type="button" className="close" onClick={() => setEditingEvent(null)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Tanggal</label>
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Lokasi</label>
                <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">
                {event.id ? "Update" : "Simpan"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
