function Def({ a, b }: { a: number; b: number }) {
    return (
      <div>
        {a} times {b} = {a * b}
      </div>
    );
  }
  
  export default function Abcq9() {
    const q = [2, 3];
    const [x, y] = q;
    return <Def a={x} b={y} />;
  }