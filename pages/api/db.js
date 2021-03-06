import db from '../../src/database/db.json'

export default (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  }

  response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  )

  res.json(db)
}
