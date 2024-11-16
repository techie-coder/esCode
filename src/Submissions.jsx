import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import PATH from "./PATH";

const Submissions = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [submissions, setSubmissions] = useState([]);

    useEffect(
        () => {
            const getSubmissions = async() => {
                let token = null;
                try{
                    token = await getAccessTokenSilently({
                        authorizationParams: {
                          audience: `https://dev-skne2ots1cwlwxnk.us.auth0.com/api/v2/`,
                          scope: "read:current_user",
                        },
                      });
                }catch(e){
                    console.log(e);
                }
                console.log(token);
                
                try{
                    const data = await fetch(`${PATH}/submissions/${user.nickname}`, {
                        method: "GET",
                        headers: {"Authorization": `Bearer ${token}`}
                    })
                    setSubmissions(await data.json())
                    console.log(Submissions);
                }catch(e){
                    console.log(e)
                }
            }
            getSubmissions();
        }, [submissions, getAccessTokenSilently, user]
           
    )

    return(
        <>
        <NavBar/>
        <div className="bg-platinum min-h-screen">
        <h1 className="pt-4 manrope-700 text-2xl text-center">Your Submissions</h1>
        <div className="flex justify-start items-center mt-10">
            {submissions.map((element, index) => (<div key={index} className="border-[0.01rem] border-platinum shadow manrope-400 mx-32 bg-white">
                <section className="m-2 text-md">
                <h1>Problem Id: {element.problem_id}</h1>
                <h2>Source code: {element.source_code}</h2>
                <h3>Test Cases Passed: {element.test_cases_passed}</h3>
                <h4>Created At: {element.createdAt}</h4>
                </section>
            </div>))}
        </div>
        </div>
        </>
    )
}

export default Submissions;