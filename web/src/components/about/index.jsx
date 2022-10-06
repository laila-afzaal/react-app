import { useContext } from "react";
import { GlobalContext } from '../../context';

let About = () => {

  let { state, dispatch } = useContext(GlobalContext);

  return(
    <div>
      This is a About Component. - {state.myNum}

      <button onClick={()=>{
        dispatch({
          type: "SUBTRACT"
        })
      }} > subtract </button>
    </div>
  )
}

export default About;