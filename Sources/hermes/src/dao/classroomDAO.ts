import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Classroom,{IClassroom, ClassroomSchema} from '../model/classroom';

//FIND BY ID
export const classroomDAOFindById = (idToSearch) => {
  
    return Classroom.findOne({
        "_id": idToSearch
      }).then(
        (classroom) => {
          return classroom;
        }
      ).catch(
        (error) => {
          return error;
        }
      );
}

//UPDATE BY ID
export const classroomDAOUpdateClassroomById = (classroomId, classroomToUpdate) => {
   
    return Classroom.updateOne({"_id": classroomId}, classroomToUpdate, {new: true})
        .then((classroom) => {
           return classroom;
        }
        ).catch(
            (error) => {
              return error;
            }
        );
}      
