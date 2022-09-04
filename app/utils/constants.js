module.exports = {
  EXPIRES_IN: new Date().getTime() + 120000,
  MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  ROLES: {
    USER: 'USER',
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    SUPPLIER: 'SUPPLIER'
  }
}
