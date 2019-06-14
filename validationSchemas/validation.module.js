const classValidator = require('class-validator');
const { registerSchema } = classValidator;

const UserValidationSchema = require('./schemas/user.validation');

registerSchema(UserValidationSchema);
