import Tour, { ITour } from '../model/tour'
import Step, { IStep } from '../model/step'
import User from '../model/user'
import Classroom from '../model/classroom'
import jwt from 'jsonwebtoken'
import { userDAOFindById, userDAOUpdateUserById } from '../dao/userDAO'
import { tourDAOFindById, tourDAOGetTourWithStep } from '../dao/tourDAO'

export const createTour = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'hexafterwork');
  const userId = decodedToken.userId;
  let newTour = new Tour({
    ...req.body.tour,
    idAuthor: userId,
  });
  if (req.body.tour["_id"] === undefined || req.body.tour["_id"] === null) {
    newTour.save()
      .then((tour) => {
        //need to update teacher
        userDAOFindById(userId).then((user) => {
          if (user.email !== undefined) //monkey way to test if this is an error
          {
            user.idsTour.push(tour._id);

            userDAOUpdateUserById(userId, user).then(
              (user) => {
                return res.status(200).json({
                  tour: tour,
                  user: user
                });
              }
            ).catch(
              (error) => {
                return res.status(500).json({
                  error: "Error when updating user in database"
                });
              }
            )
          }
          else {
            return res.status(500).json({
              error: "Error when searching user in database"
            });
          }
        }
        );
      }).catch(
        (error) => {
          return res.status(404).json({
            error: error
          });
        }
      );
    ;
  } else {
    let tourId = req.body.tour["_id"];
    const body = req.body;
    Tour.findByIdAndUpdate(tourId, req.body.tour, { new: true })
      .then((tour) => {
        return res.status(200).json({
          status: 'OK Updated',
          tour: tour
        })
      }).catch(
        (error) => {
          return res.status(404).json({
            error: error
          });
        }
      );
    ;
  }

};

export const getTour = (req, res, next) => {
  let tourId = req.params.idTour;
  Tour.findById(tourId)

    .then((tour) => {
      res.status(200).json({
        status: 'OK Get',
        tour
      });
    }).catch(
      (error) => {
        return res.status(404).json({
          error: error
        });
      }
    );
  ;
};

export const updateTour = (req, res, next) => {

  const tourId = req.params.idTour;
  const body = req.body;
  Tour.findByIdAndUpdate(tourId, body, { new: true })
    .then((updated) => {
      res.json({
        status: 'OK Updated',
        updated
      })
    }).catch(
      (error) => {
        return res.status(404).json({
          error: error
        });
      }
    );
  ;
}

export const deleteTour = (req, res, next) => {

  //has to delete tour & remove it to the classrooms & userLists

  const tourId = req.params.idTour;
  Tour.deleteOne({ "_id": tourId })
    .then((removed) => {

      User.find({ "idsTour": tourId }).then(
        (users) => {

          users.forEach((user) => {

            //remove idTour from the user idsTour
            let indexOfIdTour = user.idsTour.indexOf(tourId);

            if (indexOfIdTour > -1) {
              user.idsTour.splice(indexOfIdTour, 1);
            }
          });

          let updateUserPromises = [];

          users.forEach((user) => {
            //console.log(user);
            updateUserPromises.push(
              User.updateOne({ "_id": user["_id"] }, user)
            )
          });

          Promise.all(updateUserPromises).then(function (values) {
            Classroom.find({ "idsTour": tourId }).then(
              (classrooms) => {

                classrooms.forEach((classroom) => {

                  //remove idTour from the classroom idsTour
                  let indexOfIdTour = classroom.idsTour.indexOf(tourId);

                  if (indexOfIdTour > -1) {
                    classroom.idsTour.splice(indexOfIdTour, 1);
                  }
                });

                let updateClassroomPromises = [];

                classrooms.forEach((classroom) => {

                  updateClassroomPromises.push(
                    Classroom.updateOne({ "_id": classroom["_id"] }, classroom)
                  )
                });

                Promise.all(updateClassroomPromises).then(function (values) {
                  return res.status(200).json({
                    message: 'Tour deleted successfully'
                  })
                });
              }
            ).catch(
              (error) => {
                res.status(400).json({
                  error: "Eror when updating classrooms"
                });
              }
            )
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: "Could not find users that has the deleted tour"
          });
        }
      )
    })
    .catch(
      (error) => {
        return res.status(404).json({
          error: error
        });
      }
    );
  ;
}

export const getAuthorTours = (req, res, next) => {
  //maybe deprecated, use the new service instead
  Tour.find({ idAuthor: req.params.idAuthor })
    .then((tours) => {
      res.send({
        status: 'OK List',
        "tours": tours
      });
    }).catch(
      (error) => {
        return res.status(404).json({
          error: error
        });
      }
    );
};

export const tourList = (req, res, next) => {
  Tour.find()
    .populate({
      path: 'idsStep',
      model: 'Step',
      populate: {
        path: 'idPoi',
        model: 'PointOfInterest'
      }
    })
    .populate({
      path: 'idAuthor',
      model: 'User',
      select: 'email firstName lastName'
    })
    .then((tours) => {
      res.send({
        status: 'OK List',
        "tours": tours
      });
    }).catch(
      (error) => {
        return res.status(404).json({
          error: error
        });
      }
    );
}

export const getTourWithStep = (req, res, next) => {
  //find a way to know if this step is completed by the User
  //send it to the user

  let tourId = req.params.idTour;
  Tour.findById(tourId)
    .populate({
      path: 'idsStep',
      model: 'Step',
      populate: {
        path: 'idPoi',
        model: 'PointOfInterest'
      }
    })
    .then((tour) => {
      console.log(tour);
      return res.status(200).json({
        status: 'OK TourWithStep',
        tourWithStep: tour
      });
    }).catch(
      (error) => {
        return res.status(404).json({
          error: error
        });
      }
    );
  ;
}

export const getFullToursForAuthor = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'hexafterwork');
  const userId = decodedToken.userId;

  Tour.find({ idAuthor: userId })
    .populate({
      path: 'idsStep',
      model: 'Step',
      populate: {
        path: 'idPoi',
        model: 'PointOfInterest'
      }
    })
    .then((tours) => {
      res.send({
        status: 'OK List',
        "tours": tours
      });
    }).catch(
      (error) => {
        return res.status(404).json({
          error: error
        });
      }
    );
}

export const getToursOfAStudent = (req, res, next) => {

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
        path: 'idsTour',
        model: 'Tour',
        populate: {
          path: 'idAuthor',
          model: 'User',
          select: 'email firstName lastName'
        }
      }
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
            path: 'idQuizz',
            model: 'Quizz',
            select: 'type content responses'
          }
        }
      }
    })
    .then(
      (user) => {
        return res.status(200).json({
          user: user
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

export const getToursOfAClassroom = (req, res, next) => {

  Classroom.findOne({
    "_id": req.params.idClassroom
  })
    .populate({
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
    })
    .then(
      (classroom) => {
        return res.status(200).json({
          clasroom: classroom
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