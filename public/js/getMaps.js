

  function initMap() {
  const lng= Number($("#coordRegion").attr("data-lon"));
  const lat= Number($("#coordRegion").attr("data-lat"));
  
  const coordFeast = { lat, lng }

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: coordFeast
  });

  const marker = new google.maps.Marker({
    position: coordFeast,
    map: map
  });
}