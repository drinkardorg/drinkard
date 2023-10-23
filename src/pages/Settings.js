import "./Settings.css"
import axios from "axios";
import NavigationBar from "../NavigationBar";
import { UserState } from "../context/User";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
    let image = useRef(null);

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
            console.clear();
            console.log(response);
            if (response.data.err !== undefined) {
                navigate("/login");
                UserState.username = '';
                UserState.password = '';
                return;
            }

            setUser(response.data);

            if (response.data.profile_picture_url !== '') {
                image.current = await axios.get(response.data.profile_picture_url).data;
            }
        }

        fetchData();
    }, [navigate]);

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
                            {image.current ? (
                                <img className="basic-profile-image" src={image.current} alt="pfp"></img>
                            ) : (
                                <img className="basic-profile-image-null" src={null} alt=""></img>
                            )}

                            <label className="change-profile-picture-label">Change Profile Picture</label>
                            <input id="select-image-file" type="file" className="basic-profile-image-change" accept="image/*" value="" ></input>
                            <label for="select-image-file" className="select-image-file-label">Select Image</label>
                        </div>

                        <div className="settings-fields-container">
                            <div className="settings-fields">
                                <label className="settings-field">Username</label>
                                <input type="text" placeholder="Username" className="settings-field" value={UserState.username}></input>
                            </div>
                        </div>

                        {/* {JSON.stringify(user)} */}
                    </div>
                ) : (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Settings;