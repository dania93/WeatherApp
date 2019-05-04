import React from 'react';
import './App.css';
import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/Weather"

const API_KEY = "2ac24effe6e355aeddb927d2e7abf73d";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    const city = e.target.elements.city.value;
    e.preventDefault();

    if(city) {
      const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Enter the name of the city!"
    });
  }
}
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-5 info"><Info /></div>
            <div className="col-sm-12 col-md-7 form">
              <Form weatherMethod={this.gettingWeather} />
              <Weather
                temp={Math.floor(this.state.temp-273.15)}
                city={this.state.city}
                country={this.state.country}
                pressure={this.state.pressure}
                sunset={this.state.sunset}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
