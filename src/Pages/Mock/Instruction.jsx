import React from 'react'

const Instruction = () => {
  return (
    <>

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
    </>
  )
}

export default Instruction