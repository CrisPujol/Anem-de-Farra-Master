
$("#region").on("change", function(){

  var region = $("#region").val()
  console.log(region)

  $.ajax({
    url: '/coord/' + region,
    type: 'GET',
    dataType: 'json'
    // data: {region: region},
  })
  .done(function(feast) {
    var coord = feast[0].coordRegion;
    var lat = coord[1];
    var lon = coord[0];
    
    $("#lat").val(lat);
    $("#lon").val(lon);
    
  })
  .fail(function() {
    console.log("error");
  })
  
  

})