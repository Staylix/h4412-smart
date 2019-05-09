import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Tour, {ITour, TourSchema} from '../model/tour';

//TODO

//FIND BY ID
export const tourDAOFindById = (idToSearch) => {
  
    return Tour.findOne({
        "_id": idToSearch
      }).then(
        (tour) => {         
          return tour;
        }
      ).catch(
        (error) => {
          return error;
        }
      );
}

export const tourDAOGetTourWithStep = (idToSearch) => {

    return Tour.findById(idToSearch)
        .populate('idsStep')
        .then((tour) => {
            return tour;
        }).catch(
            (error) => {
              return error;
            }
          );
    ;
}