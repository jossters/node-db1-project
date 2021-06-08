const router = require('express').Router()
const Accounts = require('./accounts-model')

const {checkAccountId, checkAccountPayload, checkAccountNameUnique
} = require("./accounts-middleware")
router.get('/', async (req, res, next) => {
  try {
const data = await Accounts.getAll()
res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId,
async (req, res, next) => {
  try {
 const accounts = await Accounts.getById(req.params.id)
 res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique,
async (req, res, next) => {
  try {
 const data = await Accounts.create(req.body)
 res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId,
async (req, res, next) => {
  try {
const data = await Accounts.updateById(req.params.id, req.body)
 res.status(200).json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Accounts.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
