import v4  from 'uuid/v4';
import { IPointOfInterest, POICategory } from '../model/poi'

export class PointOfInterest {
    
    constructor(data: Partial<IPointOfInterest>) {
        data = {
            id: v4(),
            position: null,
            name: '',
            serviceId: null,
            category: null,
            lastUpdated: null,
            ...(data || {}),
        }

        this.category = data.category;
        this.lastUpdated = data.lastUpdated;
        this.name = data.name;
        this.serviceId = data.serviceId;
    }

    public position: Position; 
    public name: string;
    public serviceId: string;
    public category: POICategory;
    public lastUpdated: Date;
}