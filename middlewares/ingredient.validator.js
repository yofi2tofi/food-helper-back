const classValidator = require('class-validator');

module.exports = (req, res, next) => {
  classValidator
    .validate('ingredientSchema', req.body, {
      whitelist: true,
      forbidNonWhitelisted: false
    })
    .then(errors => {
      if (errors.length) {
        const errorsMessages = errors.map(error => {
          const key = error.property;
          const messageRaw = error.constraints;

          let message;
          for (const key in messageRaw) {
            message = messageRaw[key];
          }

          return { [key]: message };
        });

        return res.status(404).json(errorsMessages);
      }

      next();
    });
};
