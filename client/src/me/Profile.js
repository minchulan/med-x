import React from "react";
import "./Profile.css"; 

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="user-info">
        <div className="avatar">
          <img
            src="https://placekitten.com/150/150" // Example image
            alt="User Avatar"
          />
        </div>
        <div className="details">
          <h3>Minchul An</h3>
          <p>Email: minchulan@example.com</p>
        </div>
      </div>
      <div className="bio">
        <h3>Bio</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          purus justo. Vestibulum ultricies, libero non ullamcorper malesuada,
          erat ex pellentesque elit.
        </p>
      </div>
    </div>
  );
};

export default Profile;
