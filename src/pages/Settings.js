import "./Settings.css"
import axios from "axios";
import NavigationBar from "../NavigationBar";
import { UserState } from "../context/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
    let image = null;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (UserState.username === '' || UserState.password === '') {
                navigate("/login");
                return;
            }

            let url = "http://localhost:8000/login";
            let body = {
                username: UserState.username,
                password: UserState.password
            };

            let response = await axios.post(url, body);
            setUser(response.data);

            if (response.data.profile_picture_url !== '') {
                image = await axios.get(response.data.profile_picture_url).data;
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <NavigationBar />
            <div className="settings-container">
                <div className="settings-title">
                    <h1>Settings</h1>
                </div>

                {user ? (
                    <div className="profile">
                        <div className="basic-profile">
                            {image ? (
                                <img className="basic-profile-image" src={image} alt="pfp"></img>
                            ) : (
                                <img className="basic-profile-image-null" src={null} alt=""></img>
                            )}

                            <label className="change-profile-picture-label">Change Profile Picture</label>
                            <input id="select-image-file" type="file" className="basic-profile-image-change" accept="image/*" value="" ></input>
                            <label for="select-image-file" className="select-image-file-label">Select Image</label>
                        </div>

                        <p>Username : {user.username}</p>
                        <p>ELO      : {user.elo_points}</p>
                        <p>Country  : {user.country_id}</p>
                        <br></br>

                        {JSON.stringify(user)}
                    </div>
                ) : (
                    <div class="loader-container">
                        <div class="loader"></div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Settings;