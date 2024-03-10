import React, { useState } from "react";

function Abcq12() {
  const [a, b] = useState({ c: "q", d: 27 });

  const x = (e: { target: { value: any; }; }) => b({ ...a, c: e.target.value });
  const y = (s: { target: { value: string; }; }) => b({ ...a, d: parseInt(s.target.value) });

  return (
    <div>
      <input id="r" value={a.c} onChange={x} />
      <input id="t" value={a.d} onChange={y} />
      {JSON.stringify(a, null, 2)}
    </div>
  );
}

export default Abcq12;