const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weather_box = document.querySelector('.weather-box');
const weather_details = document.querySelector('.weather-details');
const not_found = document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const APIKey = 'f5f6921d11e8b4021137f05a67ffcb7c';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}`)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '400px';
                weather_box.style.display = 'none';
                weather_details.style.display = 'none';
                not_found.style.display = 'block';
                not_found.classList.add('fadeIn');
                return;
            }
            
            not_found.style.display = 'none';
            not_found.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'images/sun.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloudy.png';
                    break;
                case 'Rain':
                    image.src = 'images/rainy.png';
                    break;
                case 'Snow':
                    image.src = 'images/snowy.png';
                    break;
                case 'Haze':
                    image.src = 'images/foog.png';
                    break;

                default:
                    image.src = ''
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            
            weather_box.style.display = '';
            weather_details.style.display = '';
            weather_box.classList.add('fadeIn');
            weather_details.classList.add('fadeIn');
            container.style.height = '600px';
        });

});