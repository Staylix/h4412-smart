import * as mongoose from 'mongoose';
import axios, { AxiosRequestConfig } from 'axios';
import { POICategory } from './util';


const TypeTranslator = {
    // "COMMERCE_ET_SERVICE": POICategory.STORE,
    // "HEBERGEMENT_LOCATIF": POICategory.ACCOMODATION,
    "PATRIMOINE_CULTUREL": POICategory.PLACE,
    // "EQUIPEMENT": POICategory.EQUIPMENT,
    // "RESTAURATION": POICategory.RESTAURANT,
}

//mongoose.connect("mongodb+srv://admin4412:PLDSmart12@cluster0-aye5s.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/database", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to db');
});

const URL_GRAND_LYON: string = 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=5000&request=GetFeature&typename=sit_sitra.sittourisme&SRSNAME=urn:ogc:def:crs:EPSG::4326'

const config: AxiosRequestConfig = {
    url: URL_GRAND_LYON,
}
axios.get(URL_GRAND_LYON, config)
    .then((data) => {
        let PoIs = [];
        for (let entry of data.data['features']) {
            const props = entry["properties"];
            const geom = entry["geometry"];

            if (props['type'] == "PATRIMOINE_CULTUREL") {
                PoIs.push({
                    name: props['nom'],
                    serviceId: props['id_sitra1'],
                    category: TypeTranslator[props['type']],
                    lastUpdated: props['last_update'],
                    position: {
                        latitude: geom["coordinates"][1],
                        longitude: geom["coordinates"][0],
                    },
                    source: 'grandlyon',
                });
            }

        }
        return PoIs;
    })
    .then(async (PoIs) => {
        console.log('number of pois: ', PoIs.length);
        for (let p of PoIs) {
            await db.collection('pointofinterests').insert(p);
        }
    })
    .then((e) => console.log("123165"))
    .catch((e) => console.error(e));
;
