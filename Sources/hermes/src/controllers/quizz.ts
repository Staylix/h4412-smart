import Quizz from '../model/quizz'
import jwt from 'jsonwebtoken'

export const createQuizz = (req, res, next) => {
    const quizz = new Quizz(req.body.quizz);
    quizz.save().then(
        (quizz) => {
            console.log('quizz', quizz);
            res.status(201).json({
                message: 'Your quizz is saved successfully!',
                quizz: quizz,
            });
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

export const getAllQuizzs = (req, res, next) => {
    Quizz.find({}).then(
        (quizzs) => {
            res.status(200).json({
                quizzs: quizzs
            });
        }).catch(
            (error) => {
                res.status(500).json({
                    error: error
                });
            }
        );
}

export const getQuizzById = (req, res , next) => {
    Quizz.findOne({
        "_id": req.params.id
      }).then(
        (quizz) => {
          res.status(200).json(quizz);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
}

export const modifyQuizzById = (req, res, next) => {
    Quizz.updateOne({"_id": req.params.id}, req.body.quizz, {new: true}).then(
        (quizz) => {
            res.status(201).json({
                message: 'Quizz updated successfully!',
                quizz: quizz
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

export const deleteQuizzById = (req, res, next) => {
    Quizz.deleteOne({"_id": req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Quizz deleted successfully'
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