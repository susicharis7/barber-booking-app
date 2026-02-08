import { body } from 'express-validator';

export const registerUserValidation = [
  body('first_name')
    .exists({ values: 'falsy' }).withMessage('first_name is required')
    .bail()
    .isString().withMessage('first_name must be a string')
    .bail()
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage('first_name must be 2-30 chars'),

  body('last_name')
    .exists({ values: 'falsy' }).withMessage('last_name is required')
    .bail()
    .isString().withMessage('last_name must be a string')
    .bail()
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage('last_name must be 2-30 chars'),
];

export const updateMeValidation = [
  body('first_name')
    .optional({ values: 'null' })
    .isString().withMessage('first_name must be a string')
    .bail()
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage('first_name must be 2-30 chars'),

  body('last_name')
    .optional({ values: 'null' })
    .isString().withMessage('last_name must be a string')
    .bail()
    .trim()
    .isLength({ min: 2, max: 30 }).withMessage('last_name must be 2-30 chars'),
    
  body('phone')
    .optional({ values: 'null' })
    .isString().withMessage('phone must be a string')
    .bail()
    .trim()
    .matches(/^\+?[0-9\s\-()]{6,20}$/).withMessage('phone format is invalid'),

];
