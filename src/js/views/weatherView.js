import View from './views.js';
import sunIcon from 'url:../../imgs/sun-icon.svg';
import cloudIcon from 'url:../../imgs/cloud-icon.svg';
import rainIcon from 'url:../../imgs/rain-icon.svg';
import snowIcon from 'url:../../imgs/snow-icon.svg';
import fogIcon from 'url:../../imgs/fog.png';

class weatherView extends View {
  _parentElement = document.querySelector('.weather-container');

  addWeatherHandlerRendler(handler) {
    //*
    window.addEventListener('load', function () {
      handler();
    });
  }

  _generateMarkUp() {
    const date = new Date();
    return `
    <div class="weather-details">
    <h3 class="wdate">${date.getMonth()}.${date.getDay()}.${date.getFullYear()}</h1> 
    <h3 class="wtime">${date.getHours()}:${date.getMinutes()} </h2>

    <div class = "weather-info">

    <div class="weather-icon">
    <h4 class="wtemp">${this._data.city}</h4>
    <img src=${
      this._data.description === 'Sun'
        ? sunIcon
        : this._data.description === 'Rain'
        ? rainIcon
        : this._data.description === 'Snow'
        ? snowIcon
        : this._data.description === 'Fog'
        ? fogIcon
        : this._data.description === 'Clouds'
        ? cloudIcon
        : ''
    }  class="sun-icon">
    </div>
    
  
    <div class="weather-temp"> 
    <h1 class="wMainTemp">${Math.floor(this._data.maintemp)}°</h1> 
    <h4 class="wtemp">${this._data.description}</h4>
    <h5 class="wtemp">High <span class= "wmin-max">${Math.floor(
      this._data.maxtemp
    )}° </span>/ Low <span class= "wmin-max">${Math.floor(
      this._data.mintemp
    )}°</span></h5>
    </div>
   
</div>
    </div>`; //*
  }
}

export default new weatherView();
