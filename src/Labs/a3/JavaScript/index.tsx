import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import ArrowFunctions from "./functions/ArrowFunctions";
import ES5Functions from "./functions/ES5Functions";
import FunctionParenthesisAndParameters 
   from "./functions/FunctionParenthesisAndParameters";
import VariablesAndConstants
   from "./variables/VariablesAndConstants";
import ImpliedReturns from "./functions/ImpliedReturn";
import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";


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
          <ES5Functions/>
          <ArrowFunctions/>
          <ImpliedReturns/>
          <FunctionParenthesisAndParameters/>
       </div>
    );
}

export default JavaScript