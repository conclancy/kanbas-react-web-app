function Jkl() {
    const q = [
      { a: 1, w: "g" },
      { a: 2, w: "t" },
      { a: 1, w: "j" },
    ];
    return (
      <ul>
      {
        q.map((s, d) => (
          <li key={d}>{s.w}</li>
        ))
      }
      </ul>
    );
  }
  export default Jkl;