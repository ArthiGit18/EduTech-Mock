import React, { useState } from "react";
import Nav from '../Nav';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import Instruction from "./Instruction";

export default function Pattern() {
    const navigate = useNavigate();
    const { category, course } = useParams();

    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        examId: "",
        password: "",
        course: course || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async () => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/user-test/register", formData);

            alert(res.data.msg);
            setShowForm(false);

            // ✅ Navigate whether new or pending user
            localStorage.setItem("examId", formData.examId);
            setTimeout(() => {
                navigate(`/Mock-test/${formData.course}`);
            }, 800);
        } catch (err) {
            alert(err.response?.data?.msg || "Error registering");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Nav />
            <div className="pattern-wrapper">
                <div className="pattern-container">
                    {loading && (
                        <div className="backdrop">
                            <div className="spinner"></div>
                            <p>Starting your test...</p>
                        </div>
                    )}
                    <Instruction />

                    {!showForm ? (
                        <button className="start-btn" onClick={() => setShowForm(true)}>
                            Start Test
                        </button>
                    ) : (
                        <div className="form-section">
                            <h2>Fill Details to Start Test</h2>
                            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} /><br />
                            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br />
                            <input name="examId" placeholder="Exam ID" value={formData.examId} onChange={handleChange} /><br />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br />
                            <select name="course" value={formData.course} onChange={handleChange}>
                                <option value="">Select Course</option>
                                <option value="REACT">REACT</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="JAVASCRIPT">JAVASCRIPT</option>
                                <option value="NODE JS">NODE JS</option>
                            </select><br />
                            <button className="submit-btn" onClick={handleRegistration}>Submit & Start</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
