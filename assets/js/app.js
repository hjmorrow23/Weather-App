var monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];

function checkWeatherIcon(e) {
	var icon = "";	
	var weatherId = e.weather[0].id;
	console.log(weatherId);
	if (200 <= weatherId && weatherId < 300) {
		icon += "img/black-lightning.png";
	} else if (300 <= weatherId && weatherId < 600) {
		icon += "img/black-raindrop.png";
	} else if (600 <= weatherId && weatherId < 700) {
		icon += "img/black-snow.png";
	} else if (700 <= weatherId && weatherId < 800) {
		icon += "img/black-windy.png";
	} else if (800 <= weatherId && weatherId < 802) {
		icon += "img/black-sunny.png";
	} else if (802 <= weatherId && weatherId < 804) {
		icon += "img/black-partlycloudy.png";
	} else if (804 <= weatherId && weatherId < 900) {
		icon += "img/black-cloudy.png";
	} else {
		icon += "img/black-skull.png";
	}
	
	return icon;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getSearchLocation() {
	var city = $('.location').val();
	city = toTitleCase(city).replace(/\s+/g, '+');
	return city;
}
			
function oneDay(data) {
	var weather = data.list[0];
	var date= new Date(weather.dt_txt);
	console.log(weather.weather[0].id);
	var weatherHtml = '<h1 class="location">' + data.city.name + '</h1>';
	weatherHtml += '<ul class="seven-day">';
	weatherHtml += '<li class="day">';
	weatherHtml += '<h1 class="weekday">' + monthNames[date.getMonth()] + ' ' + date.getDate() + '</h1>';
	weatherHtml += '<img class="icon" src="' + checkWeatherIcon(weather) + '" alt="Design by Iconnice at Flaticon.com" />';
	weatherHtml += '<p class="temperature-heading">Temp &#8457</p>';
	weatherHtml += '<p class="temperature">' + Math.floor(weather.main.temp_max) + '/' +  Math.floor(weather.main.temp_min) + '</p>';
	weatherHtml += '<p class="wind-heading">Wind mph</p>';
	weatherHtml += '<p class="wind">' + Math.floor(weather.wind.speed) + '</p>';
	weatherHtml += '</li>';
	weatherHtml += '</ul>';
	$('.day-wrapper').html(weatherHtml);
}

function fiveDay(data) {
	var weatherHtml = '<h1 class="location">' + data.city.name + '</h1>';
	weatherHtml += '<ul class="seven-day">';
	$.each(data.list, function(i, weather) {
		var date= new Date(weather.dt_txt);
		if(i === 0 || i === 8 || i === 16 || i === 24 || i === 32) {
			weatherHtml += '<li class="day">';
			weatherHtml += '<h1 class="weekday">' + monthNames[date.getMonth()] + ' ' + date.getDate() + '</h1>';
			weatherHtml += '<img class="icon" src="' + checkWeatherIcon(weather) + '" alt="Design by Iconnice at Flaticon.com" />';
			weatherHtml += '<p class="temperature-heading">Temp &#8457</p>';
			weatherHtml += '<p class="temperature">' + Math.floor(weather.main.temp_max) + '/' +  Math.floor(weather.main.temp_min) + '</p>';
			weatherHtml += '<p class="wind-heading">Wind mph</p>';
			weatherHtml += '<p class="wind">' + Math.floor(weather.wind.speed) + '</p>';
			weatherHtml += '</li>';
		}
	});	
	weatherHtml += '</ul>';
	$('.day-wrapper').html(weatherHtml);
}


$('.search').click(function() {
	var city = getSearchLocation();
	console.log(city);
	$.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&units=imperial&APPID=f3ca74b01a93f4ec83050fe63dd88908', function(data) {
		console.log(data);
		
		oneDay(data);
		
		$('.one-day').click(function() {
			$(this).addClass('btn-active');
			$('.five-day').removeClass('btn-active');
			oneDay(data);
		});
		
		$('.five-day').click(function() {
			$(this).addClass('btn-active');
			$('.one-day').removeClass('btn-active');
			fiveDay(data);
		});
	});
});

$(".location").keypress(function(e) {
    if(e.which == 13) {
	    e.preventDefault();
        var city = getSearchLocation();
		console.log(city);
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&units=imperial&APPID=f3ca74b01a93f4ec83050fe63dd88908', function(data) {
			console.log(data);
			
			oneDay(data);
			
			$('.one-day').click(function() {
				$(this).addClass('btn-active');
				$('.five-day').removeClass('btn-active');
				oneDay(data);
			});
			
			$('.five-day').click(function() {
				$(this).addClass('btn-active');
				$('.one-day').removeClass('btn-active');
				fiveDay(data);
			});
		});
	}
});