import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar'
import Editor from '@monaco-editor/react';
import PATH from './PATH'
import TestCase from './components/TestCase';


const ProblemDetails = () => {

  const { pId } = useParams();
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submission, setSubmission] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLang, setSelectedLang] = useState('python');
  const [defaultCode, setDefaultCode] = useState('')

  const [failedCases, setFailedCases] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
      switch(selectedLang){
        case 'cpp':
          setDefaultCode(`#include <iostream> \nusing namespace std; \n\nint func(int a, int b){\n\t//Write code here\n\treturn 0; \n}`)
          break;
        
        case 'c':
          setDefaultCode(`#include <stdio.h> \nint func(int a, int b){\n\t//Write code here\n\treturn 0; \n}`)
          break;
        
        case 'java':
          setDefaultCode(`class MyApp\n{\n\tpublic static void main(String[] args)\n{\n\t\t//Write code here\n\t\tSystem.out.println("Hello World");\n}\n}`)
          break;

        default:
          setDefaultCode(`print('Hello World')`)
        
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
      const response = await fetch(`${PATH}/submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": getAuth
        },
        body: JSON.stringify({
          submission,
          problemId: pId,
        })
      })

      console.log(submission);
      
      const responseJson = await response.json();
      setFailedCases(responseJson.failedCases);
      setHasSubmitted(true);

      alert(`failed cases : ${failedCases}`);

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
  
  const testCases = problem.testCases;

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
      <h3 className="text-xl manrope-700">Test Cases</h3>
      <div className="grid grid-rows-3">
        {Array.isArray(testCases) && testCases.map((element, index) => (<TestCase key={index} index={index} testCase={element.input} failedCases={failedCases} hasSubmitted={hasSubmitted}/>))}
      </div>
      </section>
      <section className="min-w-1/2 pr-5">
      <div className="">
        <h1 className="manrope-400 text-2xl">Code</h1>
        <section className='text-md'>
          <select value={selectedLang} onChange={handleLang} className='bg-platinum border-[1.5px] border-black rounded-md mt-3'>
          <option value="python">python</option>
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
