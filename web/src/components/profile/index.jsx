import { useContext, useEffect, useState } from "react";
import { GlobalContext } from '../../context';
import axios from "axios";


let Profile = () => {

  let { state, dispatch } = useContext(GlobalContext);
  const [profile, setProfile] = useState(null);


  useEffect( () => {

    const getProfile = async () => {

    
    let baseUrl = 'http://localhost:3003'
    try{
      let response = await axios.get(`${baseUrl}/user/634acaa6f10b34f45ecd50ac`)

      console.log('response', response.data);

      setProfile(response.data)

    } catch (e){
     console.log('error in api call', e)
    }
  }
  getProfile();
  })


  return(
    <div>
      {(profile === null ) ? 
       <div>Loading...</div>
       :
      <div>
        _id: {profile?._id}
        <br /> 
        name: {profile?.firstName} {profile?.lastName}
        <br /> 
        email: {profile?.email}
        <br /> 
        age: {profile?.age}
      </div>
      }
    </div>
  )
 
}

export default Profile;