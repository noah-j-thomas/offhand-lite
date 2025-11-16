const time = document.getElementById("time");
const date = document.getElementById("date");
const temple = document.getElementById("temple");

function updateTimeDate(){
    // time
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hours12 = hours % 12 || 12;

    const minutesPadded = String(minutes).padStart(2, "0");
    const secondsPadded = String(seconds).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    time.textContent = `${hours12}:${minutesPadded}:${secondsPadded} ${ampm}`;

    // date
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = now.getMonth();
    const day = now.getDate();
    const year = now.getFullYear();

    const monthName = monthNames[month];

    date.textContent = `${monthName} ${day}, ${year}`;
}

function grabIp(){
    return fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => data.ip);
};

async function grabCity(ip){
    
    return fetch(`http://ip-api.com/json/${ip}`)
    .then(response => response.json())
    .then(data => {
        return{ 
        city: data.city,
        state: data.region
    }})
};


async function grabWeather(){
    const ip = await grabIp();
    const cityOb = await grabCity(ip);
    const city = cityOb.city;

    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
    const main = data.main;
    const tempF = Math.round(main.temp);
    const tempC = Math.round((tempF - 32) * 5 / 9);

    temple.textContent = (`${tempF}°F / ${tempC}°C`)
}

grabWeather();
updateTimeDate();
setInterval(updateTimeDate, 1000);
setInterval(grabWeather, 600000);