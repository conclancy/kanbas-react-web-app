function ImpliedReturns() {
    const multiply = (a: number, b: number) => a * b;
    const fourTimesFive = multiply(4, 5);
    console.log(fourTimesFive);

    return(
        <>
            <h3>Implied Returns</h3>
            fourTimesFive = {fourTimesFive}<br/>
            multiply(4,5) = {fourTimesFive}<br/>
        </>
    )
}
export default ImpliedReturns