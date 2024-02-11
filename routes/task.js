const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const validate = require('../middlewares/validate');
const taskValidation = require('../utils/validations/taskValidation');

router.post('/create', validate(taskValidation.createKeys), authentication,taskController.addTask)
router.put('/update/:id', validate(taskValidation.updateKeys), authentication,taskController.updateTask)
router.get('/findAll', authentication,taskController.findAllTask)
router.delete('/delete/:id', authentication,taskController.deleteTask)
router.get('/:id', authentication,taskController.getTask)

module.exports = router