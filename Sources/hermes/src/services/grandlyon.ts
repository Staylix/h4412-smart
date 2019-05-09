import axios, { AxiosRequestConfig } from 'axios';
import { POICategory, IPointOfInterest } from '../model/poi';

export type Translator<T extends string> = {
    [K in T]: string;
};

const TypeTranslator = {
    // "COMMERCE_ET_SERVICE":  POICategory.STORE,
    // "HEBERGEMENT_LOCATIF":  POICategory.ACCOMODATION,
    "PATRIMOINE_CULTUREL":  POICategory.PLACE,
    // "EQUIPEMENT":           POICategory.EQUIPMENT,
    // "RESTAURATION":         POICategory.RESTAURANT,
}

export class GrandLyon {

    protected URL_GRAND_LYON: string = 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=50&request=GetFeature&typename=sit_sitra.sittourisme&SRSNAME=urn:ogc:def:crs:EPSG::4326'

    constructor () { }

    getRawDataGrandLyon(): Promise<IPointOfInterest[]> {
        const config: AxiosRequestConfig = {
            url: this.URL_GRAND_LYON,
        }
        return axios.get(this.URL_GRAND_LYON, config)
            .then((data) => {
                let PoIs = [];
                for (let entry of data.data['features']) {
                    const props = entry["properties"];
                    const geom = entry["geometry"];
                    
                    PoIs.push({
                        name: props['nom'],
                        serviceId: props['id_sitra1'],
                        category: TypeTranslator[props['type']],
                        lastUpdated: props['last_update'],
                        position: {
                            latitude: geom["coordinates"][0],
                            longitude: geom["coordinates"][1],
                        }
                    });

                }
                return PoIs;
            })
        ;
    }
}