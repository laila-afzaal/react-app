import { Link } from "react-router-dom";
import './index.css'

export default function NavBar() {
  return(
    <nav className='nav'>
      <div className='userId'> Laila Afzaal </div>
      <ul>
        <li> <Link to="/"> Home </Link>             </li>
        <li> <Link to="/about"> About </Link>       </li>
        <li> <Link to="/gallery"> Gallery </Link>   </li>
        
        <li> <Link to="/login"> Login </Link>     </li>
        <li> <Link to="/signup"> Signup </Link>   </li>
      </ul>
    </nav>
  )
}