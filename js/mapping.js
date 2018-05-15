var map=L.map('map').setView([13.71685, -89.20933],10.5);
/**
 * Layers para mapas base
 */
var openstreetmap=L.tileLayer(openstreetmapURL);
var satelitalmap=L.tileLayer(satelital);
var centroEstudioLayer= L.tileLayer.wms(serverWMS,{
        layers: centroEstudio,
        format: tipoImagen,
        transparent: true
        

});
openstreetmap.addTo(map);
/*obtenidos por wms*/
/**
 * Layers para mapas tematicos
 */
 /*
 var  publicosLayer= L.tileLayer.wms(serverWMS,{
        layers:hospitalesPublicos,
        format: tipoImagen,
        transparent: true

});

var  privadosLayer= L.tileLayer.wms(serverWMS,{
    layers:hospitalesPrivados,
    format: tipoImagen,
    transparent: true


});

var  isssLayer= L.tileLayer.wms(serverWMS,{
    layers:hospitalesISSS,
    format: tipoImagen,
    transparent: true
});
*/
/*
var parameters = L.Util.extend(defaultParametersHospitalesISSS);

$.ajax({
    url: serverOWS + L.Util.getParamString(parameters),
    dataType: 'jsonp',
    jsonpCallback: 'getJson',
    success: manejoJSON
});

function manejoJSON(data){
    console.log(data);
    var layerISSS= L.geoJSON(data).addTo(map);

       
}
*/

var myicon=L.icon({
iconUrl: "../images/icons/publico.png",
iconSize: [32, 37],
iconAnchor: [16, 37],
popupAnchor: [0, -28]
});

var publicosLayer= L.geoJSON(publicos,{
    pointToLayer: function(feature,latlng){
        return L.marker(latlng,{
            icon:myicon
        });
    },
    onEachFeature: function(feature,layer){
        layer.bindPopup("<p>"+feature.properties.HOSPITAL+ "</p>");
    },

});

var myicon=L.icon({
    iconUrl: "../images/icons/privado.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
    });
    
    var privadosLayer= L.geoJSON(privados,{
        pointToLayer: function(feature,latlng){
            return L.marker(latlng,{
                icon:myicon
            });
        },
        onEachFeature: function(feature,layer){
            layer.bindPopup("<p>"+feature.properties.hospital+ "</p>"
            +"<p>"+feature.properties.direccion+ "</p>"
        );
        },
    
    });

    var myicon=L.icon({
        iconUrl: "../images/icons/isss.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37],
        popupAnchor: [0, -28]
        });
        
        var isssLayer= L.geoJSON(isss,{
            pointToLayer: function(feature,latlng){
                return L.marker(latlng,{
                    icon:myicon
                });
            },
            onEachFeature: function(feature,layer){
                layer.bindPopup("<p>"+feature.properties.HOSPITAL+ "</p>"+"<p>"+feature.properties.DIRECCION+ "</p>");
            },
        
        });
        
/**
 * agregando mapas base y tematicos en json para poder servirlos 
 * con un controlador
 */
var mapasBase={
    "OpenStreetMap":openstreetmap,
    "Gran San Salvador":centroEstudioLayer,
    "Satelital": satelitalmap
};

    var mapasTematicos={
    "Hospitales publicos": publicosLayer,
    "Hospitales privados": privadosLayer,
    "Hospitales ISSS": isssLayer,
     "Zona de estudio": centroEstudioLayer,
   
};

/**
 * todos los elementos de control
 */

L.control.scale().addTo(map);
L.control.layers(mapasBase,mapasTematicos).addTo(map);

 


    



