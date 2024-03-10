function Def({ a }) {
    const { c, d } = a;
    return (
      <pre>
        {c} <br /> {d}
      </pre>
    );
  }
  
  const b = {
    c: "e",
    d: "f",
  };
  
  export default function Abcq13() {
    return <Def a={b} />;
  }