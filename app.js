window.addEventListener("load", () => {
      let long;
      let lat;
      let temperatureDescription = document.querySelector('.temperature-description');
      let temperatureDegree = document.querySelector('.temperature-degree');
      let locationTimezone = document.querySelector('.location-timezone');
      let temperatureSection = document.querySelector('.temperature');
      const temperatureSpan = document.querySelector('.temperature span');

      alert("Open Gps to allow site work,Provide information based on your geolocation.");
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
              // set formula for celsius
              let celsius = (temperature -32) * (5 / 9);
              //  set icons
              setIcons(icon, document.querySelector('.icon'));
              // change F to c
              document.getElementById("degree").textContent = Math.floor(celsius) + "°";
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
                var $windText = $("#wind-text");
                function dataHandler(data)
                {
                  dataString = JSON.stringify(data);
                  if (data.main.temp && data.sys)
                  {

                    // display wind speed
                    if (data.wind)
                    {
                      var knots = data.wind.speed * 1.9438445;
                      var km = knots * 1.852;
                      $windText.html(km.toFixed(1) + " Km/h");
                    }
                  }
                }

                function getWeather(locdata)
                {
                  console.log("getWeather has been called.")
                  var lat = locdata.lat;
                  var lon = locdata.lon;
                  var apiURI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6c788c55fe75c1f415d3cfdc814d0218";

                  if (locdata)
                    {
                      console.log("success");
                      $("#city-text").html(locdata.city );
                    } else{
                    console.log("fail");}

                  //call weather api for weather data
                  console.log("success getWeather");
                  console.log(apiURI);
                  return $.ajax({
                    url: apiURI,
                    dataType: "json",
                    type: "GET",
                    async: "true",
                  }).done(dataHandler);
                }

                var counter = 0;

                function getLocation()
                {
                  console.log("Update# " + counter++);

                  //call location api for location data
                  return $.ajax
                  ({
                    url: "http://ip-api.com/json",
                    dataType: "json",
                    type: "GET",
                    async: "true",
                  });
                }
                var updateInterval = setInterval(getLocation().done(getWeather), 300000);


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
