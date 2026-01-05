import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/VenueDetails.css';

export default function VenueDetails() {
  const { userId } = useParams();

  const [hall, setHall] = useState(null);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // رقم الهاتف
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHall = async () => {
      const { data, error } = await supabase
        .from("hall")
        .select(`
          *,
          owners:owner_id (
            description,
            users:user_id (city)
          )
        `)
        .eq("owner_id", userId)
        .single();

      if (error) {
        console.error(error);
      } else {
        setHall(data);
      }
    };
const currentEmail = sessionStorage.getItem("currentEmail");
  if (currentEmail) {
    setEmail(currentEmail);

    // لو عندك جدول users في supabase فيه الاسم و رقم الهاتف
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("name, phone")
        .eq("email", currentEmail)
        .single();

      if (!error && data) {
        setName(data.name);
        setPhone(data.phone);
      }
    };

    fetchUserData();
  }
    fetchHall();
  }, [userId]);

  if (!hall) return <p>Loading...</p>;

  const handleBooking = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          hall_id: hall.id,
          user_name: name,
          user_email: email,
          user_phone: phone, 
          date: date.toISOString(),
          guests: guests
        }
      ]);

    if (error) {
      setMessage(" Error: " + error.message);
    } else {
      setMessage(" Booking successful!");
      setName("");
      setEmail("");
      setPhone("");
      setGuests(0);
    }
  };

  return (
    <div className="venue-container">
      <div className="venue-image">
        <img src={hall.image_url || "/default-hall.jpg"} alt={hall.hall_type} />
      </div>

      <div className="venue-details">
        <h2>{hall.hall_type}</h2>
        <p>{hall.owners?.description || "No description available"}</p>
        <p>📍 {hall.owners?.users?.city || "City not available"}</p>
        <p>💰 {hall.price} ₪</p>
        <p>women capacity: {hall.women_capacity}</p>
        <p>men capacity: {hall.men_capacity}</p>
        <p>total capacity: {hall.total_capacity}</p>
        <p>hall type: {hall.hall_type}</p>
        <p>parking: {hall.parking ? "Available" : "Not Available"}</p>
      </div>

      <div className="venue-calendar">
        <h3>📅 Availability</h3>
        <Calendar
          onChange={setDate}
          value={date}
          minDate={new Date()}
          maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
        />
        <p>Selected date: {date.toDateString()}</p>
      </div>

      <div className="venue-booking-form">
        <h3>📝 Book this hall</h3>
        <form onSubmit={handleBooking}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
           
          </div>
          <button type="submit">Book Now</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
