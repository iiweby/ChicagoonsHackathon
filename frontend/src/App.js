import React, { useState } from "react";

function App() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestRide = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Make API call to request a ride
      const response = await fetch("/api/request-ride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pickupLocation, dropoffLocation }),
      });

      if (!response.ok) {
        throw new Error("Failed to request ride");
      }

      const data = await response.json();
      setRideDetails(data);
    } catch (error) {
      setError("Failed to request ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Get Matched!</h1>
      <form onSubmit={requestRide}>
        <label>
          Pickup Location:
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Dropoff Location:
          <input
            type="text"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Requesting Ride..." : "Request Ride"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {rideDetails && (
        <div>
          <h2>Ride Details</h2>
          <p>Driver: {rideDetails.driver}</p>
          <p>ETA: {rideDetails.eta}</p>
          {/* Display more ride details here */}
        </div>
      )}
    </div>
  );
}

export default App;
