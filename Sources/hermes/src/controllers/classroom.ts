import Classroom from '../model/classroom'
import User, { IUser } from '../model/user'
import Tour from '../model/tour'
import { signUp } from './user';
import { classroomDAOFindById, classroomDAOUpdateClassroomById } from '../dao/classroomDAO'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { tourDAOFindById } from '../dao/tourDAO';


export const createClassroom = (req, res, next) => {
  //Important : createAClassroom and add it to the teacher's classrooms
  const classroom = new Classroom(req.body.classroom);

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'hexafterwork');
  const userId = decodedToken.userId;

  classroom.save().then(
    (classroom) => {
      console.log('classroom', classroom);

      User.findOne({
        "_id": userId
      }).then(
        (user) => {
          user.idsClassroom.push(classroom["_id"]);
          User.updateOne({ "_id": userId }, user).then(
            () => {
              res.status(200).json({
                message: 'Classroom saved successfully',
                classroom: classroom
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        }
      ).catch(
        (error) => {
          return res.status(404).json({
            error: error
          });
        }
      );
    }).catch(
      (error) => {
        return res.status(400).json({
          error: error
        });
      }
    );
}

export const getAllClassroom = (req, res, next) => {
  Classroom.find({}).then(
    (classroom) => {
      res.status(200).json({
        classroom: classroom
      });
    }).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
}

export const getClassroomById = (req, res, next) => {
  Classroom.findOne({
    "_id": req.params.id
  }).then(
    (classroom) => {
      res.status(200).json(classroom);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}

export const modifyClassroomById = (req, res, next) => {

  Classroom.updateOne({ "_id": req.params.id }, req.body.classroom).then(
    () => {
      res.status(201).json({
        message: 'Classroom updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

export const deleteClassroomById = (req, res, next) => {

  //has to delete classroom & remove it to the user's list of classrooms
  let idClassroom = req.params.id;

  Classroom.deleteOne({ "_id": idClassroom }).then(
    () => {

      User.find({ "idsClassroom": idClassroom }).then(
        (users) => {

          users.forEach((user) => {

            //remove idClassroom from the user idsClassroom
            let indexOfIdClassroom = user.idsClassroom.indexOf(idClassroom);

            if (indexOfIdClassroom > -1) {
              user.idsClassroom.splice(indexOfIdClassroom, 1);
            }
          });



          let updateUserPromises = [];

          users.forEach((user) => {
            //console.log("toto  ", user);
            updateUserPromises.push(
              User.updateOne({ "_id": user["_id"] }, user)
            )
          });

          Promise.all(updateUserPromises).then(function (values) {
            //console.log(values);
            return res.status(200).json({
              message: 'Classroom deleted successfully'
            });
          });


          /*res.status(200).json({
            message: 'Classroom deleted successfully'
          });*/
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: "Could not find users that has the deleted classroom"
          });
        }
      )
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

export const addUserToClass = (req, res, next) => {
  //need password, email, isProf, firstName, lastName
  //if the user is already defined use  & update it, if not just create a new user
  User.findOne({
    "email": req.body.email
  }).then(
    (user) => {
      if (user == null) {
        console.log("Thats a new user");
        bcrypt.hash(req.body.password, 10).then(
          (hash) => {
            const user: IUser = new User({
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              password: hash,
              isProf: req.body.isProf,
              idsClassroom: [req.params.id],
              idsTour: [],
            });
            //console.log(user);
            user.save().then(
              (user) => {
                let userId = user["id"];
                Classroom.findOne({
                  "_id": req.params.id
                }).then(
                  (classroom) => {

                    classroom.idsUser.push(userId);
                    Classroom.updateOne({ "_id": req.params.id }, classroom, { new: true }).then(
                      (status) => {
                        return res.status(200).json({ classroom, user });
                      }
                    ).catch(
                      (error) => {
                        return res.status(404).json({
                          error: error
                        });
                      }
                    );
                  }
                ).catch(
                  (error) => {
                    return res.status(404).json({
                      error: error
                    });
                  }
                );
              }
            ).catch(
              (error) => {
                res.status(500).json({
                  error: error
                });
              }
            );
          }
        )
      } else {
        console.log("User already exists");
        let userId = user["id"];

        let userAlreadyInThisClassroom = user.idsClassroom.find(id => id == req.params.id);

        //IS THE USER ALREADY IN THE CLASSROOM ?
        if (userAlreadyInThisClassroom === undefined) {
          Classroom.findOne({
            "_id": req.params.id
          }).then(
            (classroom) => {
              classroom.idsUser.push(userId);
              Classroom.updateOne({ "_id": req.params.id }, classroom, { new: true }).then(
                (classroom) => {
                  user.idsClassroom.push(req.params.id);
                  //console.log(user);
                  User.findByIdAndUpdate(userId, user)
                    .then((user) => {
                      res.json({
                        status: 'User & Classroom successfully Updated',
                        user
                      })
                    });
                }
              ).catch(
                (error) => {
                  return res.status(404).json({
                    error: error
                  });
                }
              );
            }
          ).catch(
            (error) => {
              return res.status(404).json({
                error: error
              });
            }
          );
        } else {
          return res.status(409).json({
            status: 'User is already in this classroom'
          })
        }
      }
    }
  ).catch(
    (error) => {
      return res.status(404).json({
        error: error
      });
    }
  );
}

export const addTourToClass = (req, res, next) => {

  //add tour for the teacher --> done in create tour
  //add tour for the students  --> no, l'idee est abandonnee, on passe par classroom
  //add tour to the classroom --> uniquement cela

  let idTour = req.body.idTour;
  let idClassroom = req.body.idClassroom;

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'hexafterwork');
  const userId = decodedToken.userId;

  let myTour = tourDAOFindById(idTour).then(
    (tour) => {
      if (tour !== undefined && tour !== null && tour.idAuthor !== undefined && tour.idAuthor == userId) {

        let myClassroom = classroomDAOFindById(idClassroom).then(
          (classroom) => {
            if (classroom["_id"] !== undefined) //monkey way to test if this is an error
            {

              let isAlreadyHere = classroom.idsTour.find(function (element) {
                return (element == idTour);
              });

              if (isAlreadyHere === undefined) //means that the tour is not already here
              {
                classroom.idsTour.push(idTour);

                //need to update tour

                Classroom.updateOne({ "_id": idClassroom }, classroom)
                  .then((classroom) => {
                    return res.status(200).json({
                      message: "Tour added to the Classroom",
                      idTour: idTour,
                      classroom: classroom
                    });
                  }
                  ).catch(
                    (error) => {
                      return res.status(500).json({
                        error: "Error when updating user in database"
                      });
                    }
                  );
              } else {
                return res.status(409).json({
                  error: "Tour is already affected to this classroom"
                });
              }
            }
            else {
              return res.status(500).json({
                error: "Error when searching user in database"
              });
            }
          }
        )
      } else {
        return res.status(409).json({
          error: "User is not the Author of the Tour"
        });
      }
    })
}

export const getClassroomOfUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'hexafterwork');
  const userId = decodedToken.userId;

  User.findOne({
    "_id": userId
  })
    .populate({
      path: 'idsClassroom',
      model: 'Classroom',
      populate: {
        path: 'idsTour',
        model: 'Tour',
        populate: {
          path: 'idsStep',
          model: 'Step',
          populate: {
            path: 'idPoi',
            model: 'PointOfInterest'
          }
        }
      }
    })
    .populate({
      path: 'idsClassroom',
      model: 'Classroom',
      populate: {
        path: 'idsUser',
        model: 'User',
        select: 'email firstName lastName'
      }
    })
    .then(
      (users) => {
        //console.log(users);            
        res.status(200).json({
          classrooms: users.idsClassroom
        });
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}

export const getUsersOfClassroom = (req, res, next) => {

  let idClassroom = req.params.idClassroom;

  Classroom.findOne({
    "_id": idClassroom
  })
    .populate('idsUser')
    .then(
      (classroom) => {
        if (classroom["_id"] !== undefined) //monkey way to test if this is an error
        {
          //console.log(classroom);
          res.status(200).json({
            users: classroom.idsUser
          });
        }
        else {
          return res.status(500).json({
            error: "Error when searching classroom in database"
          });
        }
      }).catch(
        (error) => {
          return res.status(500).json({
            error: error
          });
        }
      )
}

export const getValidationRateOfATour = (req, res, next) => {
  /*let idClassroom = req.body.idClassroom;
  let idTour = req.body.idTour;

  let myClassroom = classroomDAOFindById(idClassroom).then(
    (classroom) => {
      
      Tour.findOne(idTour)
      .populate("idsStep")
      .then(
        (tour) => {
          tour.ids
        }
      ).catch(
        (error) => {
          return res.status(500).json({
            error: error
          });
        }
      )
    }
  ).catch(
    (error) => {
      return res.status(500).json({
        error: error
      });
    }
  );*/
}

