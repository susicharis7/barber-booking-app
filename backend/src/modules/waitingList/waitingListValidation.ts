import { body, param } from 'express-validator';

export const createWaitingListValidation = [
  body('barber_id')
    .exists({ values: 'null' }).withMessage('barber_id is required')
    .bail()
    .isInt({ min: 1 }).withMessage('barber_id must be a positive integer')
    .toInt(),

  body('service_id')
    .optional({ values: 'null' })
    .isInt({ min: 1 }).withMessage('service_id must be a positive integer')
    .toInt(),

  body('start_date')
    .exists({ values: 'null' }).withMessage('start_date is required')
    .bail()
    .isISO8601({ strict: true }).withMessage('start_date must be YYYY-MM-DD'),

  body('end_date')
    .optional({ values: 'null' })
    .isISO8601({ strict: true }).withMessage('end_date must be YYYY-MM-DD')
    .bail()
    .custom((endDate, { req }) => {
      const startDate = req.body.start_date;
      if (!startDate || !endDate) return true;
      if (new Date(endDate) < new Date(startDate)) {
        throw new Error('end_date must be >= start_date');
      }
      return true;
    }),
];

export const cancelWaitingListValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('id must be a positive integer')
    .toInt(),
];
