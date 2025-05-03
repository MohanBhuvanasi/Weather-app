const WeatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="de25ff19603b0a22f0251a418b65d2a6";

WeatherForm.addEventListener("submit",async event =>{
    event.preventDefault();
    const city=cityInput.value;

    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displyWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error)
            displyError(error);
        }
        
    }
    else{
        displyError("please enter a city");
    }
     

});
async function getWeatherData(city) {

    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiurl);
    if(!response.ok){
        throw new Error("could mot fetch weather data");
    }
    return await response.json();
    
}
function displyWeatherInfo(data){
    
    const {name: city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;
    
    card.textContent="";
    card.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const Emoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${((temp-273.15)*(9/5)+32).toFixed(1)} deg F`;
    humidityDisplay.textContent=`Humidity:${humidity}%`;
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    cityDisplay.classList.add("cityDisplay");
    descDisplay.textContent=description;
    descDisplay.classList.add("descDisplay");
    Emoji.textContent=getWeatherEmoji(id);
    Emoji.classList.add("Emoji");






    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(Emoji);
    







    

}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200 && weatherId<300):
            return "⛈️";
        case(weatherId>=300 && weatherId<400):
            return "🌧️";
        case(weatherId>=500 && weatherId<600):
            return "🌧️";
        case(weatherId>=600 && weatherId<700):
            return "❄️";
        case(weatherId>=700 && weatherId<800):
            return "🌫️";
        case(weatherId==800):
            return "☀️";
        case(weatherId>=801 && weatherId<810):
            return "☁️";
        default:
            return "❓";




    }


}
function displyError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}

