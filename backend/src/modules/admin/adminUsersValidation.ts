import { body, param, query } from 'express-validator';

const allowedRoles = ['customer', 'barber', 'admin'];
const allowedAppointmentStatuses = ['confirmed', 'completed', 'cancelled'];

export const listAdminUsersValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('page must be an integer >= 1')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
    .toInt(),
  query('search')
    .optional({ values: 'falsy' })
    .isString().withMessage('search must be a string')
    .trim()
    .isLength({ max: 100 }).withMessage('search max length is 100'),
  query('role')
    .optional()
    .isIn(allowedRoles).withMessage('role must be customer, barber, or admin'),
  query('blocked')
    .optional()
    .isIn(['true', 'false']).withMessage('blocked must be true or false'),
];

export const updateAdminUserRoleValidation = [
  param('userId')
    .isInt({ min: 1 }).withMessage('userId must be a positive integer')
    .toInt(),
  body('role')
    .exists({ values: 'falsy' }).withMessage('role is required')
    .isIn(allowedRoles).withMessage('role must be customer, barber, or admin'),
];

export const updateAdminUserBlockedValidation = [
  param('userId')
    .isInt({ min: 1 }).withMessage('userId must be a positive integer')
    .toInt(),
  body('is_blocked')
    .exists().withMessage('is_blocked is required')
    .isBoolean().withMessage('is_blocked must be boolean')
    .toBoolean(),
];

export const getAdminUserAppointmentsHistoryValidation = [
  param('userId')
    .isInt({ min: 1 }).withMessage('userId must be a positive integer')
    .toInt(),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('page must be an integer >= 1')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
    .toInt(),
  query('status')
    .optional()
    .isIn(allowedAppointmentStatuses)
    .withMessage('status must be confirmed, completed, or cancelled'),
];
