import { useContext } from "react";
import { GlobalContext } from '../../context/context';

let Gallery = () => {

  let { state, dispatch } = useContext(GlobalContext);

  return(
    <div>
      This is a Gallery Component. -  {state.myNum}

      <button onClick={()=>{
        dispatch({
          type: "ADD"
        })
      }}>add</button>
    </div>
  )
}

export default Gallery;