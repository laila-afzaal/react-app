import './index.css'
import moment from 'moment';
import { Card } from 'react-bootstrap';


let WeatherCard = ({date, temp, min, max}) => {
  return (
    // <div className="card">
      
    //        <div> {moment(date).format('dddd ha')}  </div>
    //        <h1> {temp}°C </h1>
    //        <div> {min}°C - {max}°C </div>
    
    // </div>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{moment(date).format('dddd ha')}</Card.Title>
        <Card.Text>
        <h1> {temp}°C </h1>
        </Card.Text>
        <Card.Title> {min}°C - {max}°C </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;