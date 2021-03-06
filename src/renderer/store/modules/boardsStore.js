import { db } from '../../store'

import lodashId from 'lodash-id'

db._.mixin(lodashId)

function getLabel() {
  var app = require("electron").remote.app;
  let locale = app.getLocale()
  if (locale == "zh-CN") return "工作区"
  else return "Default Board"
}

db.defaults({
  activeBoard: 'default',
  boards: [{
    id: 'default',
    label: getLabel(),
    hubs: []
  }]
}).write()

export default {
  saveNewBoard(boardName) {
    return db
      .get('boards')
      .insert({
        label: boardName,
        hubs: []
      })
      .write()
  },
  saveBoardsArray(boardsArray) {
    return db
      .set('boards', boardsArray)
      .write()
  },
  saveHubsArray(boardId, items) {
    return db
      .get('boards')
      .getById(boardId)
      .set('hubs', items)
      .write()
  },
  saveHubItemsArray(boardId, hubId, items) {
    return db
      .get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .set('items', items)
      .write()
  },
  removeBoard(boardId) {
    db.get('boards')
      .remove({ id: boardId })
      .write()
  },
  setActiveBoard(boardId) {
    db.set('activeBoard', boardId)
      .write()
  },
  checkBoard(boardId) {
    let len = db.get('boards')
      .filter({ id: boardId })
      .value()
      .length
    if (len == 0) return false
    else return true
  },
  getActiveBoard() {
    return db.get('activeBoard')
      .value()
  },
  getFirstBoard() {
    return db.get('boards')
      .first()
      .value()
  },
  getList() {
    return db
      .get('boards')
      .cloneDeep()
      .value()
  },
  addHubToEnd(boardId, type, title) {
    return db
      .get('boards')
      .getById(boardId)
      .get('hubs')
      .insert({
        label: title,
        type: type,
        items: []
      })
      .write()
  },
  getHubs(boardId) {
    return db
      .get('boards')
      .getById(boardId)
      .get('hubs')
      .cloneDeep()
      .value()
  },
  getHubItems(boardId, hubId) {
    return db
      .get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .cloneDeep()
      .value()
  },
  addHubItem(boardId, hubId, path, label) {
    return db
      .get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .insert({
        path: path,
        label: label
      })
      .write()
  },
  removeHubItem(boardId, hubId, itemId) {
    db.get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .remove({ id: itemId })
      .write()
  },
  removeHub(boardId, hubId) {
    db.get('boards')
      .getById(boardId)
      .get('hubs')
      .remove({ id: hubId })
      .write()
  },
  setHubLabel(boardId, hubId, label) {
    db.get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .set('label', label)
      .write()
  },
  addHubNote(boardId, hubId, content) {
    return db
      .get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .insert({
        content: content
      })
      .write()
  },
  setHubItemContent(boardId, hubId, itemId, content) {
    db.get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .getById(itemId)
      .set('content', content)
      .write()
  },
  setHubItemLabel(boardId, hubId, itemId, content) {
    db.get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .getById(itemId)
      .set('label', content)
      .write()
  },
  removeHubNote(boardId, hubId, itemId) {
    db.get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .remove({ id: itemId })
      .write()
  },
  setTodoIsDone(boardId, hubId, itemId, newVal) {
    db.get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .getById(itemId)
      .set('isDone', newVal)
      .write()
  },
  addHubTodoItem(boardId, hubId, content) {
    return db
      .get('boards')
      .getById(boardId)
      .get('hubs')
      .getById(hubId)
      .get('items')
      .insert({
        content: content,
        isDone: false
      })
      .write()
  }
}
