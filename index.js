const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weather_box = document.querySelector('.weather-box');
const weather_details = document.querySelector('.weather-details');
const not_found = document.querySelector('.not-found');

//when enter is pressed
container.addEventListener('keydown', (event) =>{
    if(event.key === "Enter"){
        call_api();
    }
})

//on button click
search.addEventListener('click', () =>{
    call_api();
})

//call API and fetch json
function call_api(){
    //OpenWeatherMap API Key
    const APIKey = 'c5d7cf6b16a0577b398daf15f32a0055';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    //API Call
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
           
            //check if API gives error 404 not found
        	if(json.cod === '404'){
                container.style.height = '450px';
                weather_box.style.display = 'none';
                weather_details.style.display = 'none';
                not_found.style.display = 'block';
                not_found.classList.add('fadeIn');
                return;
            }
            
            not_found.style.display = 'none';
            not_found.classList.remove('fadeIn');

            //get html div components
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            //set weather image 
            switch (json.weather[0].main){
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

            //parse json data in html divs
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            
            //change html and call fadeIn animation
            weather_box.style.display = '';
            weather_details.style.display = '';
            weather_box.classList.add('fadeIn');
            weather_details.classList.add('fadeIn');
            container.style.height = '600px';
        });
}