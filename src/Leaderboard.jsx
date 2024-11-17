import { useEffect, useState } from "react";
import NavBar from "./components/NavBar"
import PATH from "./PATH";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(
        () => {
            const fetchLeaderboard = async() => {
                const data = await fetch(`${PATH}/leaderboard`, {
                    method: "GET",
                })
                setLeaderboard(await data.json());
            }
            fetchLeaderboard();
        }, []
    )

    return(
        <>
            <NavBar/>
            <h1 className="mt-4 manrope-700 text-2xl text-center">Leaderboard</h1>
            <div className="flex justify-center items-center align-center min-w-screen mt-10">
            <table className="table-auto rounded-lg">
                <thead className='border-b-2 border-platinum-50 text-xl'>
                    <tr>
                        <th className="text-center">Rank</th>
                        <th className="text-center">User</th>
                        <th className="text-center">Aura</th>
                    </tr>
                </thead>
                <tbody>
                {leaderboard.map((element, index) => (<tr key={index} className={index % 2 == 0 ? "bg-platinum-50 text-black manrope-400 text-xl" : "bg-white text-black manrope-400 text-xl"}>
                    <td className={index === 0 ? "text-bright-orange px-10 py-5 text-left" : "px-10"}>{index+1}</td>
                    <td className={index === 0 ? "text-bright-orange px-10 py-5 text-left" : "px-10"}>{element.username} </td>
                    <td className={index === 0 ? "text-bright-orange px-10 py-5 text-left" : "px-10"}>{element.aura}</td>
                    </tr>))}
                </tbody>
            </table>
            </div>
        </>
    )
}
export default Leaderboard;