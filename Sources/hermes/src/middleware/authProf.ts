import User from "../model/user";
import { userDAOFindById } from "../dao/userDAO";

const jwt = require('jsonwebtoken');

export function authProf (req, res, next)  {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'hexafterwork');
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {           

            let myUser = userDAOFindById(userId).then(
                (user) => {
                    
                    if(user.isProf)
                    {
                        next();
                    }
                    else
                    {
                        return res.status(401).json({
                            error: 'Your are not authorized'
                        });
                    }
                }
            ).catch(
                (error) => {
                    return res.status(400).json({
                        error: 'Error when finding the user'
                    });
                }
            )            
        }
    } catch {
        return res.status(401).json({
            error: 'Invalid token!'
        });
    }
};