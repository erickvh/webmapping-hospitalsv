var map = L.map('map').setView([13.71685, -89.20933], 10.5);
map.on('locationerror', function (e) {
        alert("navegador no permite geolocalizacion o esta desactivado");;
    }

)

var you = L.icon({
    iconUrl: "../images/icons/you-are-here.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
var Localizacion;

map.on('locationfound', function (e) {
    L.marker(e.latlng, {
        icon: you,
    }).addTo(map).bindPopup("Tú estas aqui").openPopup();
    Localizacion=e;
});

console.log(Localizacion);

map.locate({
    setView: true,
    maxZoom: 12
});
/**
 * Layers para mapas base
 */
var openstreetmap = L.tileLayer(openstreetmapURL);
var satelitalmap = L.tileLayer(satelital);
var centroEstudioLayer = L.tileLayer.wms(serverWMS, {
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

var parameters = L.Util.extend(defaultParametersHospitalesISSS);

var json=
$.ajax({
    async: false,
    global:false,
    url: serverOWS + L.Util.getParamString(parameters),
    dataType: 'jsonp',
    jsonpCallback: 'getJson',
    success: function (data){
   

    }
});


/*
*/

/*inicia creacion del layer publicos*/
var myicon = L.icon({
    iconUrl: "../images/icons/publico.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

var publicosLayer = L.geoJSON(publicos, {
    pointToLayer:function (feature, latlng) {

        return L.marker(latlng, {
            icon: myicon
        });
    },
    onEachFeature: function (feature, layer) {
       
        layer.bindPopup("<p><b>" + feature.properties.hospital + "</b></p>" +
            "<p><b>Dirección: </b>" + feature.properties.direccion + "</p>" +
            "<p><b>Contactos</b></p>" +
            "<p><b>Telefono 1: </b>" + feature.properties.telefono_1 + "</p>" +
            ("<p><b>Telefono 2: </b>" + ((feature.properties.telefono_2 == null) ? "No Disponible" : feature.properties.telefono_2) + "</p>" +
                "<p><b> Telefono 3: </b>" + ((feature.properties.telefono_3 == null) ? "No Disponible" : feature.properties.telefono_3) + "</p>") +
            "<p><b>Rutas de buses: </b>" + feature.properties.ruta_bus + "</p>" +
            "<div class='centerdiv'>" +
            "<button data='" + feature.properties.id + "' class='btn-especialidad-publicos btn-success'>" + "Ver Especialidades " +
            "</button>" +
            "</div>"

        );
    },

});
/*termina aqui layer publico*/
/*response con ajax de especialidades publicas*/
$("div").on("click", '.btn-especialidad-publicos', function () {
    var id = $(this).attr("data");
    console.log(ID);



});
/* Termina response especialidades publicas*/


/*creacion de layer privado*/
var myicon = L.icon({
    iconUrl: "../images/icons/privado.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

var privadosLayer = L.geoJSON(privados, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: myicon
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<p><b>" + feature.properties.hospital + "</b></p>" +
            "<p><b>Dirección: </b>" + feature.properties.direccion + "</p>" +
            "<p><b>Contactos</b></p>" +
            "<p><b>Telefono 1: </b>" + feature.properties.telefono_1 + "</p>" +
            ("<p><b>Telefono 2: </b>" + ((feature.properties.telefono_2 == null) ? "No Disponible" : feature.properties.telefono_2) + "</p>" +
                "<p><b> Telefono 3: </b>" + ((feature.properties.telefono_3 == null) ? "No Disponible" : feature.properties.telefono_3) + "</p>") +
            "<p><b>Rutas de buses: </b>" + feature.properties.ruta_bus + "</p>" +
            "<div class='centerdiv'>" +
            "<button  data='" + feature.properties.id + "' class='btn-especialidad-privados btn-success'>" + "Ver Especialidades" +
            "</button>" +
            "</div>"
        );
    },

});
/* Termina hasta aqui el layer privado*/

/*response para especialidades publicas*/
$("div").on("click", '.btn-especialidad-privados', function () {
    var ID = $(this).attr("data");
    console.log(ID);
});
/*termina response de especialidades privadas

/*Creacion de layer isss*/
var myicon = L.icon({
    iconUrl: "../images/icons/isss.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
function calcularDistancia(){

    rad = function(x) {return x*Math.PI/180;}
   var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
   var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
   return d.toFixed(3); //Retorna tres decimales
    
}
var isssLayer = L.geoJSON(isss, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: myicon
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<p><b>" + feature.properties.hospital + "</b></p>" +
            "<p><b>Dirección: </b>" + feature.properties.direccion + "</p>" +
            "<p><b>Contactos</b></p>" +
            "<p><b>Telefono 1: </b>" + feature.properties.telefono_1 + "</p>" +
            ("<p><b>Telefono 2: </b>" + ((feature.properties.telefono_2 == null) ? "No Disponible" : feature.properties.telefono_2) + "</p>" +
                "<p><b> Telefono 3: </b>" + ((feature.properties.telefono_3 == null) ? "No Disponible" : feature.properties.telefono_3) + "</p>") +
            "<p><b>Rutas de buses: </b>" + feature.properties.ruta_bus + "</p>" +
            "<div class='centerdiv'>" +
            "<button type=button  data='" + feature.properties.id + "' class='btn-especialidad-isss btn-success' data-toggle='modal' data-target='#myModal'>" + "Ver Especialidades" +
            "</button>" +
            "</div>"
        );
    },

});

/* Termina creacion de layer isss */
$("div").on("click", '.btn-especialidad-isss', function () {
    var ID = $(this).attr("data");
    console.log(ID);
});


/**
 * agregando mapas base y tematicos en json para poder servirlos 
 * con un controlador
 */
var mapasBase = {
    "OpenStreetMap": openstreetmap,
    "Gran San Salvador": centroEstudioLayer,
    "Satelital": satelitalmap
};

var mapasTematicos = {
    "Hospitales publicos": publicosLayer,
    "Hospitales privados": privadosLayer,
    "Hospitales ISSS": isssLayer,
    "Zona de estudio": centroEstudioLayer,

};

/**
 * todos los elementos de control
 */

L.control.scale().addTo(map);
L.control.layers(mapasBase, mapasTematicos).addTo(map);