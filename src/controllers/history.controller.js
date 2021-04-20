const History = require('../models/history.model');
const Product = require('../models/product.model');

exports.create = (req, res) => {
    const history = new History({
        priceH: req.body.priceH,
        dateH: req.body.dateH,
        user: req.body.user,
        product: req.body.price
    });

    history.save()
    .then((data) => {
        Product.findByIdAndUpdate(req.body.product, {$push: {products: data._id}}).then(() => {
            res.send({
                data: data,
            })
            .catch((err) => res.send(err));
        });
        res.send({
            data: data,
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating order"
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating history"
        })
    })

}


exports.getAll = (req, res) => {
    History.find()
    .then(
      (Historys) => {
        res.status(200).json(Historys);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};


exports.getOne = (req, res) => {
  History.findOne({
    _id: req.params.id
  }).then(
    (history) => {
      res.status(200).json(history);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.delete = (req, res) => {

    var history = History.findById(req.params.id)
    History.remove(history)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `History with id ${req.params.id} not found`,
          });
        }
        res.send(data);
      })
      .catch((err) => res.send(err));
    
  };