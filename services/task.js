const Task = require("../models/task");

const addTaskService = async (data) => {
    try {
        let result = await Task.create(data)
        return result
    } catch (error) {
        logger.error("Error-addTaskService", error)
        throw new Error(error)
    }
}

const findAllTaskService = async (options) => {
    try {
        query = {
            isActive: true
        };
        const result = await Task.paginate(query, options);
        return result
    } catch (error) {
        logger.error("Error-findAllTaskService", error)
        throw new Error(error)
    }
}

const updateTaskService = async (id, data) => {
    try {
        let result = await Task.findOneAndUpdate({ _id: id }, data, { new: true })
        return result
    } catch (error) {
        logger.error("Error-updateTaskService", error)
        throw new Error(error)
    }
}

const getTaskService = async (id) => {
    try{
        const result = await Task.findOne({ _id: id })
        return result
    } catch (error){
        logger.error("Error-getOneTaskService", error)
        throw new Error(error)
    }
}
const deleteTaskService = async (id) => {
    try {
        let result = await Task.deleteOne({ _id: id })
        return result
    } catch (error) {
        logger.error("Error-deleteTaskService", error)
        throw new Error(error)
    }
}
module.exports = {
    addTaskService,
    findAllTaskService,
    updateTaskService,
    getTaskService,
    deleteTaskService
}
