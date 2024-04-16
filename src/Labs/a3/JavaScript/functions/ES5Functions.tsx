function add (a: number, b: number) {
    return a + b;
}

const twoPlusFour = add(2, 4);

function ES5Functions() {

  return (
    <>
      <h3>Functions</h3>
      <h3>Legacy ES5 functions</h3>
      twoPlusFour = { twoPlusFour }<br />
      add(2, 4) = { add(2, 4) }<br />
    </>
  );
}

export default ES5Functions