// src/pages/HallRegistration.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function HallRegistration() {
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
  const description = sessionStorage.getItem("description");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !hallType || !menCapacity || !womenCapacity || !description) {
      alert("Please complete all fields.");
      return;
    }

    // رفع الصورة على السيرفر المحلي
    const fileInput = document.getElementById("hallImage");
    const file = fileInput.files[0];
    let imageName = "";

    if (file) {
      const formData = new FormData();
      formData.append("hallImage", file);

      try {
        const res = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        imageName = data.fileName; // اسم الملف الذي سيتم تخزينه في قاعدة البيانات
        console.log("Image uploaded successfully:", imageName);
      } catch (err) {
        console.error("Image upload error:", err);
        alert("Error uploading image. Check console.");
        return;
      }
    }

    try {
      // إضافة المستخدم
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

      // إضافة المالك
      const { data: ownerData, error: ownerError } = await supabase
        .from("owners")
        .insert([{
          user_id: userId,
          owner_type: "hall",
          visible: false,
          describtion: description,
          rate: 0,
          accept: false
        }])
        .select("owner_id");

      if (ownerError) throw ownerError;
      const ownerId = ownerData[0].owner_id;
      console.log("Owner Inserted:", ownerData);

      // إضافة القاعة
      const hallPrice = parseFloat(document.getElementById("hallPrice").value);
      const { data: hallData, error: hallError } = await supabase
        .from("hall")
        .insert([{
          owner_id: ownerId,
          hall_type: hallType,
          parking: parking,
          men_capacity: parseInt(menCapacity),
          women_capacity: parseInt(womenCapacity),
          price: hallPrice,
          imageurl: imageName // الاسم فقط وليس الرابط الكامل
        }])
        .select();

      if (hallError) throw hallError;
      console.log("Hall Inserted:", hallData);

      setHallInfo(hallData[0]);
      alert("Hall registered successfully!");

    } catch (err) {
      console.error("Registration error:", err);
      alert("Error registering hall. Check console for details.");
    }
  };

  return (
    <div style={{
      fontFamily: "Lato, sans-serif",
      background: "#FAF8F5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "2rem"
    }}>
      <div style={{
        maxWidth: "450px",
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Hall Registration</h2>

        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <label>Hall Type:</label>
          <select value={hallType} onChange={e => setHallType(e.target.value)} required>
            <option value="">-- Select Type --</option>
            <option value="Indoor Hall">Indoor Hall</option>
            <option value="Outdoor Hall">Outdoor Hall</option>
            <option value="Garden">Garden</option>
            <option value="Hotel">Hotel</option>
          </select>

          <label>
            <input type="checkbox" checked={parking} onChange={e => setParking(e.target.checked)} />
            Private Parking Available
          </label>

          <label>Men Capacity:</label>
          <input type="number" min="0" value={menCapacity} onChange={e => setMenCapacity(e.target.value)} required />

          <label>Women Capacity:</label>
          <input type="number" min="0" value={womenCapacity} onChange={e => setWomenCapacity(e.target.value)} required />

          <label>Price:</label>
          <input type="number" min="0" id="hallPrice" placeholder="Enter hall price" />

          <label>Upload Hall Image:</label>
          <input type="file" id="hallImage" accept="image/*" />

          <button type="submit">Register Hall</button>
        </form>

        {hallInfo && (
          <div style={{ marginTop: "2rem", padding: "1rem", background: "#f2f2f2", borderRadius: "5px" }}>
            <h3>Hall Information</h3>
            <p><strong>Hall ID:</strong> {hallInfo.hall_id}</p>
            <p><strong>Type:</strong> {hallInfo.hall_type}</p>
            <p><strong>Parking:</strong> {hallInfo.parking ? "Available" : "Not Available"}</p>
            <p><strong>Men Capacity:</strong> {hallInfo.men_capacity}</p>
            <p><strong>Women Capacity:</strong> {hallInfo.women_capacity}</p>
            <p><strong>Owner ID:</strong> {hallInfo.owner_id}</p>
            <img src={`/Img/${hallInfo.imageurl}`} alt="Hall" style={{ width: "100%", marginTop: "1rem" }} />
          </div>
        )}
      </div>
    </div>
  );
}
