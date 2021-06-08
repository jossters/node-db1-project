const db = require("../../data/db-config")

const getAll = () => {
  return db("accounts")
}

async function getById(id) {
  const result = await db('accounts')

  .where('id', id).first()
  return result
}

async function create({name, budget}) {
  const [id] = await db('accounts')
  .insert({name, budget})
  return getById(id)
}

function updateById(id, {name, budget}) {
   return db('accounts')
   .where('id', id)
   .update({ name, budget})
   .then(() => {
     return getById(id)
   })
}

async function deleteById(id) {
  const remove = await getById(id)
  await db("accounts")
  .where({id})
  .del()
  return remove
}

function getByName(name){
  return db('accounts').where({name}).first()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}
