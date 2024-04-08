import EncodingParametersInURLs from "./EncodingParametersInURLS";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

function Assignment5() {
    
  const API_BASE = process.env.REACT_APP_API_BASE;
  
    return (
      <div className="container">
        <div className="row" id="3.0">
          <div className="col-sm">
            <h1>Assignment 5</h1>
            <a href="http://localhost:4000/a5/welcome">
              Welcome
            </a>
          </div>
        </div>
        <div className="row" id="3.1">
          <div className="col-4">
            <EncodingParametersInURLs API_BASE={API_BASE} />
          </div>
        </div>
        <div className="row" id="3.2">
          <div className="col-4">
            <WorkingWithObjects API_BASE={API_BASE} />
          </div>
        </div>
        <div className="row" id="3.3">
          <div className="col-4">
            <WorkingWithArrays API_BASE={API_BASE} />
          </div>
        </div>
      </div>
    );
  }

  export default Assignment5;