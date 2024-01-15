// validationSchemas.js
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(6).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export { userSchema};
