import React, { useEffect, useState } from "react";
import axios from "axios";

function EncodingParametersInURLs(API_BASE: any) {

  // Assign the API_BASE variable from the pasted JSON
  API_BASE = API_BASE['API_BASE']

  const [a, setA] = useState(34);
  const [b, setB] = useState(23);
  const [result, setResult] = useState(0);
  const [welcome, setWelcome] = useState("");

  const fetchSum = async (a: any, b: any) => {
    const response = await
      axios.get(`${API_BASE}/a5/add/${a}/${b}`);
    setResult(response.data);
  };
  
  const fetchSubtraction = async (a: any, b: any) => {
    const response = await axios.get(
      `${API_BASE}/a5/subtract/${a}/${b}`);
    setResult(response.data);
  };

  const fetchWelcome = async () => {
    const response = await axios.get(`${API_BASE}/a5/welcome`);
    setWelcome(response.data);
  };

  useEffect(() => {
    fetchWelcome();
  }, []);
 
  return (
    <div className="container">
      <h3>Encoding Parameters In URLs</h3>

      <h4>Integrating React with APIs</h4>
      <h5>Fetching Welcome</h5>
      <h6>{welcome}</h6>

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
        <div className="form-group">
          <input className="form-control" value={result} type="number" readOnly />
        </div>
        
      </form>
      
      <h3>Path Parameters</h3>
      <h3>Fetch Result</h3>
      <button className="btn btn-primary"
        onClick={() => fetchSum(a, b)} >
        Fetch Sum of {a} + {b}
      </button>
      <br />
      <button className="btn btn-danger"
        onClick={() => fetchSubtraction(a, b)}>
        Fetch Substraction of {a} - {b}
      </button>


      <h3>Query Parameters</h3>
      <a className="btn btn-primary"
        href={`${API_BASE}/a5/calculator?operation=add&a=${a}&b=${b}`}>
        Add {a} + {b}
      </a>
      <a className="btn btn-danger"
        href={`${API_BASE}/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
        Substract {a} - {b}
      </a>
      <br/>
      <a className="btn btn-success"
        href={`${API_BASE}/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
        Multiply {a} x {b}
      </a>
      <a className="btn btn-warning"
        href={`${API_BASE}/a5/calculator?operation=divide&a=${a}&b=${b}`}>
        Divide {a} / {b}
      </a>
    </div>
  );
}

export default EncodingParametersInURLs;