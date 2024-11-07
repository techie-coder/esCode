const TestCase = ({index, testCase}) => {
    return(
        <>
            <section className="mt-5 bg-platinum manrope-400 w-full rounded-lg">
            <h1 className="mt-2 ml-2">Case {index+1}</h1>
            <p className="ml-2">{testCase}</p>
            </section>
        </>
    )
}

export default TestCase;