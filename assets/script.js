let citySearch = document.getElementById('search-city');
let container = document.getElementById('list-items');
let searchButton = document.getElementById ('searchBtn');
let currentCity = document.getElementById('current-city');
let weatherImage = document.getElementById('weather-icon');
let currentTemp = document.getElementById ('temperature');
let windSpeed = document.getElementById('wind-speed');
let uvIndex = document.getElementById('uv-index');
let humidity = document.getElementById('humidity');
let clearBtn = document.getElementById('clear-history');
let today = document.getElementById('today');
let daySearched = document.getElementById('day');
let day = new Date();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let city = '';
let cityArray = [];


function headerDate(){

    let todaysDate = moment().format('LLLL');
    today.textContent = todaysDate;
}
    headerDate();
  

function getCity(c){
    for ( var i = 0; i < cityArray.length; i++){
        if(c.toUpperCase()=== cityArray[i]){
            return -1;
        }
    }
      return 1;
}

 const APIkey = {  

    key:'33253a1564718c43c40d46c7d21c2e09',  base:'https://api.openweathermap.org/data/2.5/'


 }

   
function weatherDisplay(event) {
    event.preventDefault();

    if (citySearch.value.trim('')) {
        city = citySearch.value.trim('');

        myWeather(city);
        fiveDay(city);

    }
}

function myWeather(city) {
 console.log('weather')
    fetch (`${APIkey.base}weather?q=${city}&units=imperial&appid=${APIkey.key}`)
    .then(weather => {
    return weather.json();
    }).then (function (response){
       console.log(response)
          
        let weatherIcon = response.weather[0].
        icon;
        console.log(weatherIcon)

        let iconURL = document.querySelector('.weather-icon');
        iconURL.innerHTML = `<img src="images-icon/${weatherIcon}.png"/>`

        currentCity.innerHTML = response.name; 

        let temp = `${Math.round(response.main.temp)}`
        
        currentTemp.textContent = ' ' + temp + '°';

        humidity.textContent = ' ' + response.main.humidity + '%';

        let winds =   response.wind.speed;

        let windMPH = (winds * 2.237).toFixed(1);

        windSpeed.textContent =  ' ' + windMPH + 'MPH';

      

            if (response.cod == 200) {
                cityArray = JSON.parse(localStorage.getItem('cityname'));
            } 
                  if (cityArray == null){
                       cityArray = [];
                        cityArray.push(city.toUpperCase());
                       localStorage.setItem('cityname', JSON.stringify(cityArray));
                       //cityArray.push(city);
                   }
                     else if(getCity(city) > 0){
                            cityArray.push(city.toUpperCase());
                            localStorage.setItem('cityname', JSON.stringify(cityArray));
                            //cityArray.push(city);
                            console.log(cityArray)
                }

               
                UVindex(response.coord.lon,response.coord.lat);
                fiveDay(city);
                addList(cityArray);
               
    });    
} 

            

        
function UVindex (ln,lt) {
       
     fetch (`${APIkey.base}uvi?lat=${lt}&lon=${ln}&appid=${APIkey.key}`)
     .then(uvIndex => {
         return uvIndex.json();
     }).then ( function (response){
         uvIndex.textContent = response.value;
        

    });
}

function fiveDay (city){ 
    
    fetch (`${APIkey.base}forecast?q=${city}&units=imperial&appid=${APIkey.key}`)
    .then(forecast => {
        return forecast.json();
    }).then (function (response){
        console.log(response)


    let date0 = document.getElementById('fDate0');
    date0.innerHTML = days[day.getDay()+ 1];
    
    let date1 = document.getElementById('fDate1');
    date1.innerHTML = days[day.getDay()+ 2];
    
    let date2 = document.getElementById('fDate2');
    date2.innerHTML = days[day.getDay()+ 3];

    let date3 = document.getElementById('fDate3');
    date3.innerHTML = days[day.getDay()+ 4];

    let date4 = document.getElementById('fDate4');
    date4.innerHTML = days[day.getDay()+ 5];

    let icon0 = response.list[1].weather[0].icon;
    let image0 = document.getElementById('fImg0');
    image0.innerHTML =`<img src="images-icon/${icon0}.png"/>`

    let icon2 = response.list[2].weather[0].icon;
    let img1 = document.getElementById('fImg1');
    img1.innerHTML =`<img src="images-icon/${icon2}.png"/>`

    let icon3 = response.list[3].weather[0].icon;
    let img2 = document.getElementById('fImg2');
    img2.innerHTML =`<img src="images-icon/${icon3}.png"/>`

    let icon4 = response.list[4].weather[0].icon;
    let img3 = document.getElementById('fImg3');
    img3.innerHTML =`<img src="images-icon/${icon4}.png"/>`

    let icon5 = response.list[5].weather[0].icon;
    let img4 = document.getElementById('fImg4');
    img4.innerHTML =`<img src="images-icon/${icon5}.png"/>`


    let temp0 = document.getElementById('fTemp0');
    temp0.textContent= ` ${Math.round(response.list[1].main.temp)}˚`
    let humid0 = document.getElementById('fHumidity0');
    humid0.textContent = ' ' + response.list[1].main.humidity + '%';


    let temp1 = document.getElementById('fTemp1');
    temp1.textContent= ` ${Math.round(response.list[2].main.temp)}˚`
    let humid1 = document.getElementById('fHumidity1');
    humid1.textContent = ' ' + response.list[2].main.humidity + '%';


    let temp2 = document.getElementById('fTemp2');
    temp2.textContent= ` ${Math.round(response.list[3].main.temp)}˚`
    let humid2 = document.getElementById('fHumidity2');
    humid2.textContent = ' ' + response.list[3].main.humidity + '%';


    let temp3 = document.getElementById('fTemp3');
    temp3.textContent= ` ${Math.round(response.list[4].main.temp)}˚`
    let humid3 = document.getElementById('fHumidity3');
    humid3.textContent = '  ' + response.list[4].main.humidity + '%';


    let temp4 = document.getElementById('fTemp4');
    temp4.textContent= ` ${Math.round(response.list[5].main.temp)}˚`
    let humid4 = document.getElementById('fHumidity4');
    humid4.textContent =  ' ' + response.list[5].main.humidity + '%';


    });
    
}  
 function showHistory(city){

        let li = document.createElement('li');
        li.textContent = city;
        container.appendChild(li);
        li.addEventListener('click', function (event){
            myWeather(event.target.textContent);
            console.log(event.target.tagName)
            console.log(event.target.textContent)
        });
} 

function saveCity() {
 console.log(city)
    localStorage.setItem('city', JSON.stringify(city));

}


function addList(text) {
    console.log(text)

    text.forEach(function (city){
        showHistory(city);
    })

};
    
    console.log(container);
    console.log(cityArray);

function resetHistory(event) {
    event.preventDefault();

    cityArray = [];

    localStorage.removeItem('cityname');

    document.location.reload();
 }

  
    searchButton.addEventListener('click', weatherDisplay);

    clearBtn.addEventListener('click', resetHistory);

   // document.addEventListener('click', pastSearch);

  

    