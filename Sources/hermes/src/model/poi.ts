import * as mongoose from 'mongoose';

export interface IPosition {
    latitude: string;
    longitude: string;
}

export const Position: mongoose.Schema = new mongoose.Schema({
    latitude: String,
    longitude: String,
});

export enum POICategory {
    // RESTAURANT,
    MUSEUM,
    PLACE,
    THEATRE,
    // STORE,
    // ACCOMODATION,
    // EQUIPMENT,
}

export interface IPointOfInterest extends mongoose.Document {
    position: IPosition;
    name: string;
    serviceId: string;
    category: POICategory;
    lastUpdated: Date;
    siteURL?: String;
    imageURL?: String;
}

export const PointOfInterestSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    position: Position,
    category: { type: POICategory, enum: POICategory },
    idGrandLyon: String,
    lastUpdateDate: Date,
    siteURL: String,
    imageURL: String
});

const PointOfInterest = mongoose.model<IPointOfInterest>('PointOfInterest', PointOfInterestSchema);
export default PointOfInterest;
