const TestCase = ({index, testCase, failedCases, hasSubmitted}) => {
    let className = "mt-5 bg-platinum manrope-400 w-full rounded-lg"
    if(hasSubmitted){
        const isFailed = failedCases.includes(index)
        className = isFailed ? "mt-5 bg-platinum manrope-400 w-full rounded-lg text-red" : "mt-5 bg-platinum manrope-700 w-full rounded-lg text-green"
    }
    return(
        <>
            <section className={className}>
            <h1 className="mt-2 ml-2">Case {index+1}</h1>
            <p className="ml-2">{testCase}</p>
            </section>
        </>
    )
}

export default TestCase;