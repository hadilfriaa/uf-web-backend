const History = require('../models/history.model');
const Product = require('../models/product.model');

exports.create = (req, res) => {
    const history = new History({
        priceH: req.body.priceH,
        dateH: req.body.dateH,
        timeH: req.body.timeH,
        user: req.body.user,
        product: req.body.product
    });

    Product.findOne({
      _id: req.body.product
    }).then(
      (product) => {
        const lastPrice = product.price;
        if(req.body.priceH <= lastPrice){
          res.status(500).send({
            error: 500,
            message: "Vous ne pouvez pas faire une offre d'un montant inférieur à l'offre précédente"
          })
        }else{
          history.save()
          .then((data) => {
            Product.findByIdAndUpdate(req.body.product, {$push: {history: data._id}}).then(() => {
              res.send({
                  data: data,
              })
              .catch((err) => res.send(err));
            });
            Product.findByIdAndUpdate(req.body.product, {price: data.priceH}).then(() => {
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
        }
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

  exports.getAllByIdProduct = (req, res) => {
    History.find({"product": req.params.id})
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