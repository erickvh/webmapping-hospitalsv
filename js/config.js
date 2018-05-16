
var serverWMS="http://localhost:8080/geoserver/mapping_sgg/wms";
var serverOWS="http://localhost:8080/geoserver/mapping_sgg/ows";

/*LAYERS NAMES */

/**
 * Layers base
 * Capas base pueden ser incluidas diferentes capas
 * de distintos servicios 
 */
var openstreetmapURL='https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
var satelital='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

var centroEstudio="mapping_sgg:municipios_poligonos";
/**
 * Layers tematicos
 * Capas base pueden ser incluidas diferentes capas
 * de distintos servicios 
 */
var hospitalesPublicos='mapping_sgg:hospitales_publicos';
var hospitalesPrivados='mapping_sgg:hospitales_privados';
var hospitalesISSS='mapping_sgg:hospitales_isss';


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
