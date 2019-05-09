import {userDAOFindById} from '../dao/userDAO'
import axios, { AxiosRequestConfig } from 'axios';

export const findUserId = (req, res, next) => {
    
    var user = userDAOFindById(req.params.id).then(
        (user) => {
           if(user.firstName !== undefined) //monkey way to test if this is an error
           {
                return res.status(200).json(user);
           }
           else
           {
                return res.status(500).json({
                    error: "Error when searching user in database"
                });
           }
        }
    );
}

export const getImageFromName = (req, res, next) => {
    const googleImage = 'https://www.google.com/search?tbm=isch&q=' ;
    
    let url = googleImage + req.params.imageName;
    
    //console.log(url);

    const config: AxiosRequestConfig = {
        url: url,
    }

    axios.get(url)
    .then((data) => {
        
       // console.log(data.data);
        
        let dataString = data.data;
        let leftIndexOfFirstImage = dataString.indexOf("<img");

        //console.log(dataString);
        //console.log(leftIndexOfFirstImage);
        let dataString2 = dataString.substring(leftIndexOfFirstImage, dataString.length);

        //console.log(dataString2);

        let rightIndex = dataString2.indexOf("width");
        //console.log(rightIndex);

        let dataString3 =  dataString2.substring(0, rightIndex);
        //console.log(dataString3);

        let il3 = dataString3.indexOf("src");
        let dataString4 = dataString3.substring(il3+5, dataString3.length-2);
        //console.log(dataString4);

        return res.status(200).json({
            message: dataString4
        });    
    })
    .catch(
        (error) => {
            //console.log(error);
            return res.status(500).json({
               // error : error
            });           
        }
    )
}