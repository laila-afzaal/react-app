import axios from 'axios'
import { useState } from 'react';
import WeatherCard from "./../weatherCards";
import { Button, Form } from 'react-bootstrap';
import './index.css'


let Home = () => {

  const [cityName, setCityName] = useState('');
  const [data, setData] = useState([]);

  let submitHandler = async (e) => {
    e.preventDefault();

    console.log('This is a submit handler function');

    try {

      let response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=b5b540c27d2e8c52f582da4f53b4e572&units=metric`)

      console.log('response:', response);

      setData(response.data.list)

    } catch (error) {
        console.log('error in api call:', error)
    }

  }

  return (
    <div className='wrapper'>
      <h1 className='title'>Weather App</h1>

      <form onSubmit={submitHandler}>
        
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>City Name: </Form.Label>
        <Form.Control type="text" required
         placeholder="enter your city name" 
         onChange={(e) => {
          // console.log(e.target.value)
          setCityName(e.target.value)
        }}/>
      </Form.Group>
        
        
        
        {/* <input
          type="text"
          required placeholder='Enter your city name'
          onChange={(e) => {
            // console.log(e.target.value)
            setCityName(e.target.value)
          }}
        /> */}
        <Button type='submit'>Get Weather</Button>
      </form>

      
        {
          // data.map((eachForcast) => (
          //  <div>
          //    <div> {eachForcast.dt_txt}  </div>
          //    <h1> {eachForcast.main.temp} </h1>
          //    <div> {eachForcast.main.temp_min} - {eachForcast.main.temp_max} </div>
          //  </div>
          // ))
          data.map((eachForcast, index) => (

            <WeatherCard 
              key={index}
              date={eachForcast.dt_txt}
              temp={eachForcast.main.temp}
              min={eachForcast.main.temp_min}
              max={eachForcast.main.temp_max}
            />
           ))
        }
      

    </div>

  );
}

export default Home;
