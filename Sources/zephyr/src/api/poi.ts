import axios from 'axios';
import { PointOfInterest, POICategory } from '../models/poi';
import { globalURL } from '../constants/themes';

const baseURL = globalURL + '/poi';

export function getPointOfInterest(token: string){
    return axios.get(baseURL, {
        headers: {'Authorization': "bearer "+ token}
    }).then((data) => {
        return data.data.pois.map((poi) => new PointOfInterest(poi));
    })
}

export function getSomePointOfInterest(token: string, keyword: string){
    return axios.get(baseURL + '/filter/'+ keyword , {
        headers: {'Authorization': "bearer "+ token}
    }).then((data) => {       
        if(data) {
            return data.data.map((poi) => new PointOfInterest(poi));
        }
    })
}

export function addPointOfInterest(token: string, poi: any, category:POICategory){
    let data = {
        poi : { 
            name: poi.name,
           position: {
               latitude: poi.latitude,
               longitude: poi.longitude 
           },
           category: category,
           idGrandLyon: "",
           lastUpdateDate: new Date(),
           siteURL: poi.siteURL,
           imageURL: poi.imageURL
        }
    };
    return axios.post(baseURL, data, {
        headers: {'Authorization': "bearer "+ token}
    });
}