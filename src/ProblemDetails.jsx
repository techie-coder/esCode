import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar'

const ProblemDetails = () => {
  const { pId } = useParams();
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submission, setSubmission] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/problem/${pId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch problem details');
        }
        const json = await response.json();
        setProblem(json.problem);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblem();
  }, [pId]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/submissions/${pId}`, {
          method: "GET",
          headers: {
            "authorization": localStorage.getItem('auth')
          }
        });
        if (!response.ok) {
          throw new Error("Error loading submissions");
        }
        const json = await response.json();
        setSubmissions(json.submissions);
      } catch (err) {
        console.error(err.message);
        setSubmissions([]);
      }
    };

    fetchSubmissions();
  }, [pId]);

  const submitProblem = async () => {
    try {
      const getAuth = localStorage.getItem('auth')
      if(!getAuth){
        navigate('/login');
        return;
      }
      setIsSubmitting(true);
      const response = await fetch(`http://localhost:3000/submission/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('auth')
        },
        body: JSON.stringify({
          problemId: pId,
          submission: submission
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();
      alert(result.status);
      // Refresh submissions after successful submission
      const updatedSubmissionsResponse = await fetch(`http://localhost:3000/submissions/${pId}`, {
        headers: { "authorization": localStorage.getItem('auth') }
      });
      const updatedSubmissionsData = await updatedSubmissionsResponse.json();
      setSubmissions(updatedSubmissionsData.submissions);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!problem) return <div>No problem found</div>;

  return (
    <>
    <NavBar />
    <grid className="min-w-screen items-start justify-start grid grid-cols-2">
      <section className="min-h-full min-w-1/2 rounded-xl m-5 p-5">
      <ShowProblemDetails
        title={problem.title}
        description={problem.description}
        testCases={problem.testCases}
        sampleOutput={problem.sampleOutput}
      />
      <div className="py-5">
        <h3>Submissions</h3>
        {submissions.length > 0 ? (
          submissions.map((sub, index) => (
            <ShowSubmissionDetails
              key={index}
              submission={sub.submission}
              status={sub.status}
            />
          ))
        ) : (
          <p>No submissions yet.</p>
        )}
      </div>
      </section>
      <section class="min-h-full min-w-1/2 rounded-xl m-5 p-5">
      <div className="h-70vh">
        <h1 className="manrope-400">Code</h1>
        <textarea 
          id="code" 
          placeholder="Write your code here"
          rows="10"
          className="min-w-full h-60vh bg-grey text-white p-5 mt-5 rounded-lg"
          value={submission}
          onChange={(e) => {
            var textareas = document.getElementsByTagName('textarea');
            var count = textareas.length;
            for(var i=0;i<count;i++){
                textareas[i].onkeydown = function(e){
                    if(e.keyCode==9 || e.which==9){
                        e.preventDefault();
                        var s = this.selectionStart;
                        this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                        this.selectionEnd = s+1; 
                    }}}
            setSubmission(e.target.value)}}
        />
      </div>
      <button 
          id='submit'  
          onClick={submitProblem}
          disabled={isSubmitting}
          className="p-3 bg-grey text-white rounded-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </section>
    </grid>
    </>
  );
};

const ShowProblemDetails = ({ title, description, testCases, sampleOutput }) => {
  return (
    <div className="flex flex-col">
      <h1 className="manrope-700 text-5xl">{title}</h1>
      <p className="p-3 manrope-400 text-lg"> {description}</p>
      <div className="manrope-400">
        <strong>Examples:</strong>
        <ul className="p-5">
          {Array.isArray(testCases) && testCases.map((testCase, index) => (
            <li key={index}>
              Input: {testCase.input}, Output: {testCase.output}
            </li>
          ))}
        </ul>
      </div>
      <p className='manrope-400 p-5'><strong>Sample Output:</strong> {sampleOutput}</p>
    </div>
  );
};

const ShowSubmissionDetails = ({ submission, status }) => {
  return (
    <div className="manrope-400 p-5">
      <p><strong>Submission:</strong> {submission}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};

export default ProblemDetails;