const taskService = require("../services/task");

const addTask = catchAsync(async (req, res) => {
    const result = await taskService.addTaskService(req.body, req)
    if(result) {
        res.message = apiMessages.task.create
        return util.successResponse(result, res);
    }
    return util.badRequest(res)
});

const findAllTask = catchAsync(async (req, res) => {
    const options = {
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit):  10,
        sort: { createdAt: req.query.createdAtSort ?? -1 }
    }
    const result = await taskService.findAllTaskService(options)
    if(result) {
        res.message = apiMessages.task.findAll
        return util.successResponse(result, res);
    }
    return util.badRequest(res)
});

const getTask = catchAsync(async (req, res) => {
    const result = await taskService.getTaskService(req.params.id)
    if(result) {
        res.message = apiMessages.task.fetch
        return util.successResponse(result, res);
    }
    return util.recordNotFound(res)
});

const updateTask = catchAsync(async (req, res) => {
    const data = {
        ...req.body,
    };
    const result = await taskService.updateTaskService(req.params.id, data)
    if(result) {
        res.message = apiMessages.task.update
        return util.successResponse(result, res);
    }
    return util.badRequest(res)
});


const deleteTask = catchAsync(async (req, res) => {
    let result = await taskService.deleteTaskService(req.params.id)
    console.log('result', result);
    if(result.deletedCount) {
        res.message = apiMessages.task.delete
        return util.successResponse(result, res);
    }
    return util.badRequest(res)
});


module.exports = {
    addTask,
    findAllTask,
    getTask,
    updateTask,
    deleteTask
};