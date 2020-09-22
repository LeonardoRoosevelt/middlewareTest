function requireDate() {
  let date = new Date(Date.now() * 1000)
  dataValues = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  console.log(dataValues)
}

exports.module = requireDate
