    $(".error-msg").fadeOut(5000);

	function loadLocation () {
		navigator.geolocation.getCurrentPosition(viewMap,ViewError);
	}
	
	function viewMap (position) {
		const lon = position.coords.longitude;	
		const lat = position.coords.latitude;
		$("#lat").val(lat);
		$("#lon").val(lon);
		console.log("longitud:" + lon + "-" + "latitud:" + lat );
		$("#succes").removeClass("hidden");
    	$("#succes").fadeOut(1000);
	}
	
	function ViewError (error) {
		console.log(error.code);
	}	



