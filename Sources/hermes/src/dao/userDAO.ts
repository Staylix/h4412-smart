import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import User, {IUser, UserSchema} from '../model/user';

//FIND BY ID
export const userDAOFindById = (idToSearch) => {
  
    console.log('searchUserByID', idToSearch);
    return User.findById(idToSearch);
}

//FIND BY Name
export const userDAOFindUserByMail = (mailToSearch) => {
    
    return User.findOne({
        "email": mailToSearch
      }).then(
        (user) => {
          return user;
        }
      ).catch(
        (error) => {
          return error;
        }
      );
}

//UPDATE BY ID
export const userDAOUpdateUserById = (userId,userToUpdate) => {
  
    return User.findByIdAndUpdate(userId, userToUpdate, {new: true})
        .then((updated) => {
           return updated;
        }
        ).catch(
            (error) => {
              return error;
            }
        );
}         