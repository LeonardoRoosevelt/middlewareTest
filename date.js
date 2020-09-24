function requireDate() {
  let date = new Date(Date.now())
  let dateValues = ''
  dateValues = `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  return dateValues
}

module.exports = requireDate
