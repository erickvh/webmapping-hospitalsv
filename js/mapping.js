
var map = L.map('map').setView([13.71685, -89.20933], 11);
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
    
});


map.locate({
    setView: true,
    

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
*/

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
            "<button data='" + feature.properties.id + "' class='btn-especialidad-publicos btn-success' data-toggle='modal' data-target='#myModal'>" + "Ver Especialidades " +
            "</button>" +
            "</div>"

        );
    },

});
/*termina aqui layer publico*/
/*response con ajax de especialidades publicas*/
$("div").on("click", '.btn-especialidad-publicos', function () {
    var datos={ "id":$(this).attr("data")}
    $.ajax({
        type: "post",
        url: "/php/ejecucion.php",
        data: datos,

        success: function (response) {
         $(".modal-body").html(response);

        }
    });
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
            "<button  data='" + feature.properties.id + "' class='btn-especialidad-privados btn-success' data-toggle='modal' data-target='#myModal'>" + "Ver Especialidades" +
            "</button>" +
            "</div>"
        );
    },

});
/* Termina hasta aqui el layer privado*/

/*response para especialidades privadas*/
$("div").on("click", '.btn-especialidad-privados', function () {
    var datos={ "id":$(this).attr("data")}
    
    $.ajax({
        type: "post",
        url: "/php/ejecucion.php",
        data: datos,

        success: function (response) {
         $(".modal-body").html(response);

        }
    });
});
/*termina response de especialidades privadas

/*Creacion de layer isss*/
var myicon = L.icon({
    iconUrl: "../images/icons/isss.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

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
            "<button type=button  data='" + feature.properties.id + "' class='btn-especialidad-isss btn-success' data-toggle='modal' data-target='#myModal' >" + "Ver Especialidades" +
            "</button>" +
            "</div>"
        );
        
    },

});

/* Termina creacion de layer isss */
$("div").on("click", '.btn-especialidad-isss', function () {
    var datos={ "id":$(this).attr("data")}
    $.ajax({
        type: "post",
        url: "/php/ejecucion.php",
        data: datos,

        success: function (response) {
         $(".modal-body").html(response);

        }
    });
});


/* layer tematico prueba*/
var municipios = L.geoJSON(municipios, {

    onEachFeature: function (feature, layer) {
 
    },

});
/**
 * agregando mapas base y tematicos en json para poder servirlos 
 * con un controlador
 */
var mapasBase = {
    "Mapa Satelital": satelitalmap,
    "OpenStreetMap": openstreetmap,
    "Gran San Salvador": centroEstudioLayer, 
    
  
};

var mapasTematicos = { 
    "Hospitales":{
    "Hospitales publicos": publicosLayer,
    "Hospitales privados": privadosLayer,
    "Hospitales ISSS": isssLayer,
    "Zona de estudio": municipios,
}
};

/**
 * todos los elementos de control
 */
var options={
groupCheckBoxes:true,


};
openstreetmap.addTo(map);


L.control.ruler().addTo(map);
L.control.scale().addTo(map);
L.control.groupedLayers(mapasBase,mapasTematicos,options).addTo(map);
//L.control.layers(mapasBase, mapasTematicos).addTo(map);
L.Control.measureControl().addTo(map);