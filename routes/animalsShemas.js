const S = require('fluent-json-schema')

const NewAnimalsValidateSchema = S.object().prop('nameAnimal', S.string().minLength(1).required()).valueOf();
exports.NewAnimalsValidateSchema = NewAnimalsValidateSchema