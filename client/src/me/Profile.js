import React, { useContext } from "react";
import { UserContext } from "../context/user";
import "./Profile.css"; 

const Profile = () => {
    const { currentUser } = useContext(UserContext);

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
                <h3>{ currentUser.username}</h3>
                <p>{currentUser.email}</p>
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
