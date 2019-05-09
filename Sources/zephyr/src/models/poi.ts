export interface IPosition {
    latitude: string;
    longitude: string;
}

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

export interface IPointOfInterest {
    _id: string;
    position: IPosition;
    name: string;
    serviceId: string;
    category: POICategory;
    lastUpdated: Date;
    siteURL: String;
    imageURL: String;
}

export class PointOfInterest implements IPointOfInterest {
    
    constructor(data?: Partial<IPointOfInterest>) {
        data = {
            _id: null,
            position: {
                latitude: null,
                longitude: null,
            },
            name: '',
            serviceId: '',
            category: null,
            lastUpdated: null,
            siteURL: null,
            imageURL: null,
            ...(data || {}),
        }

        this._id = data._id;
        this.category = data.category;
        this.lastUpdated = data.lastUpdated;
        this.name = data.name;
        this.serviceId = data.serviceId;
        this.position = data.position;
        this.siteURL = data.siteURL;
        this.imageURL = data.imageURL;
    }

    public _id: string;
    public position: IPosition; 
    public name: string;
    public serviceId: string;
    public category: POICategory;
    public lastUpdated: Date;
    public siteURL: String;
    public imageURL: String;
}