

  function initMap() {
  var lng= Number($("#coordRegion").attr("data-lon"));
  var lat= Number($("#coordRegion").attr("data-lat"));
  
  var coordFeast = { lat, lng }

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: coordFeast
  });

  var marker = new google.maps.Marker({
    position: coordFeast,
    map: map
  });
}