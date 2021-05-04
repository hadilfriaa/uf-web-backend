const Product = require('../models/product.model');

exports.create = (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status,
        history: req.body.history,
        user: req.body.user
    });

    product.save()
    .then((data) => {
        res.send({
            product: data,
            created: true
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating product"
        })
    })

}


exports.getAll = (req, res) => {
    Product.find({"status": true})
    .then(
      (Products) => {
        res.status(200).json(Products);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getAllProducts = (req, res) => {
  Product.find()
  .then(
    (Products) => {
      res.status(200).json(Products);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getProduct = (req, res) => {
  Product.findOne({
    _id: req.params.id
  }).then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.modifyProduct = (req, res, next) => {
    const product = new Product({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status,
      history: req.body.history
        });
    Product.updateOne({_id: req.params.id}, product).then(
      () => {
        res.status(201).json({
          message: 'Product updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Product deleted successfully !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.calcul = (req, res) => {
  Product.count()
  .then(
    (Calcul) => {
      res.status(200).json(Calcul);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.calculSales = (req, res) => {
  Product.count(
    Product.findOne({"status":false})
  )
  .then(
    (Calcul) => {
      res.status(200).json(Calcul);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.calculNotSold = (req, res) => {
  Product.count(
    Product.findOne({"status":true})
  )
  .then(
    (Calcul) => {
      res.status(200).json(Calcul);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getProductsByIdUser = (req, res) => {
  Product.find({"user": req.params.id})
    .then(
      (Products) => {
        res.status(200).json(Products);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}