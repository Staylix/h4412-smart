import User, { IUser } from '../model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userDAOFindById } from '../dao/userDAO';

export const signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user: IUser = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                isProf: req.body.isProf,
                idsClassroom: [],
                idsTour: [],
            });
            console.log(user);
            user.save().then(
                (user) => {
                    console.log('user', user);
                    res.status(200).json(user); // TODO: remove password
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ); // TODO: No catch?
};

export const login = (req, res, next) => {
    let user;
    User.findOne({ email: req.body.email }).then(
        (u) => {
            if (!u) {
                return res.status(402).json({
                    //error: new Error('User not found!')
                    "type": "error",
                    "message": "User not found"
                });
            }
            user = u;
            return bcrypt.compare(req.body.password, user.password);
        }
    ).then(
        (valid) => {
            if (!valid) {
                return res.status(403).json({
                    //error: new Error('User not found!')
                    "type": "error",
                    "message": "Incorrect password"
                });
            }
            const token = jwt.sign(
                { userId: user._id },
                'hexafterwork',
                { expiresIn: '48h' });
            return res.status(200).json({
                user: user,
                token: token
            });
        }
    ).catch(
        (error) => {
            /*return res.status(500).json({
                error: error
            });*/
            console.log(error); //DONT TOUCH BEFORE ASKING TUTUR SVP
        }
    )
};

export const userList = (req, res, next) => {
    User.find({}).then(
        (users) => {
            return res.status(200).json({
                users: users
            });
        }).catch(
            (error) => {
                return res.status(500).json({
                    error: error
                });
            }
        );
};

export const updateUserById = (req, res, next) => {

    const userId = req.params.id;
    const body = req.body;
    User.findByIdAndUpdate(userId, body, { new: true })
        .then((updated) => {
            res.json({
                status: 'User successfully Updated',
                updated
            })
        });
}

export const findUserById = (req, res, next) => {
    User.findOne({
        "_id": req.params.id
    }).then(
        (user) => {
            return res.status(200).json(user);
        }
    ).catch(
        (error) => {
            return res.status(404).json({
                error: error
            });
        }
    );
}

export const findUserByMail = (req, res, next) => {

    User.findOne({
        "email": req.params.email
    }).then(
        (user) => {
            return res.status(200).json(user);
        }
    ).catch(
        (error) => {
            return res.status(404).json({
                error: error
            });
        }
    );
}

export const getStatsForStudent = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'hexafterwork');
    const userId = decodedToken.userId;

    console.log("toto");

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
                        path: 'idQuizz',
                        model: 'Quizz',
                        populate: {
                            path: 'idStudent',
                            model: 'User',
                            select: 'firstName lastName'
                        }
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
                model: 'User'
            }
        })
        .then(
            (user) => {

                let stats = {};

                user.idsClassroom.forEach(classroom => {
                    stats[classroom["_id"]] = { name: classroom['name'], tours: {}, students: classroom['idsUser'] };

                    classroom["idsTour"].forEach(tour => {
                        stats[classroom["_id"]].tours[tour["_id"]] = { name: tour.name, steps: {}, ordered: tour.idsStep.map((step) => step._id) };

                        tour["idsStep"].forEach(step => {
                            stats[classroom["_id"]].tours[tour["_id"]].steps[step["_id"]] = { name: step.idPoi.name, answers: {} };

                            step.quizzAnswer.forEach(answer => {
                                stats[classroom["_id"]].tours[tour["_id"]].steps[step["_id"]].answers[answer.idStudent["_id"]] = { id: answer.idStudent, answer: {} };
                                //console.log(answer);

                                //Validation Check
                                let userAlreadyValidated = step.validation.find(id => id == answer.idStudent);
                                let hasUserAlreadyValidated = false;
                                if (userAlreadyValidated !== undefined) {
                                    hasUserAlreadyValidated = true;
                                }

                                //Has the Good Answer
                                let hasAnsweredFine = false;
                                if (step.idQuizz !== undefined && step.idQuizz["goodAnswer"] !== undefined) {
                                    let goodAnswer = step.idQuizz["goodAnswer"];

                                    if (answer.numAnswer === goodAnswer) {
                                        hasAnsweredFine = true;
                                    }
                                }

                                stats[classroom["_id"]].tours[tour["_id"]].steps[step["_id"]].answers[answer.idStudent["_id"]].answer = {
                                    hasValidated: hasUserAlreadyValidated,
                                    goodAnswer: hasAnsweredFine
                                };

                            });
                        });
                    });
                });

                return res.status(200).json({
                    user: user,
                    stats: stats
                });
            }
        ).catch(
            (error) => {
                return res.status(404).json({
                    message: "Error when finding the user",
                    error: error
                });
            }
        )
}