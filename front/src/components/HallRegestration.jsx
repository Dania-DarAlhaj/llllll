// src/pages/HallRegistration.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function HallRegestration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hallType, setHallType] = useState("");
  const [parking, setParking] = useState(false);
  const [menCapacity, setMenCapacity] = useState("");
  const [womenCapacity, setWomenCapacity] = useState("");
  const [hallInfo, setHallInfo] = useState(null);

  const name = sessionStorage.getItem("businessName");
  const phone = sessionStorage.getItem("phone");
  const city = sessionStorage.getItem("city");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !hallType || !menCapacity || !womenCapacity) {
      alert("Please complete all fields.");
      return;
    }

    try {
      //add user
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([{
          email,
          password,
          role: "owner",
           name,
           phone,
           city,
          verified: true,
         
          
          
        }])
        .select();

      if (userError) throw userError;
      const userId = userData[0].id;
      console.log("User Inserted:", userData);

      // add owner
      const { data: ownerData, error: ownerError } = await supabase
        .from("owners")
        .insert([{ user_id: userId, owner_type: "hall", visible: false }])
        .select("owner_id");

      if (ownerError) throw ownerError;
      const ownerId = ownerData[0].owner_id;
      console.log("Owner Inserted:", ownerData);

      // add hall
      const { data: hallData, error: hallError } = await supabase
        .from("hall") 
        .insert([{
          owner_id: ownerId,
          hall_type: hallType,
          parking: parking,
          men_capacity: parseInt(menCapacity),
          women_capacity: parseInt(womenCapacity),
          price: parseFloat(document.getElementById("hallPrice").value),
          hall_image: document.getElementById("hallImage").files[0] ? document.getElementById("hallImage").files[0].name : null
        }])
        .select();

      if (hallError) throw hallError;
      console.log("Hall Inserted:", hallData);

      setHallInfo(hallData[0]);
      alert("Hall registered successfully!");

    } catch (err) {
      console.error("Registration error:", err);
        if (err?.status) console.error("Status:", err.status);
  if (err?.message) console.error("Message:", err.message);
  if (err?.details) console.error("Details:", err.details);
      alert("Error registering hall. Check console for details.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Lato, sans-serif",
        background: "#FAF8F5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Hall Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: "bold" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.7rem", margin: "0.4rem 0 1rem 0", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <label style={{ fontWeight: "bold" }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.7rem", margin: "0.4rem 0 1rem 0", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <label style={{ fontWeight: "bold" }}>Hall Type:</label>
          <select
            value={hallType}
            onChange={(e) => setHallType(e.target.value)}
            required
            style={{ width: "100%", padding: "0.7rem", margin: "0.4rem 0 1rem 0", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">-- Select Type --</option>
            <option value="Indoor Hall">Indoor Hall</option>
            <option value="Outdoor Hall">Outdoor Hall</option>
            <option value="Garden">Garden</option>
            <option value="Hotel">Hotel</option>
          </select>

          <label style={{ fontWeight: "bold" }}>
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              style={{ marginRight: "0.5rem" }}
            />
            Private Parking Available
          </label>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Men Capacity:</label>
            <input
              type="number"
              min="0"
              value={menCapacity}
              onChange={(e) => setMenCapacity(e.target.value)}
              required
              style={{ width: "100%", padding: "0.7rem", marginTop: "0.4rem", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Women Capacity:</label>
            <input
              type="number"
              min="0"
              value={womenCapacity}
              onChange={(e) => setWomenCapacity(e.target.value)}
              required
              style={{ width: "100%", padding: "0.7rem", marginTop: "0.4rem", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

  <div style={{ marginTop: "1rem" }}>
    <label style={{ fontWeight: "bold" }}>Price:</label>
    <input
      type="number"
       id="hallPrice"
      min="0"
      placeholder="Enter hall price"
      style={{ width: "100%", padding: "0.7rem", marginTop: "0.4rem", borderRadius: "5px", border: "1px solid #ccc" }}
    />
  </div>

  <div style={{ marginTop: "1rem" }}>
    <label style={{ fontWeight: "bold" }}>Upload Hall Image:</label>
    <input
      type="file"
      id="hallImage"
      accept="image/*"
      style={{ width: "100%", marginTop: "0.4rem" }}
    />
  </div>
          <button
            type="submit"
            style={{
              marginTop: "1.5rem",
              width: "100%",
              padding: "0.9rem",
              background: "#C9A27C",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Register Hall
          </button>
        </form>

        {hallInfo && (
          <div style={{ marginTop: "2rem", padding: "1rem", background: "#f2f2f2", borderRadius: "5px" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Hall Information</h3>
            <p><strong>Hall ID:</strong> {hallInfo.hall_id}</p>
            <p><strong>Type:</strong> {hallInfo.hall_type}</p>
            <p><strong>Parking:</strong> {hallInfo.parking ? "Available" : "Not Available"}</p>
            <p><strong>Men Capacity:</strong> {hallInfo.men_capacity}</p>
            <p><strong>Women Capacity:</strong> {hallInfo.women_capacity}</p>
            <p><strong>Owner ID:</strong> {hallInfo.owner_id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
