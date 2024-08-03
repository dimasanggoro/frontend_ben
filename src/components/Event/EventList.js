import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./EventForm";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/event", {
          headers: { 'jsonwebtoken': `${localStorage.getItem("token")}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/event/${id}`, {
        headers: { 'jsonwebtoken': `${localStorage.getItem("token")}` },
      });
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Daftar Acaraku</h2>
      <button className="btn btn-primary mb-3" onClick={() => setEditingEvent({})}>
        Tambah Acara
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nama</th>
            <th>Tanggal</th>
            <th>Lokasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.id}</td>
            <td>{event.name}</td>
            <td>{event.date}</td>
            <td>{event.location}</td>
            <td>
              <button className="btn btn-secondary mr-2" onClick={() => setEditingEvent(event)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      {editingEvent && <EventForm event={editingEvent} setEvents={setEvents} setEditingEvent={setEditingEvent} />}
    </div>
  );
};

export default EventList;
