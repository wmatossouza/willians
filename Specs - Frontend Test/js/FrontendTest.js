var ret = ''; 
var imgHtm = '';
function searchCity(){
	var city = $('#city').val();
	var APIkey = '76d1b43ba3695cfae59aa9f7dc9b4877';
	$.getJSON('http://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIkey, function(retorno) {
		var html = '';
		var htmlImg = '';
		ret = retorno;
		 html += '<div class="col-md-12 btn" style="margin-top: 45px" onclick="searchResult('+ retorno.city.id +')"> '+
	  				'<div class="col-md-4">'+
	  					'<span style="font-size: 40px">' + retorno.list[0].main.temp + 'ºC</span>'+
	  				'</div>'+
	  				'<div class="col-md-4">'+
	  					'<label style="font-size:30px; color:blue">' + retorno.city.name + ', ' + retorno.city.country + '</label><br>'+
	  					'<label style="font-size:15px;">Max</label>		<span style="color:red">' + retorno.list[0].main.temp_max +'</span><br>'+
	  					'<label style="font-size:15px;">Min</label>		<span style="color:blue">' + retorno.list[0].main.temp_min +'</span>'+
	  				'</div>'+
	  			'<div class="col-md-4">'
	  		if (retorno.list[0].weather[0].main == 'Rain'){
	  			htmlImg +=		'<img src="https://cdn1.iconfinder.com/data/icons/weather-1-12/33/heavy_rain-512.png" style="width:50px;heigth:50px"><br><br>'+
	  						'<span style="font-size:15px;">' + retorno.list[0].weather[0].description + '</span>'
	  		}else if (retorno.list[0].weather[0].main == 'Clouds'){
	  			htmlImg +=		'<img src="https://img2.gratispng.com/20180920/uhw/kisspng-cloud-computer-icons-rain-storm-lightning-two-clouds-svg-png-icon-free-download-5743-on-5ba32645892d49.2732425515374188215619.jpg" style="width:50px;heigth:50px"><br><br>'+
	  						'<span style="font-size:15px;">' + retorno.list[0].weather[0].description + '</span>'
			}else{
				htmlImg +=		'<img src="https://img2.gratispng.com/20180412/liq/kisspng-cloud-drawing-clip-art-cloud-5acf7306bc2a00.2200499815235448387707.jpg" style="width:50px;heigth:50px"><br><br>'+
	  						'<span style="font-size:15px;">' + retorno.list[0].weather[0].description + '</span>'
			}		
			imgHtm = htmlImg;
				
		$("#cards").html(html+htmlImg + '</div></div>');
		$("#cards").fadeIn('slow');

	}).fail(function() {
    alert( "Cidade não encontrada!");
    $('#city').val('');
    $('#city').focus();
  });
};

function searchResult(id){
	$("#cards").hide();
	$("#panelSearch").attr('style', 'heigth:100px');
	$("#labelSearch").hide();
	$("#headWather").html("<span>Weather in " + ret.city.name + ", " + ret.city.country + "</span><br><span style='font-size: 14px'>" + ret.list[0].dt_txt +"</span></div>");
	$("#headWather").fadeIn('slow');
	$("#panelResults").fadeIn('slow');
	$("#btnReturn").fadeIn('slow');
	var html = '';
	html = '<div class="col-md-12"><div class="row">'+
					'<div class="col-md-4">'+
					 	'<span style="font-size: 40px">' + ret.list[0].main.temp + 'ºC</span><br>'
						+ imgHtm +
					'</div>'+
				 '<div class="col-md-6">'+
				 	'<div class="col-md-3">'+
					 	'<span>Max</span><br>'+  
					 	'<span>Min</span><br>'+ 
					 	'<span>Sunrise</span><br>'+
					 	'<span>Sunset</span> '+
				 	'</div>'+
				 	'<div class="col-md-3">'+
					 	'<span style="color:red">' + ret.list[0].main.temp_max + '</span><br>'+
					 	'<span style="color:blue">' + ret.list[0].main.temp_min + '</span><br>'+
					 	'<span>' + ret.city.sunrise + '</span><br>'+
					 	'<span>' + ret.city.sunset + '</span><br>'+
					 '</div>'+	
				 '</div>'+
			'</div>'+
				'<div class="row" style="margin-top: 20px">'+
					'<div class="col-md-12">'+
		  				'<label>5 day weather forecast </label>'+
		  			'</div>'+
				'</div>'
				for (var i = 0 ; i <= 4; i++) {
		html+= '<div class="row panel panel-default" style="margin-top: 20px">'+
					'<div class="col-md-4">'+
						'<span>' + ret.list[i*8].dt_txt + '</span>'+
					'</div>'+
					'<div class="col-md-4">'
						+ imgHtm +
					'</div>'+
					'<div class="col-md-4">'+
						'<span style="color:red">'+ ret.list[i*8].main.temp_max +'ºC </span>   <span style="color:blue">' + ret.list[i*8].main.temp_min + 'ºC  </span>'+
					'</div>'+
				'</div>'
				}
		$("#body").attr('style', 'heigth:900px');		
		$("#resultsBody").html(html);
};