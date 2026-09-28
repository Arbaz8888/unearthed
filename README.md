# WEB103 Project 2 - *UnEarthed*

Submitted by: **Arbaz Attar**

About this web app: **UnEarthed is a crowdsourced repo of great gift ideas for different kinds of people. Browse finds by audience and price point, search for a specific one, then open any find for the full story - description, who submitted it, and when. Built with a Node/Express API that reads from a Render PostgreSQL database and a vanilla HTML/CSS/JavaScript frontend bundled with Vite.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**

The following **optional** features are implemented:

- [x] The user can search for items by a specific attribute

The following **additional** features are implemented:

- [x] The detail page fetches only its own row (`GET /api/gifts/:giftId`) instead of downloading every gift and filtering in the browser
- [x] The API answers with a JSON 404 for a gift id that isn't in the table and a JSON 400 for an id that isn't a number; the detail page shows a not-found message for both
- [x] Unknown `/api/...` paths get a JSON 404, while unknown page URLs still get the styled 404 page
- [x] A results count under the search box ("3 finds for “$$”"), and clearing the box brings every gift back without a reload
- [x] `npm run reset` drops, recreates and reseeds the table from `server/data/gifts.js` in one command

## Video Walkthrough

Here's a walkthrough of implemented required features:

https://github.com/user-attachments/assets/9c1e8668-8be8-44fe-adff-a17aad602362

## Notes

**Setting up the database**

1. On [Render](https://dashboard.render.com), choose **New → PostgreSQL**, give it a name, pick the free instance, and wait until its status reads **Available**.
2. Open the database's **Connections** panel and copy the username, password, external hostname, port and database name.
3. Copy `server/.env.example` to `server/.env` and paste those values in. `server/.env` is git-ignored, so the password never reaches GitHub.
4. Create and seed the table:

```bash
cd server
npm install
npm run reset      # drops the gifts table if it exists, recreates it, inserts the 8 gifts
```

5. To see the rows the way the grader wants, paste Render's **PSQL Command** from the same Connections panel into a terminal, then run:

```sql
SELECT * FROM gifts;
```

**The table**

```sql
CREATE TABLE gifts (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  price_point   VARCHAR(10)  NOT NULL,   -- '$', '$$' or '$$$'
  audience      VARCHAR(100) NOT NULL,
  image         VARCHAR(255) NOT NULL,   -- path under /images
  description   TEXT         NOT NULL,
  submitted_by  VARCHAR(100) NOT NULL,
  submitted_on  DATE         NOT NULL
);
```

**Things that took some working out**

- **Column names vs. the frontend.** Postgres convention is `snake_case` (`price_point`), but the Part 1 frontend reads `gift.pricePoint`. Rather than touch every script, the SELECT in `server/controllers/gifts.js` renames columns on the way out (`price_point AS "pricePoint"`). The frontend never noticed the database swap.
- **Dates came back as timestamps.** A `DATE` column reaches JavaScript as a `Date` object and serialises to `2025-11-02T00:00:00.000Z`. `TO_CHAR(submitted_on, 'YYYY-MM-DD')` in the query keeps the plain date string the page already displayed.
- **SSL on Render, no SSL locally.** Render's Postgres only accepts SSL connections; a database on your own machine doesn't speak SSL at all. `server/config/database.js` turns SSL on unless `PGHOST` is `localhost`, so the same code works in both places.
- **Two routes wanted `/gifts/:id`.** Part 1 used that URL for the detail *page*. The JSON API now lives under `/api/gifts`, so `/gifts/3` still serves `gift.html` and `/api/gifts/3` serves the row. Vite's dev proxy forwards both prefixes to Express.
- **Search uses a parameterised query.** The search term goes in as `$1`, never pasted into the SQL string, so a search for `'; DROP TABLE gifts;` is just a search that finds nothing.

## Running it

Two terminals.

```bash
# terminal 1 — API on http://localhost:3001
cd server
npm install
npm run reset      # only needed the first time, or to reseed
npm start

# terminal 2 — frontend on http://localhost:5173
cd client
npm install
npm run build
npm run dev
```

| Route | What it does |
| --- | --- |
| `GET /` | API banner |
| `GET /api/gifts` | all gifts, as JSON |
| `GET /api/gifts?search=term` | gifts whose name, audience or description contains `term`, or whose price point equals it |
| `GET /api/gifts/:giftId` | one gift as JSON, or a JSON 404 |
| `GET /gifts/:giftId` | serves the gift detail page |
| anything else | the 404 page (JSON under `/api`) |

## License

Copyright 2026 Arbaz Attar

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
