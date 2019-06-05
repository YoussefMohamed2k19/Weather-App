window.addEventListener("load", () => {
      let long;
      let lat;
      let temperatureDescription = document.querySelector('.temperature-description');
      let temperatureDegree = document.querySelector('.temperature-degree');
      let locationTimezone = document.querySelector('.location-timezone');
      let temperatureSection = document.querySelector('.temperature');
      let windSpeed = document.querySelector('.wind-text');
      const temperatureSpan = document.querySelector('.temperature span');

      alert("Open Gps to allow site work,It's based on your geolocation.");
      if(navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/a6fe8c98d4b231bd4dfd327eb9b4e936/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
              console.log(data);
              const {temperature, summary, icon} = data.currently;
              // set DOM elements from api
              temperatureDegree.textContent = temperature;
              temperatureDescription.textContent = summary;
              locationTimezone.textContent = data.timezone;
              windSpeed.textContent = data.currently.windSpeed;
              // set formula for celsius
              let celsius = (temperature -32) * (5 / 9);
              //  set icons
              setIcons(icon, document.querySelector('.icon'));
              // change F to c
              document.getElementById("degree").textContent = Math.floor(celsius) + "°";
              let windspeed = data.currently.windSpeed * 1.852;
              document.getElementById("wind").textContent = Math.floor(windspeed) + " Km/h";
              /*  temperatureSection.addEventListener('click', () =>{
                  if(temperatureSpan.textContent =="F")
                  {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                  }else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                  }
                })*/


            });

        });


      }

      function setIcons(icon, iconID)
      {
        const skycons = new Skycons({ color:"white" });  //,{"resizeClear": true}
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
      }

});
