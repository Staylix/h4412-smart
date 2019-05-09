import Step from '../model/step'
import Quizz from '../model/quizz'
import jwt from 'jsonwebtoken'

export const getStepById = (req, res, next) => {
    Step.findOne({
        "_id": req.params.id
      })
      .populate("idQuizz")
      .then(
        (step) => {
          res.status(200).json(step);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
};

export const createStep = (req, res, next) => {
    const step = new Step(req.body.step);
    
    const quizz = new Quizz({
        type: "",
        content: "",
        responses: ["", "", "", ""],
        goodAnswer: 0
    });

    quizz.save().then(
        (quizz) => {
            step.idQuizz = quizz["_id"];
            step.save().then(       
                (step2) => {
                    
                    
                    console.log('step', step2);
                    //create an empty quizz
                    
                    res.status(201).json({
                        message: 'Your step is saved successfully!',
                        step: step2
                    });
                
            }).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        } 
    ).catch(

    )   
}

export const modifyStepById = (req, res, next) => {    
   
    Step.updateOne({"_id": req.params.id}, req.body.step).then(
        () => {
            res.status(201).json({
                message: 'Step updated successfully!'
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

export const deleteStepById = (req, res, next) => {
    Step.deleteOne({"_id": req.params.id}).then(
        () => {
        res.status(200).json({
            message: 'Step deleted successfully'
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

export const getAllSteps = (req, res, next) => {
    Step.find({}).then(
        (steps) => {
            res.status(200).json({
                steps: steps
            });
        }).catch(
            (error) => {
                res.status(500).json({
                    error: error
                });
            }
        );
}

export const hasAStudentValidatedStep = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'hexafterwork');
    const userId = decodedToken.userId;

    Step.findOne({
        "_id": req.params.id
      }).then(
        (step) => {

            let isStudentInStepValidation = step.validation.find(id => id == userId);
            
            if(isStudentInStepValidation === undefined){
                return res.status(200).json({
                    validation: false
                  });
            }else{
                return res.status(200).json({
                    validation: true
                  });
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

export const validateAStep = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'hexafterwork');
    const userId = decodedToken.userId;

    Step.findOne({
        "_id": req.params.id
      }).then(
        (step) => {

            let userAlreadyValidated = step.validation.find(id => id == userId);          
            
            //HAS THE USER ALREADY VALIDATED
            if(userAlreadyValidated === undefined) {
            
                step.validation.push(userId);

                Step.updateOne({"_id": req.params.id}, step).then(
                    () => {
                        return res.status(201).json({
                            message: 'Step updated successfully!'
                        });
                }
                ).catch(
                    (error) => {
                        return res.status(400).json({
                            error: error
                        });
                    }
                );

            }else{
                return res.status(409).json({
                    message: 'User has already validated this step'
                });
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

export const answerAQuizz = (req, res, next) => {
    //TODO MAYBE CHECK IF HE HAS ALREADY VALIDATED
       
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'hexafterwork');
    const userId = decodedToken.userId;

    let idStep = req.body.idStep;
    let idAnswer = req.body.idAnswer;   

    Step.findOne({
        "_id": idStep
      }).then(
        (step) => {            
            
            step.quizzAnswer.push(
                {
                    idStudent: userId,
                    numAnswer: idAnswer
                }
            );

            step.validation.push(userId);

            //console.log(step.quizzAnswer);
            //then update this step
            Step.updateOne({"_id": idStep}, step).then(
                () => {
                    
                    return res.status(201).json({
                        message: 'Step updated successfully!'
                    });
                }    
            ).catch(
                (error) => {
                    return res.status(404).json({
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
      )
}