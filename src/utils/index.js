const { LogsModel } = require('../database/Logs');

const _getLogs = async (id) => await LogsModel.aggregate([
    { $match: {id} }, { $unwind: '$logs' },
    { $sort: {'logs.date': 1} },
    { $group: {
      _id: '$_id', id: { $last: '$id' }, 
      'logs': { $push: '$logs' }, count: { $last: '$count' }}},
]);

const getLogsWithLimit = async (id, limit) => await LogsModel.aggregate([ 
    { $match: {id} }, { $unwind: '$logs' },
    { $limit: limit }, { $sort: {'logs.date': 1} },
    { $group: {
        _id: '$_id', id: { $last: '$id' }, 
        'logs': { $push: '$logs' },
        count: { $last: '$count' }}},
]);

const getLogsQueryFrom = async (id, from) => await LogsModel.aggregate([
    { $match: {id} },
    { $project: {
      id: 1,
      logs: {
        $filter: {
          input: '$logs', as: 'item',
          cond: { $gte: ['$$item.date', new Date(from)] }
        }
      }}},
      { $unwind: '$logs' }, { $sort: {'logs.date': 1} },
      { $group: {
        _id: '$_id', id: { $last: '$id' }, 
        'logs': { $push: '$logs' }, count: {$sum: 1}}
    }
]);

const getLogsQueryFromWithLimit = async (id, from, limit) => await LogsModel.aggregate([
    { $match: {id} },
    { $project: {
      id: 1,
      logs: {
        $filter: {
          input: '$logs', as: 'item',
          cond: { $gte: ['$$item.date', new Date(from)] }
        }
      }}},
      { $unwind: '$logs' }, { $sort: {'logs.date': 1} },
      { $limit: limit },
      { $group: {
        _id: '$_id', id: { $last: '$id' }, 
        'logs': { $push: '$logs' }, count: {$sum: 1}}
    }
]);

const getLogsQueryFromAndTo = async (id, from, to) => await LogsModel.aggregate([
    { $match: {id} },
    { $project: {
      id: 1,
      logs: {
        $filter: {
          input: '$logs', as: 'item',
          cond: {
            $and: [
              {$gte: ['$$item.date', new Date(from)]},
              {$lte: ['$$item.date', new Date(to)]}
            ]
          }
        }
      }}
    },
    { $unwind: '$logs' }, { $sort: {'logs.date': 1} },
    { $group: {
      _id: '$_id', id: { $last: '$id' }, 
      'logs': { $push: '$logs' }, count: {$sum: 1}}},
])

const getLogsQueryFromAndToWithLimit = async (id, from, to, limit) => await LogsModel.aggregate([
    { $match: {id} },
    { $project: {
      id: 1,
      logs: {
        $filter: {
          input: '$logs', as: 'item',
          cond: {
            $and: [
              {$gte: ['$$item.date', new Date(from)]},
              {$lte: ['$$item.date', new Date(to)]}
            ]
          }
        }
      }}
    },
    { $unwind: '$logs' }, { $sort: {'logs.date': 1} },
    { $limit: limit },
    { $group: {
      _id: '$_id', id: { $last: '$id' }, 
      'logs': { $push: '$logs' }, count: {$sum: 1}}},
])

module.exports = {
    _getLogs, getLogsWithLimit,
    getLogsQueryFrom, getLogsQueryFromWithLimit, 
    getLogsQueryFromAndTo, getLogsQueryFromAndToWithLimit
};