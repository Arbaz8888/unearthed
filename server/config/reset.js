import { pool } from './database.js'
import giftData from '../data/gifts.js'

const createGiftsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price_point VARCHAR(10) NOT NULL,
      audience VARCHAR(100) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      submitted_by VARCHAR(100) NOT NULL,
      submitted_on DATE NOT NULL
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 gifts table created successfully')
  } catch (error) {
    console.error('⚠️ error creating gifts table', error)
    throw error
  }
}

const seedGiftsTable = async () => {
  const insertQuery = `
    INSERT INTO gifts (name, price_point, audience, image, description, submitted_by, submitted_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `

  for (const gift of giftData) {
    const values = [
      gift.name,
      gift.pricePoint,
      gift.audience,
      gift.image,
      gift.description,
      gift.submittedBy,
      gift.submittedOn
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`✅ ${gift.name} added successfully`)
    } catch (error) {
      console.error(`⚠️ error inserting ${gift.name}`, error)
      throw error
    }
  }
}

const reset = async () => {
  try {
    await createGiftsTable()
    await seedGiftsTable()
  } finally {
    await pool.end()
  }
}

reset()
