import { body, param, query } from 'express-validator';

export const createAppointmentValidation = [
    body('barber_id') // from req.body chain
        .exists({ values: 'null' }).withMessage('barber_id is required.')
        .bail()
        .isInt({ min: 1}).withMessage('barber_id must be a positive integer')
        .toInt(),

    body('service_id') 
        .exists({ values: 'null' }).withMessage('service_id is required.')
        .bail()
        .isInt({ min: 1}).withMessage('service_id must be a positive integer')
        .toInt(),

    body('date')
    .exists({ values: 'null' }).withMessage('date is required')
    .bail()
    .isISO8601({ strict: true }).withMessage('date must be a valid ISO date (YYYY-MM-DD)'),

    body('start_time')
        .exists({ values: 'null' }).withMessage('start_time is required')
        .bail()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('start_time must be HH:mm'),

    body('note')
        .optional({ values: 'null'})
        .isString().withMessage('note must be a string')
        .bail()
        .isLength({ max: 500 }).withMessage('note must be at most 500 characters'),

]




export const cancelAppointmentValidation = [
    param('id')
        .isInt({ min: 1}).withMessage('id must be a positive integer')
        .toInt(),
];



export const getBookedTimesValidation = [
    param('barberId')
        .isInt({ min: 1}).withMessage('barberId must be a positive integer')
        .toInt(),

    query('date')
        .exists({values: 'falsy'}).withMessage('date is required')
        .bail()
        .isISO8601({ strict: true}).withMessage('date must be a valid ISO date (YYYY-MM-DD)'),
];

export const getAppointmentsValidation = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('limit must be an integer between 1 and 50')
    .toInt(),

  query('cursor')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}\|\d{2}:\d{2}\|\d+$/)
    .withMessage('cursor must be in format YYYY-MM-DD|HH:mm|id'),
];


