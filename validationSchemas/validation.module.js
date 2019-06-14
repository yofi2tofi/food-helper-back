const classValidator = require('class-validator');
const { registerSchema } = classValidator;

const UserValidationSchema = require('./schemas/user.validation');
const DishValidationSchema = require('./schemas/dish.validation');

registerSchema(UserValidationSchema);
registerSchema(DishValidationSchema);