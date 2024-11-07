import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import PATH from './PATH'

const ShowProblems = () => {
    const [problems, setProblems] = useState([]);
    const [displaySet, setDisplaySet] = useState('all');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch(`${PATH}/problems`);
                const json = await response.json();
                setProblems(json);
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            }
        };

        fetchProblems();
    }, []);

    const ProblemSet = ({ problemId, title, acceptance, difficulty }) => (
        <tr className={problemId % 2 ===0 ? "bg-platinum h-12" : "bg-white h-12"}>
            <td className="pr-3"><a className="hover:text-blue" href={`/problem/${problemId}`}>{title}</a></td>
            <td className="pr-3">{acceptance}</td>
            <td className={difficulty === "Easy" ? "text-green" : difficulty === "Medium" ? "text-yellow" : "text-red"}>
                {difficulty}
            </td>
        </tr>
    );

    const displayProblems = {
        'all': problems,
        'first': problems.slice(0, 5),
        'remaining': problems.slice(5)
    }[displaySet];

    return (
        <>
            <NavBar />
            <div className="min-h-2/3 min-w-screen m-10 justify-center">
                <div className="min-w-screen flex flex-col justify-center">
                    <h1 className="flex justify-center manrope-700 text-5xl">Problems</h1>
                    <div className="flex justify-center p-5 gap-5 manrope-400">
                        {['all', 'first', 'remaining'].map((set) => (
                            <button 
                                key={set}
                                className="p-2 bg-grey text-white rounded-lg hover:scale-105 duration-100" 
                                onClick={() => setDisplaySet(set)}
                            >
                                {set.charAt(0).toUpperCase() + set.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-5 w-full flex flex-col justify-start p-5 manrope-400 text-lg">
                    <table className="table-auto rounded-lg">
                        <thead className='border-b-2 border-platinum'>
                            <tr>
                                <th className="text-left">Title</th>
                                <th className="text-left">Acceptance</th>
                                <th className="text-left">Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayProblems.map((problem) => (
                                <ProblemSet
                                    key={problem.problemId}
                                    {...problem}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ShowProblems;
