import { Link, Route, Routes, useLocation } from "react-router-dom";

function Def() {
    const { pathname } = useLocation();
    return (
      <div>
        output =
        {pathname.includes("z") && <span>p</span>}
        {pathname.includes("w") && <span>y</span>}
      </div>
    );
  }
  
  export default function Abcq14() {
    return (
      <div>
        <Link to="q/w">x</Link><br/>
        <Link to="q/z">r</Link>
        <Routes>
          <Route path="q/:a" element={<Def />} />
        </Routes>
      </div>
    );
  }