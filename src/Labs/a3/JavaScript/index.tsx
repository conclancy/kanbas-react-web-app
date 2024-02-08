import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import VariablesAndConstants
   from "./variables/VariablesAndConstants";
import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";


function JavaScript() {
    console.log('Hello World!');
    return(
       <div>
          <h1>JavaScript</h1>
          <VariablesAndConstants/>
          <VariableTypes/>
          <BooleanVariables/>
          <IfElse/>
          <TernaryOperator/>
          <WorkingWithFunctions/>
          <WorkingWithArrays/>

       </div>
    );
}

export default JavaScript