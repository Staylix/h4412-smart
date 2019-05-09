import * as mongoose from 'mongoose';
import axios, { AxiosRequestConfig } from 'axios';
import * as helpers from '@turf/helpers';
import center from '@turf/center';
import { POICategory } from './util';

const TypeTranslator = {
    "place_of_worship": POICategory.CHURCH,
    "theatre": POICategory.THEATRE,
    "clock": POICategory.PLACE,
    "viewpoint": POICategory.PLACE,
    "cathedral": POICategory.CHURCH,
    "chapel": POICategory.CHURCH,
    "church": POICategory.CHURCH,
    "temple": POICategory.CHURCH,
    "mosque": POICategory.CHURCH,
    "archeological_site": POICategory.PLACE,
    "castle": POICategory.PLACE,
    "memorial": POICategory.PLACE,
    "ship": POICategory.PLACE,
    "museum": POICategory.MUSEUM,
    // "restaurant": POICategory.RESTAURANT,
}

const OSM_TYPES = [
    { key: 'historic', value: 'archeological_site' },
    { key: 'historic', value: 'castle' },
    { key: 'historic', value: 'memorial' },
    { key: 'historic', value: 'ship' },
    { key: 'amenity', value: 'place_of_worship' },
    { key: 'amenity', value: 'theatre' },
    { key: 'amenity', value: 'clock' },
    // { key: 'amenity', value: 'restaurant' },
    { key: 'building', value: 'cathedral' },
    { key: 'building', value: 'chapel' },
    { key: 'building', value: 'church' },
    { key: 'building', value: 'temple' },
    { key: 'building', value: 'mosque' },
    { key: 'tourism', value: 'viewpoint' },
    { key: 'tourism', value: 'museum' }

]

//mongoose.connect("mongodb+srv://admin4412:PLDSmart12@cluster0-aye5s.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/database", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to db');
});

const OSM_OVERPASS: string = 'https://lz4.overpass-api.de/api/interpreter'

const config: AxiosRequestConfig = {
    url: OSM_OVERPASS,
    headers: {            
        'content-type': 'application/x-www-form-urlencoded'
    }
}

let LYON_BBOX = '45.713371,4.758453,45.804393,4.909859';
let types = '';
for (let i of OSM_TYPES) {
    types = types.concat(`\tnode["${i.key}"="${i.value}"](${LYON_BBOX});\n`)
    types = types.concat(`\tway["${i.key}"="${i.value}"](${LYON_BBOX});\n`)
    types = types.concat(`\trelation["${i.key}"="${i.value}"](${LYON_BBOX});\n`)
}
const query = `
[out:json][timeout:25];
(
${types}
);
// print results
out body;
>;
out skel qt;
`

console.log(query);

let PoIsNode = new Map();
let PoIsWay = new Map();
let PoIs = []

axios.post(OSM_OVERPASS, query , config)
    .then((data) => {
        // console.log(data.data);
        let elts = data.data.elements;
        for (let entry of elts) {
            if (entry.type === 'node') {
                PoIsNode.set(entry.id, entry);
            }

            if (entry.type === 'way') {
                PoIsWay.set(entry.id, entry);
            }
        }

        for (let entry of elts) {
            // console.log(entry);
            let e = handleEntry(entry);
            if (e) {
                PoIs.push(e);
            }
        }
        return PoIs;
    })
    .then(async (PoIs) => {
        for (let p of PoIs) {
            await db.collection('pointofinterests').insert(p);
        }
    })
    .then((e) => console.log("Import des données terminés.\nNombre de point d'intérêts: ", PoIs.length))
    .catch((e) => console.error(e));
;

let handleEntry = (entry) => {
    switch(entry.type) {
        case 'node':
            handleNode(entry);
            break;
        case 'way':
            return handleWay(entry);
        case 'relation':
            return handleRelation(entry);
    }
    return null;
}

let handleNode = (node) => {
    return {
        name: 'Point',
        serviceId: '00',
        category: '00',
        lastUpdated: new Date(),
        position: {
            latitude: node.lat,
            longitude: node.lon
        },
        source: 'osm'
    }
}

let handleWay = (way) => {
    if (way.nodes.length !== 0) {
        let coordinates = getCoordinatesFromNodes(way.nodes);
        if (way.tags) {
            if (way.tags.name) {
                let cat = handleCategory(way.tags);
                return {
                    name: way.tags.name,
                    serviceId: way.id,
                    category: cat,
                    lastUpdated: new Date(),
                    position: {
                        latitude: coordinates.geometry.coordinates[0],
                        longitude: coordinates.geometry.coordinates[1],
                    },
                    source: 'osm'
                }
            }
        }
    }
}

let handleRelation = (rel) => {
    if (rel.members.length !== 0) {
        let firstWay = PoIsWay.get(rel.members[0].ref);
        let coordinates = getCoordinatesFromNodes(firstWay.nodes);
        if(rel.tags) {
            if(rel.tags.name) {
                let cat = handleCategory(rel.tags);
                return {
                    name: rel.tags.name,
                    serviceId: rel.id,
                    category: cat,
                    lastUpdated: new Date(),
                    position: {
                        latitude: coordinates.geometry.coordinates[0],
                        longitude: coordinates.geometry.coordinates[1],
                    },
                    source: 'osm'
                }
            }
        }
    }
}

let handleCategory = (tags) => {
    for (let t of OSM_TYPES) {
        if (tags[t.key] && tags[t.key] === t.value) {
            return TypeTranslator[t.value];
        }
    }
}

let getCoordinatesFromNodes = (nodes) => {
    let pointArray = nodes.map((n) => {
        let node = PoIsNode.get(n);
        return helpers.point([node.lat, node.lon])
    });
    return center(helpers.featureCollection(pointArray));
}