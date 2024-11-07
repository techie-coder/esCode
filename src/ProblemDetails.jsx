import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar'
import Editor from '@monaco-editor/react';
import PATH from './PATH'

const ProblemDetails = () => {

  const { pId } = useParams();
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submission, setSubmission] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLang, setSelectedLang] = useState('cpp');
  const [defaultCode, setDefaultCode] = useState(`#include <iostream> \n using namespace std; \n\n int main(int a, int b){\n return 0; \n}`)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${PATH}/problem/${pId}`);
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
        const response = await fetch(`${PATH}/submissions/${pId}`, {
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

  useEffect(() => {
      switch(selectedLang){
        case 'cpp':
          setDefaultCode(`#include <iostream> \nusing namespace std; \n\nint func(int a, int b){\n\t//Write code here\n\treturn 0; \n}`)
          break;
        
        case 'c':
          setDefaultCode(`#include <stdio.h> \nint func(int a, int b){\n\t//Write code here\n\treturn 0; \n}`)
          break;
        
        case 'java':
          setDefaultCode(`class MyApp\n{\n\tpublic static void main(String[] args)\n{\n\t\t//Write code here\n\t\tSystem.out.println("Hello World");\n}\n}`)
        
      }
  }, [selectedLang])
  
  const submitProblem = async () => {
    try {
      const getAuth = localStorage.getItem('auth')
      if(!getAuth){
        navigate('/login');
        return;
      }
      setIsSubmitting(true);
      const response = await fetch('http://13.56.177.109:2358/submissions/?base64_encoded=false&wait=false', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_code: submission,
          language_id: 53
        })
      })
      console.log(submission);

      const responseJson = await response.json();
      
      const token = responseJson.token;

      

      if(token){
        const updatedSubmissionsResponse = await fetch(`${PATH}/submissions/${pId}`, {
          headers: { "authorization": localStorage.getItem('auth') }
        });
        const updatedSubmissionsData = await updatedSubmissionsResponse.json();
        setSubmissions(updatedSubmissionsData.submissions);
      }

    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!problem) return <div>No problem found</div>;

  const handleLang = (event) => {
    setSelectedLang(event.target.value);
  }

  

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
      <section className="min-w-1/2 pr-5">
      <div className="">
        <h1 className="manrope-400 text-2xl">Code</h1>
        <section className='text-md'>
          <select value={selectedLang} onChange={handleLang} className='bg-platinum border-[1.5px] border-black rounded-md mt-3'>
          <option value="cpp">cpp</option>
          <option value="c">c</option>
          <option value="java">java</option>
          </select>
        </section>
        <Editor
          id="editor" 
          height="65vh"
          language={selectedLang}
          options={
            {
              minimap: {
                enabled: false
              },
            fontSize: 13,
            cursorStyle: 'line',
            wordWrap: 'on'
          }}
          theme="vs-dark"
          className="min-w-full mt-1"
          value={defaultCode}
          onChange={
            (value) => setSubmission(value)
          }
        />
      </div>
      <button 
          id='submit'  
          onClick={submitProblem}
          disabled={isSubmitting}
          className="p-2 bg-grey text-white rounded-md mt-5"
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
