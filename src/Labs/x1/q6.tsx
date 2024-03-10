function Rew({ d = { b: "c" } }) {
    const a = {
      b: "b",
      c: 1,
    };
    const e = {
      ...a,
      ...d,
    };
    return (
      <ul>
        <li>{e.c}</li>
        <li>{e.b}</li>
      </ul>
    );
  }
  export default Rew;