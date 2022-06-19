import {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({capitalInfo: {name, lat, lng}}) => {
    const APIkey = process.env.REACT_APP_API_KEY;
    const [temp, setTemp] = useState(0);
    const [wind, setWind] = useState(0);
    const [icon, setIcon] = useState('');
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${APIkey}`)
            .then(response => {
                setTemp(response.data.main.temp);
                setWind(response.data.wind.speed);
                setIcon(response.data.weather[0].icon)
                console.log(response.data);
            })
    }, [lat, lng])
    return (
        <div>
            <h2>Weather in {name}</h2>
            <p>temperature: {temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather' />
            <p>wind {wind} m/s</p>
        </div>
    );
};

export default Weather;