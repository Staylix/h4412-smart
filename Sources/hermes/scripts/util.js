"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
function getFirstImage(nameToSearch) {
    var googleImage = 'https://www.google.com/search?tbm=isch&q=';
    var url = googleImage + nameToSearch;
    return axios_1["default"].get(url)
        .then(function (data) {
        var dataString = data.data;
        var leftIndexOfFirstImage = dataString.indexOf("<img");
        var dataString2 = dataString.substring(leftIndexOfFirstImage, dataString.length);
        var rightIndex = dataString2.indexOf("width");
        var dataString3 = dataString2.substring(0, rightIndex);
        var il3 = dataString3.indexOf("src");
        var dataString4 = dataString3.substring(il3 + 5, dataString3.length - 2);
        //console.log( nameToSearch ,'is  ', dataString4);
        return dataString4;
    })["catch"](function (error) {
        return "ERROR";
    });
}
exports.getFirstImage = getFirstImage;
;
var POICategory;
(function (POICategory) {
    // RESTAURANT,
    POICategory[POICategory["MUSEUM"] = 0] = "MUSEUM";
    POICategory[POICategory["PLACE"] = 1] = "PLACE";
    POICategory[POICategory["THEATRE"] = 2] = "THEATRE";
    // STORE,
    // ACCOMODATION,
    // EQUIPMENT,
    POICategory[POICategory["CHURCH"] = 3] = "CHURCH";
})(POICategory = exports.POICategory || (exports.POICategory = {}));
