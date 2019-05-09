import Poi from '../model/poi'

export const getPoiById = (req, res, next) => {
    Poi.findOne({
        "_id": req.params.id
      }).then(
        (poi) => {
          res.status(200).json(poi);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
};

export const createPoi = (req, res, next) => {

  const poi = new Poi(req.body.poi);

  poi.save().then(
      (poi) => {
          console.log('poi', poi);       
          res.status(201).json({
              message: 'Your PoI is saved successfully!',
              poi: poi
          });
  }).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
}

export const getAllPoi = (req, res, next) => {
  Poi.find()
    .sort({name : 'asc'})
    .then(
    (pois) => {
        res.status(200).json({
            pois: pois
        });
    }).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
}

export const modifyPoiById = (req, res, next) => {
  Poi.updateOne({"_id": req.params.id}, req.body.poi).then(
      () => {
          res.status(201).json({
              message: 'Poi updated successfully!'
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

export const deletePoiById = (req, res, next) => {
  Poi.deleteOne({"_id": req.params.id}).then(
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

export const getPoisByName =(req, res, next) => {
  
  Poi.find({ 
    "name": { "$regex": req.params.keyword, "$options": "i" } 
  })  
  .then(
    (poi) => {
      res.status(200).json(poi);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}