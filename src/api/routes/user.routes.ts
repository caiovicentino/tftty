// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validate } from '../middlewares/validation.middleware';
import { userSchemas } from '../services/user.service';

const router = Router();

/**
 * @openapi
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/me', userController.getMe);

/**
 * @openapi
 * /users/me:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update current user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.put('/me', validate(userSchemas.updateUserSchema), userController.updateMe);

/**
 * @openapi
 * /users/me/addresses:
 *   post:
 *     tags:
 *       - Users
 *     summary: Add a new address for the current user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/me/addresses', validate(userSchemas.addressSchema), userController.addAddress);

/**
 * @openapi
 * /users/me/addresses:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all addresses for the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user addresses
 *       401:
 *         description: Unauthorized
 */
router.get('/me/addresses', userController.getAddresses);

export default router;