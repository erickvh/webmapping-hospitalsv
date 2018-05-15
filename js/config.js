
var serverWMS="http://localhost:8080/geoserver/pruebas/wms";
var serverOWS="http://localhost:8080/geoserver/pruebas/ows";

/*LAYERS NAMES */

/**
 * Layers base
 * Capas base pueden ser incluidas diferentes capas
 * de distintos servicios 
 */
var openstreetmapURL='https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
var satelital='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var centroEstudio="pruebas:municipios_poligonos";
/**
 * Layers tematicos
 * Capas base pueden ser incluidas diferentes capas
 * de distintos servicios 
 */
var hospitalesPublicos='pruebas:hospitales_publicos';
var hospitalesPrivados='pruebas:hospitales_privados';
var hospitalesISSS='pruebas:hospitales_isss';


/*tipo de imagen servicio wms*/
var tipoImagen='image/png';

/*parametros de consulta ows*/
var defaultParametersHospitalesPrivados = {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: hospitalesPrivados,
    maxFeatures: 200,
    outputFormat: 'text/javascript',
    format_options: 'callback: getJson'

};
var defaultParametersHospitalesPublicos = {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: hospitalesPublicos,
    maxFeatures: 200,
    outputFormat: 'text/javascript',
    format_options: 'callback: getJson'

};

var defaultParametersHospitalesISSS = {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: hospitalesISSS,
    maxFeatures: 200,
    outputFormat: 'text/javascript',
    format_options: 'callback: getJson'

};
