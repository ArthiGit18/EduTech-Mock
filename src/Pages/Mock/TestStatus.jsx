import React from 'react'

const TestStatus = ({testStatus, handleDeleteCourse}) => {
  return (
    <>
    {/* ✅ Test Status */}
                    {testStatus && testStatus.length > 0 && (
                        <div className="test-status">
                            <h2>Exam Status</h2>
                            {testStatus.map((test, index) => (
                                <div key={index} className="test-card" style={{ marginBottom: "15px" }}>
                                    <div className="course_heading">
                                        <h3>{test.courseNumber}</h3> {/* <-- course number from backend */}
                                        <button
                                            onClick={() => handleDeleteCourse(test.course)}
                                            style={{
                                                marginTop: "8px",
                                                padding: "6px 12px",
                                                backgroundColor: "#d9534f",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Delete {test.course} Test
                                        </button>
                                    </div>

                                    <div
                                        className="profile-field"
                                        style={{
                                            backgroundColor: test.status === "Pending" ? "red" : "green",
                                            color: "white",
                                            padding: "8px",
                                            borderRadius: "6px",
                                            cursor: test.status === "Pending" ? "pointer" : "default",
                                        }}
                                        onClick={() => {
                                            if (test.status === "Pending") {
                                                navigate("/instruction-over-test");
                                            }
                                        }}
                                    >
                                        <strong>Status:</strong> {test.status}
                                    </div>
                                    <div className="profile-field"><strong>Course:</strong> {test.course}</div>
                                    <div className="profile-field"><strong>Score:</strong> {test.score}</div>
                                    <div className="profile-field"><strong>Percentage:</strong> {test.percentage}%</div>
                                    <div className="profile-field"><strong>Grade:</strong> {test.grade}</div>

                                    {/* ✅ Delete button */}

                                </div>
                            ))}
                        </div>
                    )}
    </>
  )
}

export default TestStatus