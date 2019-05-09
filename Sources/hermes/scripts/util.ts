import axios, { AxiosRequestConfig } from 'axios';

export function getFirstImage (nameToSearch)  {
    const googleImage = 'https://www.google.com/search?tbm=isch&q=' ;
    
    let url = googleImage + nameToSearch;
    
    return axios.get(url)
        .then((data) => {
            
            let dataString = data.data;
            let leftIndexOfFirstImage = dataString.indexOf("<img");
        
            let dataString2 = dataString.substring(leftIndexOfFirstImage, dataString.length);        

            let rightIndex = dataString2.indexOf("width");   

            let dataString3 =  dataString2.substring(0, rightIndex);

            let il3 = dataString3.indexOf("src");
            let dataString4 = dataString3.substring(il3+5, dataString3.length-2);     
            //console.log( nameToSearch ,'is  ', dataString4);
            return dataString4;  
        })
        .catch(
            (error) => {
                return "ERROR"         
            }
        )
};

export enum POICategory {
    // RESTAURANT,
    MUSEUM,
    PLACE,
    THEATRE,
    // STORE,
    // ACCOMODATION,
    // EQUIPMENT,
    CHURCH,
}
