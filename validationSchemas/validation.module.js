const classValidator = require('class-validator');
const { registerSchema } = classValidator;

const UserValidationSchema = require('./schemas/userValidation');

registerSchema(UserValidationSchema);
