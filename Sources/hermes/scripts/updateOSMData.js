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
var helpers = require("@turf/helpers");
var center_1 = require("@turf/center");
var util_1 = require("./util");
var TypeTranslator = {
    "place_of_worship": util_1.POICategory.CHURCH,
    "theatre": util_1.POICategory.THEATRE,
    "clock": util_1.POICategory.PLACE,
    "viewpoint": util_1.POICategory.PLACE,
    "cathedral": util_1.POICategory.CHURCH,
    "chapel": util_1.POICategory.CHURCH,
    "church": util_1.POICategory.CHURCH,
    "temple": util_1.POICategory.CHURCH,
    "mosque": util_1.POICategory.CHURCH,
    "archeological_site": util_1.POICategory.PLACE,
    "castle": util_1.POICategory.PLACE,
    "memorial": util_1.POICategory.PLACE,
    "ship": util_1.POICategory.PLACE,
    "museum": util_1.POICategory.MUSEUM
};
var OSM_TYPES = [
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
];
//mongoose.connect("mongodb+srv://admin4412:PLDSmart12@cluster0-aye5s.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/database", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to db');
});
var OSM_OVERPASS = 'https://lz4.overpass-api.de/api/interpreter';
var config = {
    url: OSM_OVERPASS,
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
};
var LYON_BBOX = '45.713371,4.758453,45.804393,4.909859';
var types = '';
for (var _i = 0, OSM_TYPES_1 = OSM_TYPES; _i < OSM_TYPES_1.length; _i++) {
    var i = OSM_TYPES_1[_i];
    types = types.concat("\tnode[\"" + i.key + "\"=\"" + i.value + "\"](" + LYON_BBOX + ");\n");
    types = types.concat("\tway[\"" + i.key + "\"=\"" + i.value + "\"](" + LYON_BBOX + ");\n");
    types = types.concat("\trelation[\"" + i.key + "\"=\"" + i.value + "\"](" + LYON_BBOX + ");\n");
}
var query = "\n[out:json][timeout:25];\n(\n" + types + "\n);\n// print results\nout body;\n>;\nout skel qt;\n";
console.log(query);
var PoIsNode = new Map();
var PoIsWay = new Map();
var PoIs = [];
axios_1["default"].post(OSM_OVERPASS, query, config)
    .then(function (data) {
    // console.log(data.data);
    var elts = data.data.elements;
    for (var _i = 0, elts_1 = elts; _i < elts_1.length; _i++) {
        var entry = elts_1[_i];
        if (entry.type === 'node') {
            PoIsNode.set(entry.id, entry);
        }
        if (entry.type === 'way') {
            PoIsWay.set(entry.id, entry);
        }
    }
    for (var _a = 0, elts_2 = elts; _a < elts_2.length; _a++) {
        var entry = elts_2[_a];
        // console.log(entry);
        var e = handleEntry(entry);
        if (e) {
            PoIs.push(e);
        }
    }
    return PoIs;
})
    .then(function (PoIs) { return __awaiter(_this, void 0, void 0, function () {
    var _i, PoIs_1, p;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
    .then(function (e) { return console.log("Import des données terminés.\nNombre de point d'intérêts: ", PoIs.length); })["catch"](function (e) { return console.error(e); });
;
var handleEntry = function (entry) {
    switch (entry.type) {
        case 'node':
            handleNode(entry);
            break;
        case 'way':
            return handleWay(entry);
        case 'relation':
            return handleRelation(entry);
    }
    return null;
};
var handleNode = function (node) {
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
    };
};
var handleWay = function (way) {
    if (way.nodes.length !== 0) {
        var coordinates = getCoordinatesFromNodes(way.nodes);
        if (way.tags) {
            if (way.tags.name) {
                var cat = handleCategory(way.tags);
                return {
                    name: way.tags.name,
                    serviceId: way.id,
                    category: cat,
                    lastUpdated: new Date(),
                    position: {
                        latitude: coordinates.geometry.coordinates[0],
                        longitude: coordinates.geometry.coordinates[1]
                    },
                    source: 'osm'
                };
            }
        }
    }
};
var handleRelation = function (rel) {
    if (rel.members.length !== 0) {
        var firstWay = PoIsWay.get(rel.members[0].ref);
        var coordinates = getCoordinatesFromNodes(firstWay.nodes);
        if (rel.tags) {
            if (rel.tags.name) {
                var cat = handleCategory(rel.tags);
                return {
                    name: rel.tags.name,
                    serviceId: rel.id,
                    category: cat,
                    lastUpdated: new Date(),
                    position: {
                        latitude: coordinates.geometry.coordinates[0],
                        longitude: coordinates.geometry.coordinates[1]
                    },
                    source: 'osm'
                };
            }
        }
    }
};
var handleCategory = function (tags) {
    for (var _i = 0, OSM_TYPES_2 = OSM_TYPES; _i < OSM_TYPES_2.length; _i++) {
        var t = OSM_TYPES_2[_i];
        if (tags[t.key] && tags[t.key] === t.value) {
            return TypeTranslator[t.value];
        }
    }
};
var getCoordinatesFromNodes = function (nodes) {
    var pointArray = nodes.map(function (n) {
        var node = PoIsNode.get(n);
        return helpers.point([node.lat, node.lon]);
    });
    return center_1["default"](helpers.featureCollection(pointArray));
};
