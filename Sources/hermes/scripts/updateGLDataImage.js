"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var mongoose = require("mongoose");
var axios_1 = require("axios");
var util_1 = require("./util");
var TypeTranslator = {
    // "COMMERCE_ET_SERVICE": POICategory.STORE,
    // "HEBERGEMENT_LOCATIF": POICategory.ACCOMODATION,
    "PATRIMOINE_CULTUREL": util_1.POICategory.PLACE
};
// mongoose.connect("mongodb+srv://admin4412:PLDSmart12@cluster0-aye5s.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/database", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to db');
});
var URL_GRAND_LYON = 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=5000&request=GetFeature&typename=sit_sitra.sittourisme&SRSNAME=urn:ogc:def:crs:EPSG::4326';
var config = {
    url: URL_GRAND_LYON
};
axios_1["default"].get(URL_GRAND_LYON, config)
    .then(function (data) {
    var PoIs = [];
    var imagePromises = [];
    for (var _i = 0, _a = data.data['features']; _i < _a.length; _i++) {
        var entry = _a[_i];
        var props = entry["properties"];
        if (props['type'] == "PATRIMOINE_CULTUREL") {
            imagePromises.push(util_1.getFirstImage(props['nom']));
        }
    }
    var cpt = 0;
    Promise.all(imagePromises).then(function (images) {
        console.log(images);
        for (var _i = 0, _a = data.data['features']; _i < _a.length; _i++) {
            var entry = _a[_i];
            var props = entry["properties"];
            var geom = entry["geometry"];
            if (props['type'] == "PATRIMOINE_CULTUREL") {
                PoIs.push({
                    name: props['nom'],
                    serviceId: props['id_sitra1'],
                    category: TypeTranslator[props['type']],
                    lastUpdated: props['last_update'],
                    position: {
                        latitude: geom["coordinates"][1],
                        longitude: geom["coordinates"][0]
                    },
                    imageURL: images[cpt]
                });
                cpt++;
            }
        }
        return PoIs;
    }).then(function (PoIs) { return __awaiter(_this, void 0, void 0, function () {
        var _i, PoIs_1, p;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('number of pois: ', PoIs.length);
                    _i = 0, PoIs_1 = PoIs;
                    _a.label = 1;
                case 1:
                    if (!(_i < PoIs_1.length)) return [3 /*break*/, 4];
                    p = PoIs_1[_i];
                    return [4 /*yield*/, db.collection('pointofinterests').insert(p)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); })
        .then(function (e) { return console.log("123165"); })["catch"](function (e) { return console.error(e); });
});
