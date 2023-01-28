getLocation();

document.getElementById("tint").width = window.innerWidth;
document.getElementById("tint").height = window.innerHeight;
document.getElementById("tint").backgroundColor = "#";
document.getElementById("tint").style.zIndex = "5";
document.getElementById("tint").style.position = "absolute";

let coordinateList = [];
var firstDistance = 0;
var cnt = false;
const colorArray = ['#FF0000', '#FF0000', '#990066', '#660099', '#3300CC', '#0000FF'];

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
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
    return deg * (Math.PI / 180)
}

function getLocation() {
    if (!navigator.geolocation) {
        console.log('Geolocation API not supported by this browser.');
    } else {
        console.log('Checking location...');
        navigator.geolocation.getCurrentPosition(success, error);
    }
    setTimeout(getLocation, 1000);
}

function success(position) {
    let lat = round(position.coords.latitude, 4);
    let long = round(position.coords.longitude, 4);
    let distance = round(getDistanceFromLatLonInM(lat, long, 41.826250, -71.401897), 2);

    if(!cnt) {
        firstDistance = distance;
        cnt = true;
    }

    if(coordinateList.length < 3) {
        coordinateList.push(distance);
    }
    else {
        coordinateList.shift();
        coordinateList.push(distance);
    }

    let averageDistance = getAvg(coordinateList);

    // let el_1 = document.getElementById('lat');
    // let el_2 = document.getElementById('long');
    // let el_3 = document.getElementById('distance');
    // let el_4 = document.getElementById('list');
    // el_1.innerHTML = lat;
    // el_2.innerHTML = long;
    // el_3.innerHTML = averageDistance;
    // el_4.innerHTML = coordinateList;
    
    console.log(averageDistance, firstDistance);
    i = Math.floor(averageDistance / (firstDistance + 0.00000000001) * 6);
    console.log(i);
    document.getElementById("tint").style.backgroundColor = colorArray[i];
}

function error() {
    console.log('Geolocation error!');
}