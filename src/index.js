import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import axios from "axios";
import styled from 'styled-components';

//styles
const SIZE = {
 xs: "320px",
 sm: "768px",
 lg: "1200px",
};
const DEVICE = {
 xs: `(max-width: ${SIZE.xs}) and (min-width: 0)`,
 sm: `(max-width: ${SIZE.sm}) and (min-width: ${SIZE.xs})`,
 lg: `(max-width: ${SIZE.lg}) and (min-width: ${SIZE.sm})`
};

const WelcomeContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const CoordForm = styled.form`
  text-align: center;
  width: 500px;
`
const CoordHeader = styled.h3`
  margin-bottom: 22px;
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 4px;
`
const CoordInput = styled.input`
  display: block;
  width: 80%;
  margin: 10px auto 4px;
  border: none;
  border-bottom: 2px solid #C8CEFF;
  color: #828DFF;
  padding: 5px;
  font-size: 24px;
  text-align: left;
  &:focus {
    border-color: #e75f5b;
  }
`;
const CoordSubmitBtn = styled.input.attrs(props => ({type: "submit"}))`
  width: 83%;
  height: 80px;
  margin: 35px 0 0;
  border: none;
  background: #fff;
  text-transform: uppercase;
  font-size: 36px;
  color: #bab9fa;
  letter-spacing: 4px;
  cursor: pointer;
  &:hover {
   background-color: #BAB9FF;
   color: #fff;
 }
`

const InfoBlockContainer = styled.section`
  height: 100vh;
  width: 100%;
  padding: 20px 0 0 0;
  text-align: center;
`;
const CityName = styled.h1`
  display: inline;
  padding: 10px 50px;
  background: #242424;
  color: #fff;
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
  margin: 20px auto 30px;
`;

const NavbarBlock = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80%;
  margin: 30px auto 20px;
  padding: 0 20px;
  background: linear-gradient(to top, #c8ceff 55%, #fff 0%);
  @media only screen and ${DEVICE.sm}{
      background: linear-gradient(to top, #c8ceff 70%, #fff 0%);
    }
  @media only screen and ${DEVICE.xs}{
      background: linear-gradient(to top, #c8ceff 90%, #fff 0%);
    }
`;
const DayBlock = styled.div`
  width: 18%;
  margin: 10px 0 25px;
  padding: 12px 7px;
  background: #E0DFFE;
  > input[name=day] {
    display: none;
  }
  @media only screen and ${DEVICE.lg}{
    width: 40%;
  }
  @media only screen and ${DEVICE.sm}{
      width: 60%;
    }
  @media only screen and ${DEVICE.xs}{
      width: 80%;
    }
`;
const DayRadio = styled.input.attrs(props => ({type: "radio"}))`
  & ~ label {
    cursor: pointer;
  }
  &:checked ~ label {
    cursor: auto;
  }
  &:checked ~ label > h3 {
    background: #e75f5b;
  }
`;
const DayName = styled.h3`
  width: 85%;
  margin: 5px auto 15px;
  padding: 10px 0;
  color: #fff;
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  text-transform: uppercase;
  background: #B8B6FF;
`;
const DayMainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const DayTempBlock = styled.div`
  width: 50%;
  text-align: center;
  background: #fff;
  margin-right: -10%;
`;
const DayTemp = styled.p`
    margin: 5px 0;
    font-size: 26px;
    font-weight: 500;
    color: ${props => props.red? "#e75f5b":"#715bf8"};
`;
const DayWeatherIcon = styled.img`
  width: 50%;
`;
const DayHorizontalLine = styled.hr`
  width: 85%;
  border: 1px solid #fff;
`;
const DayAdditionalBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 85%;
  margin: 8px auto 0;
  padding: 5px 10px;
  border-radius: 50px;
  background: #fff;
`;
const DayAdditionalInfo = styled.span`
  font-size: 22px;
  font-weight: 300;
  color: ${props => props.red ? "#e75f5b":"#715bf8"};
`;
const DayVerticalLine = styled.div`
  width: 2.4px;
  height: 25px;
  background: #e75f5b;
`;

const ForecastBlock = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 40px 0 0;
  padding: 10px;
  background: #e0dffe;
`;
const HourInfoBlock = styled.div`
  padding: 10px;
  @media only screen and ${DEVICE.lg}{
    width: 20%;
  }
  @media only screen and ${DEVICE.sm}{
          width: 40%;
    }
  @media only screen and ${DEVICE.xs}{
      width: 80%;
    }
`;
const HourParagraph = styled.p`
  margin: 15px 0 0;
  padding: 10px;
  font-size: 24px;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  background: #fff;
  color: ${props => props.blue ? "#715bf8":"#e75f5b"};
`;
const HourHeader = styled.h3`
  font-size: 36px;
  margin: 10px 0;
`;

const RESPONSE = {
  "cod": "200",
  "message": 0,
  "cnt": 12,
  "list": [
    {
      "dt": 1606219200,
      "main": {
        "temp": 24.69,
        "feels_like": 24.5,
        "temp_min": 24.69,
        "temp_max": 24.73,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 1012,
        "humidity": 53,
        "temp_kf": -0.04
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 87
      },
      "wind": {
        "speed": 2.31,
        "deg": 19
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2020-11-24 12:00:00"
    }
  ],
  "city": {
    "id": 0,
    "name": "",
    "coord": {
      "lat": 20,
      "lon": 65
    },
    "country": "",
    "population": 0,
    "timezone": 14400,
    "sunrise": 1606182875,
    "sunset": 1606222757
  }
};
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class WelcomeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: ""
    };
    this.onChangeLat = this.onChangeLat.bind(this);
    this.onChangeLon = this.onChangeLon.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeLat (e) {
    this.setState({
      lat: e.target.value
    });
  }
  onChangeLon (e) {
    this.setState({
      lon: e.target.value
    });
  }
  onSubmit (e) {
    e.preventDefault();
    this.props.onSubmit(this.state.lat, this.state.lon);
  }
  render() {
    return(
      <WelcomeContainer>
        <CoordForm onSubmit={this.onSubmit}>
          <CoordHeader>Enter the coordinats</CoordHeader>
          <CoordInput onChange={this.onChangeLat} value={this.state.lat} placeholder="latitude"/>
          <CoordInput onChange={this.onChangeLon} value={this.state.lon} placeholder="longitude"/>
          <CoordSubmitBtn type="submit" value="submit"/>
        </CoordForm>
      </WelcomeContainer>
    );
  }
}

class DayWeather extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <label htmlFor={"day-" + this.props.index}>
        <DayName>{this.props.weather.day}</DayName>
        <DayMainInfo>
          <img src={"img/" + this.props.weather.icon + ".png"}/>
          <DayTempBlock>
            <DayTemp red>{this.props.weather.max}</DayTemp>
            <DayTemp>{this.props.weather.min}</DayTemp>
          </DayTempBlock>
        </DayMainInfo>
        <DayHorizontalLine/>
        <DayAdditionalBlock>
          <DayAdditionalInfo>{this.props.weather.humidity}%</DayAdditionalInfo>
          <DayVerticalLine/>
          <DayAdditionalInfo red>{this.props.weather.windspeed} M/S</DayAdditionalInfo>
        </DayAdditionalBlock>
      </label>
    )
  }
}
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDay = this.onClickDay.bind(this);
  }

  onClickDay(e) {
    this.props.onClickDay(parseInt(e.target.value,10));
  }
  render() {
    const weather = this.props.weather;
    const allDailyWeather = weather.map((cur, index) => {
      return(
        <DayBlock key={index}>
          <DayRadio onClick={this.onClickDay} id={"day-" + index} type="radio" name="day" value={index}/>
            <DayWeather weather={cur} index={index}/>
        </DayBlock>
      )
    });
    return(
      <NavbarBlock>
        {allDailyWeather}
      </NavbarBlock>
    )
  }
}

class HourInfo extends React.Component {
  render() {
    const weather = this.props.weather;
    return(
      <HourInfoBlock>
        <HourHeader>{weather.hour}</HourHeader>
        <img src={"img/" + weather.icon + ".png"}/>
        <HourParagraph>{weather.temp}℃</HourParagraph>
        <HourParagraph>{weather.windspeed} М/С</HourParagraph>
        <HourParagraph blue>{weather.humidity}%</HourParagraph>
      </HourInfoBlock>
    )
  }
}
class Forecast extends React.Component {
  render() {
    const weather = this.props.weather;
    const allHourInfo = weather.map((cur, index) => {
      return <HourInfo key={index} weather={cur}/>
    });
    return (
      <ForecastBlock>
        {allHourInfo}
      </ForecastBlock>
    )
  }
}
class InfoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeday: 1,
      response: RESPONSE,
    }
    this.changeActiveDay = this.changeActiveDay.bind(this);
  }

  changeActiveDay(key) {
    this.setState({
      activeday: key
    })
  }

  componentDidMount() {
    axios
      .request(this.props.options)
      .then(res => this.setState({response: res.data}))
      .catch(error => this.setState({ error }));
    this.getDataInterval = setInterval( () => {
      axios
        .request(this.props.options)
        .then(res => this.setState({response: res.data}))
        .catch(error => this.setState({ error }));
      console.log("response has responsed");
    }, 30000);
    }

  componentWillUnmount() {
    clearInterval(this.getDataInterval);
  }

  render() {
    const RESPONSE_OBJECT = this.state.response;
    const CITY = RESPONSE_OBJECT.city.name;

    let hourlyWeather = RESPONSE_OBJECT.list.map((cur) => {
      return createHourInfoObject(cur);
    });

    const activeDayDataIndex = (this.state.activeday + 1) * 8;
    const dailyWeather = hourlyWeather.filter(
      (weather, index) => {
        return index % 8 === 0;
      }
    );
    const hourlyForDay = hourlyWeather.slice(activeDayDataIndex - 8, activeDayDataIndex);
    return(
      <InfoBlockContainer>
        <CityName>{CITY}</CityName>
        <Navbar onClickDay={this.changeActiveDay} weather={dailyWeather} />
        <Forecast weather={hourlyForDay} />
      </InfoBlockContainer>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
    };
    this.onSubmitCoordinats = this.onSubmitCoordinats.bind(this);
    this.onBackBtnClick = this.onBackBtnClick.bind(this);
  }

  onSubmitCoordinats(lat, lon) {
    this.setState({
      lat: lat,
      lon: lon,
    });
  }
  onBackBtnClick (e) {
    e.preventDefault();
    this.setState({
      lat: "",
      lon: "",
    });
  }
  render() {
    const OPTIONS = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
      params: {
        cnt: "32",
        lat: this.state.lat.toString(),
        lon: this.state.lon.toString(),
        units: 'metric',
      },
      headers: {
        'x-rapidapi-key': '9c9b696463msh109dccddf5bd1f9p18989ejsn3f7adfadeb90',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    };
    return(
            (this.state.lat === "" && this.state.lon === "") ?
            <WelcomeBlock onSubmit={this.onSubmitCoordinats}/>
            :
            <section>
              <button onClick={this.onBackBtnClick}>FUCK GO BACK</button>
              <InfoBlock options={OPTIONS} lat={this.state.lat} lon={this.state.lon}/>
            </section>
          )
        }
      }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function createHourInfoObject (srcObject) {
  const DATE = new Date(srcObject.dt * 1000);
    return {
    day: WEEKDAYS[DATE.getDay()],
    hour: (DATE.getHours() + ":00"),
    temp: srcObject.main.temp,
    max: srcObject.main.temp_max,
    min: srcObject.main.temp_min,
    humidity: srcObject.main.humidity,
    descr: srcObject.weather[0].main,
    icon: srcObject.weather[0].icon,
    windspeed: srcObject.wind.speed
  };
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
