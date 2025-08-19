import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        examId: "",
        password: "",
    });

    const [testStatus, setTestStatus] = useState(null); // <-- store test details
    const [isSaving, setIsSaving] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [hasPrompted, setHasPrompted] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // ✅ Fetch user profile
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/auth/users/${id}`)
            .then((res) => {
                setProfileData(res.data);

                // Once we have the email, fetch test status
                if (res.data.email) {
                    axios
                        .get(`http://localhost:5000/api/user-test/status/${res.data.email}`)
                        .then((res2) => setTestStatus(res2.data))
                        .catch((err) => console.error("Error fetching test status", err));
                }
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleEditClick = () => {
        if (!hasPrompted) {
            const enteredPassword = prompt("Enter your current password to edit:");
            setHasPrompted(true);

            if (!enteredPassword) return;

            axios
                .post("http://localhost:5000/api/auth/verify-password", {
                    userId: id,
                    password: enteredPassword,
                })
                .then((res) => {
                    if (res.data.success) {
                        setIsEditable(true);
                        setConfirmPassword(enteredPassword);
                    } else {
                        alert("Incorrect password. Editing is not allowed.");
                        setIsEditable(false);
                    }
                })
                .catch(() => {
                    alert("Error verifying password");
                    setIsEditable(false);
                });
        }
    };

    const handleChange = (e) => {
        if (!isEditable) return;
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        if (!isEditable) return;
        setIsSaving(true);

        axios
            .put(`http://localhost:5000/api/auth/users/${id}`, {
                username: profileData.username,
                email: profileData.email,
                confirmPassword,
            })
            .then(() => {
                alert("Profile updated successfully!");
                setIsSaving(false);
                setIsEditable(false);
            })
            .catch((err) => {
                alert(err.response?.data?.msg || "Error updating profile");
                setIsSaving(false);
            });
    };

    return (
        <div className="profile_wrapper">
            <div className="profile-container">
                <h2>My Profile</h2>

                {/* Username */}
                <div className={`profile-field ${isEditable ? "editable" : ""}`} onClick={handleEditClick}>
                    <strong>Username:</strong>
                    {isEditable ? (
                        <input
                            type="text"
                            name="username"
                            value={profileData.username}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{profileData.username}</span>
                    )}
                </div>

                {/* Email */}
                <div className={`profile-field ${isEditable ? "editable" : ""}`} onClick={handleEditClick}>
                    <strong>Email:</strong>
                    {isEditable ? (
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{profileData.email}</span>
                    )}
                </div>

                {/* Exam ID */}
                <div className="profile-field non-editable">
                    <strong>Exam ID:</strong>
                    <span>{profileData.examId}</span>
                </div>

                {/* Password */}
                <div className="profile-field non-editable">
                    <strong>Password:</strong>
                    <span>********</span>
                </div>

                {/* ✅ Test Status */}
                {testStatus && (
                    <div className="test-status">
                        <h2>Exam Status</h2>
                        {testStatus.completed ? (
                            <>
                                <div
                                    className="profile-field"
                                    style={{
                                        backgroundColor: testStatus.status === "Pending" ? "red" : "green",
                                        color: "white",
                                        padding: "8px",
                                        borderRadius: "6px",
                                        cursor: testStatus.status === "Pending" ? "pointer" : "default",
                                    }}
                                    onClick={() => {
                                        if (testStatus.status === "Pending") {
                                            navigate("/instruction-over-test");
                                        }
                                    }}
                                >
                                    <strong>Status:</strong> {testStatus.status}
                                </div>
                                <div className="profile-field"><strong>Score:</strong> {testStatus.score}</div>
                                <div className="profile-field"><strong>Percentage:</strong> {testStatus.percentage}%</div>
                                <div className="profile-field"><strong>Grade:</strong> {testStatus.grade}</div>
                            </>
                        ) : (
                            <p>{testStatus.message}</p>
                        )}
                    </div>
                )}

                <div className="profile-actions">
                    {isEditable && (
                        <button className="save-btn" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    )}
                    <NavLink to="/" className="home-btn">⬅ Back to Home</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
