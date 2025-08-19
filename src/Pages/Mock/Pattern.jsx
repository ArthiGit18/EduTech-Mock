import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Pattern() {
    const navigate = useNavigate();
    const { category } = useParams();

    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        examId: "",
        password: "",
        course: category || ""
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
        <div className="pattern-container">
            {loading && (
                <div className="backdrop">
                    <div className="spinner"></div>
                    <p>Starting your test...</p>
                </div>
            )}

            <h1>Test Instructions</h1>
            <p>Please read the instructions carefully before starting the test:</p>
            <ol>
                <li><strong>Test Duration:</strong> You have 5 minutes to complete the test.</li>
                <li><strong>No Page Navigation:</strong> Avoid refreshing or going to other pages; it will end the test.</li>
                <li><strong>Question Navigation:</strong> Use Next and Previous buttons only.</li>
                <li><strong>Auto Submission:</strong> The test will auto-submit when time is over.</li>
                <li><strong>No Negative Marking:</strong> Marks will be given only for correct answers.</li>
                <li><strong>Stay on the Page:</strong> Do not close or switch tabs during the test.</li>
                <li><strong>Single Attempt:</strong> You can attempt the test only once per category.</li>
            </ol>

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
                        <option value="NEXT JS">NEXT JS</option>
                    </select><br />
                    <button className="submit-btn" onClick={handleRegistration}>Submit & Start</button>
                </div>
            )}
        </div>
    );
}
