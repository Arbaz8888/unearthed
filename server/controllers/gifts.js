import { pool } from '../config/database.js'

const GIFT_COLUMNS = `
  id,
  name,
  price_point AS "pricePoint",
  audience,
  image,
  description,
  submitted_by AS "submittedBy",
  TO_CHAR(submitted_on, 'YYYY-MM-DD') AS "submittedOn"
`

const getGifts = async (req, res) => {
  const search = (req.query.search ?? '').trim()

  try {
    let results

    if (search) {
      results = await pool.query(
        `SELECT ${GIFT_COLUMNS}
         FROM gifts
         WHERE name ILIKE $1
            OR audience ILIKE $1
            OR description ILIKE $1
            OR price_point = $2
         ORDER BY id ASC`,
        [`%${search}%`, search]
      )
    } else {
      results = await pool.query(`SELECT ${GIFT_COLUMNS} FROM gifts ORDER BY id ASC`)
    }

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getGiftById = async (req, res) => {
  const giftId = parseInt(req.params.giftId)

  if (Number.isNaN(giftId)) {
    return res.status(400).json({ error: 'giftId must be a number' })
  }

  try {
    const results = await pool.query(
      `SELECT ${GIFT_COLUMNS} FROM gifts WHERE id = $1`,
      [giftId]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: `No gift with id ${giftId}` })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { getGifts, getGiftById }
