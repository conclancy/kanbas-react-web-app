import React, { useState } from "react";

function EncodingParametersInURLs() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(23);
  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Calculator</h4>
      <form>
        <div className="form-group">
          <input type="number" value={a} className="form-control"
            onChange={(e) => setA(parseInt(e.target.value))}/>
        </div>
        <div className="form-group">
          <input type="number" value={b} className="form-control"
            onChange={(e) => setB(parseInt(e.target.value))} />
        </div>
      </form>
      <h3>Path Parameters</h3>
      <a className="btn btn-primary" 
        href={`http://localhost:4000/a5/add/${a}/${b}`}>
        Add {a} + {b}
      </a>
      <a className="btn btn-danger" 
        href={`http://localhost:4000/a5/subtract/${a}/${b}`}>
        Substract {a} - {b}
      </a>
      <h3>Query Parameters</h3>
      <a className="btn btn-primary"
        href={`http://localhost:4000/a5/calculator?operation=add&a=${a}&b=${b}`}>
        Add {a} + {b}
      </a>
      <a className="btn btn-danger"
        href={`http://localhost:4000/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
        Substract {a} - {b}
      </a>
      <br/>
      <a className="btn btn-success"
        href={`http://localhost:4000/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
        Multiply {a} x {b}
      </a>
      <a className="btn btn-warning"
        href={`http://localhost:4000/a5/calculator?operation=divide&a=${a}&b=${b}`}>
        Divide {a} / {b}
      </a>
    </div>
  );
}

export default EncodingParametersInURLs;