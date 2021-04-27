const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {

 
    console.log(req.body);
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin
    });
  
    user
      .save()
      .then((data) => {
        let userToken = jwt.sign(
          {
            id: data._id,
            isAdmin: data.isAdmin,
          },
          'supersecret',
          {
            expiresIn: 86400,
          }
        );
        res.send({
          token: userToken,
          auth: true,
        });
      })
      .catch((err) => {
        res.status(500).send({
          error: 500,
          message: err.message || 'some error occured while creating user',
        });
      });
  };

exports.getUser = (req, res) => {
    User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `User with id ${req.params.id} not found`,
          // message:"User with id" + req.params.id +"not found"
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};


exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
      .then((data) => {
        
      if (!data) {
        return res.status(400).send({
          auth: false,
          token: null,
          message: `No user find with email ${req.body.email}`,
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          token: null,
          message: 'password is not valid',
        });
      }

      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin 
        },
        'supersecret',
        {expiresIn: 86400}
      );

      res.send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};



exports.modifyUser = (req, res, next) => {
    const user = new User({
      _id: req.params.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    User.updateOne({_id: req.params.id}, user).then(
      () => {
        res.status(201).json({
          message: 'User updated successfully!'
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

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: ' User deleted successfully!'
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


exports.getAll = (req, res) => {
  User.find()
  .then(
    (Users) => {
      res.status(200).json(Users);
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
  User.count()
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