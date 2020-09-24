// app.js
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const requireDate = require('./date')
const Todo = require('./models/todo')

require('./config/mongoose')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(function(req, res, next) {
  let dateValues = requireDate()
  const requestTime = Date.now()
  let serverLog = `${dateValues} | ${req.method} from ${req.originalUrl}`
  console.log(serverLog)
  res.on('finish', () => {
    const dateValues = requireDate()
    const responseTime = Date.now()
    let serverLog2 = `${dateValues} | ${req.method} from ${
      req.originalUrl
    } | total time : ${responseTime - requestTime} ms `
    console.log(serverLog2)
  })
  next()
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/todos/:_id', (req, res) => {
  const id = req.params._id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.post('/', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
