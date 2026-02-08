import { param } from 'express-validator';

export const getServiceByIdValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('id must be a positive integer')
    .toInt(),
];
