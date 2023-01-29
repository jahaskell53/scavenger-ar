  var ballCount = 0;
  var timer;
  var score = 0;
  var foundPlace = false;
  var gameDone = false;
  var scoreUpdated = false;

  function reachDestination() {
    const marker = document.getElementById("marker");
    marker.addEventListener("click", miniGame);

    function miniGame() {
      if (gameDone) {
        document.getElementById("marker").setAttribute("visible", false);
        return;
      }

      ballCount++;
      document.getElementById("count").innerText = "Balls: " + ballCount.toString();

      const marker = document.getElementById("marker");
      const parent = marker.parentNode;
      marker.parentNode.removeChild(marker);

      if (!scoreUpdated && ballCount >= 15) {
        score = score + 100;
        scoreUpdated = true;
        // clearInterval(timer);
        // document.getElementById("score").innerText = "Score: " + score;
        // document.getElementById("timer").innerText = "Time: 00:00";
        // document.getElementById("tint").style.opacity = 0.5;
        // gameDone = true;
        // foundPlace = false;
        // cnt = false;
        // destCount++;
        // return;
      }

      const newc = document.createElement("a-entity");
      randomX = Math.random() * 20 - 10;
      randomY = Math.random() * 20 - 10;
      randomZ = Math.random() * 20 - 10;
      newc.setAttribute("position", `${randomX} ${randomY} ${randomZ}`);
      newc.setAttribute("gltf-model", "#campfire");
      newc.id = `marker`;
      parent.appendChild(newc);

      newc.addEventListener("click", miniGame);
    }
  }

  getLocation();

  document.getElementById("tint").width = window.innerWidth;
  document.getElementById("tint").height = window.innerHeight;
  document.getElementById("tint").style.position = "absolute";

  let coordinateList = [];
  var firstDistance = 0;
  var cnt = false;
  const colorArray = [
    "#FF0000",
    "#FF0000",
    "#990066",
    "#660099",
    "#3300CC",
    "#0000FF",
  ];

  function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000;
    return d;
  }

  function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  }

  function getAvg(nums) {
    const total = nums.reduce((acc, c) => acc + c, 0);
    return total / nums.length;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getLocation() {
    if (!navigator.geolocation) {
      console.log("Geolocation API not supported by this browser.");
    } else {
      console.log("Checking location...");
      navigator.geolocation.getCurrentPosition(success, error);
    }
    setTimeout(getLocation, 1000);
  }

  function success(position) {
    if (foundPlace) {
      return;
    }
    let lat = round(position.coords.latitude, 4);
    let long = round(position.coords.longitude, 4);
    let distance = round(
      getDistanceFromLatLonInM(lat, long, targetLat, targetLong),
      2
    );

    if (!cnt) {
      firstDistance = distance;
      cnt = true;
    }

    if (coordinateList.length < 3) {
      coordinateList.push(distance);
    } else {
      coordinateList.shift();
      coordinateList.push(distance);
    }

    let averageDistance = getAvg(coordinateList);

    i = Math.floor((averageDistance / firstDistance) * 4);
    if (i >= 6) {
      i = 5;
    }
    console.log(i);
    if (i == 0 || i == 1) {
      ballCount = 0;
      document.getElementById("count").innerText = "Balls: " + ballCount.toString();
      document.getElementById("timer").innerText = "Time: 00:20";

      foundPlace = true;
      gameDone = false;
      document.getElementById("tint").style.opacity = 0;
      document.getElementById("marker").setAttribute("visible", true);

      function timer() {
        var sec = 20;
        timer = setInterval(function () {
          if (gameDone) {
            return
          }
          if (sec < 10) {
            document.getElementById("timer").innerHTML = "Time: 00:0" + sec;
          } else {
            document.getElementById("timer").innerHTML = "Time: 00:" + sec;
          }
          sec--;
          if (sec <= 0) {
            document.getElementById("tint").style.opacity = 0.5;
            document.getElementById("timer").innerText = "Time: 00:00";
            document.getElementById("marker").setAttribute("visible", false);
            gameDone = true;
            foundPlace = false;
            cnt = false;
            destCount++;
            clearInterval(timer);
            main();
          }
        }, 1000);
      }
      timer();
      reachDestination();
    }
    document.getElementById("tint").style.backgroundColor = colorArray[i];
  }

  function error() {
    console.log("Geolocation error!");
  }
  function popupOverlay(message) {
    document.querySelector("canvas").hidden = true;
    document.querySelector("canvas").style.opacity = 0;
    document.getElementById("overlay").hidden = false;
    document.getElementById("overlay-message").innerHTML = message;
  }
function removeOverlay() {
    document.querySelector("canvas").hidden = false;
    document.querySelector("canvas").style.opacity = 100;
    document.getElementById("overlay").hidden = true;
    document.getElementById("overlay-message").innerHTML = "";
  }

  var destCount = 0;
  var targetLat = 0;
  var targetLong = 0;

  /**
   * Parses the given URL into latitude and longitude pairs 
   * @param {String} url the url formatted as .../?entities=lat_lon,lat_lon,...,lat_lon 
   * @return {List[Dictionary]} a list of {'lat': lat, 'lon', lon} pairs 
   * 
   * For example:
   *  http://.../?entities=41.826835_-71.399710,41.827835_-71.399710
   *  becomes [{'lat': 41.826835, 'lon': -71.399710}, {'lat': 41.827835, 'lon': -71.399710}]
   */
  function parseURL(url) {
    let entities = [];
    var entities_url = url.split("=")[1];
    var lat_lon_list = entities_url.split(",");
    for (const lat_lon_str of lat_lon_list) {
      lat_lon = lat_lon_str.split('_');
      lat = parseFloat(lat_lon[0]);
      lon = parseFloat(lat_lon[1]);
      console.log(`(${lat}, ${lon})`);
      entities.push({ 'lat': lat, 'lon': lon });
    }
    return entities;
  }

  let showOnce = false;
  function main() {
    if (window.location.search == ''){
      console.log("Nothing here!");
      popupOverlay("Nothing here! Maybe try another link.");
      return;
    }
    else if (!showOnce){
        showOnce = true;
        setTimeout(removeOverlay, 5000);
        popupOverlay("Welcome and prepare to explore! This is a fully customized scavenger hunt game. The color of your screen will indicate how warm or cold you are to the next bonfire! Stay warm and play the minigames when you arrive to your destinations! Create hunts too and share with your friends");
    }
    var entities = parseURL(window.location.search);
    var numPoints = entities.length;
    if (destCount < numPoints) {
      console.log("destCount", destCount);
      getLocation();
      targetLat = entities[destCount].lat;
      targetLong = entities[destCount].lon;
    }
    else if (destCount === numPoints) {
      popupOverlay("Congratulations you made it to all the bonfires! Share the link with your friends or create more hunts! Hope you enjoyed");
      alert("GAME OVER");
    }
  }
  main();