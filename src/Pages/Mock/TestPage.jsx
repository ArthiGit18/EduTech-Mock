import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TestPage() {
    const { course } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(300); // 5 min

    // ✅ Fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/questions/${course.toLowerCase()}`);
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [course]);

    // ✅ Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const handleOptionChange = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleNext = () => current < questions.length - 1 && setCurrent(current + 1);
    const handlePrev = () => current > 0 && setCurrent(current - 1);

    const handleSubmit = async () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.answer) score++;
        });

        try {
            await axios.post("http://localhost:5000/api/user-test/submit", {
                examId: localStorage.getItem("examId"),
                score,
                totalQuestions: questions.length,
            });
            alert(`✅ Test submitted! Your score is ${score}/${questions.length}`);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Error submitting test");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!questions.length) return <p>No questions found for {course}</p>;

    const q = questions[current];

    return (
        <div className="test-layout">
            {/* Sidebar - Questions Panel */}
            <div className="sidebar">
                <h3>No of Questions Answered</h3>
                <div className="question-map">
                    {questions.map((_, idx) => (
                        <div
                            key={idx}
                            className={`q-circle ${
                                answers[idx]
                                    ? "answered"
                                    : "unanswered"
                            } ${current === idx ? "active" : ""}`}
                            onClick={() => setCurrent(idx)}
                        >
                            {idx + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Test Area */}
            <div className="test-container">
                <div className="header">
                    <h1>{course} Test</h1>
                    <div className={`timer ${timeLeft <= 60 ? "warning" : ""}`}>
                        ⏱ {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="question-box">
                    <h2>Q{current + 1}. {q.question}</h2>
                    <ul>
                        {q.options.map((opt, idx) => (
                            <li key={idx}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`q-${current}`}
                                        value={opt}
                                        checked={answers[current] === opt}
                                        onChange={() => handleOptionChange(current, opt)}
                                    />
                                    {opt}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="controls">
                    <button onClick={handlePrev} disabled={current === 0}>Previous</button>
                    {current < questions.length - 1 ? (
                        <button onClick={handleNext}>Next</button>
                    ) : (
                        <button className="submit-btn" onClick={handleSubmit}>Submit Test</button>
                    )}
                </div>
            </div>
        </div>
    );
}
