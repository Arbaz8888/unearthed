# WEB103 Project 1 - *UnEarthed*

Submitted by: **Arbaz Attar**

About this web app: **UnEarthed is a crowdsourced repo of great gift ideas for different kinds of people. Browse finds by audience and price point, then open any one of them for the full story - description, who submitted it, and when. Built with a Node/Express API serving the gift data and a vanilla HTML/CSS/JavaScript frontend bundled with Vite.**

Time spent: **5** hours

## Required Features

Functionality:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view should be a unique endpoint, such as as `localhost:3000/bosses/crystalguardian` and `localhost:3000/mantislords`**
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

- [x] The web app displays items in a unique format, such as cards rather than lists or animated list items

The following **additional** features are implemented:

- [x] The Express server itself serves the 404 page on any unmatched route, so unknown URLs never fall back to Express's plain-text `Cannot GET /whatever`
- [x] The gift detail page sets the browser tab title to the gift's name
- [x] The card grid is responsive and reflows from three columns to one on narrow screens
- [x] Cards lift on hover, and price point and audience render as pill-shaped tags on the detail view
- [x] Gift images are served from the app itself rather than a third-party image host, so the site renders with no external dependencies

## Video Walkthrough

https://github.com/user-attachments/assets/fca25e2a-85e7-493f-a607-8694b7a7ad75

## Notes

A few things that took real debugging:

- **The stylesheet had to live in `client/public/`, not the client root.** Vite bundles root-level files and renames them with a content hash on every build (`index-CsUDhMuy.css`). `gift.html` and `404.html` are hand-written pages Vite never processes, so they can't know that hash. Files in `public/` are copied through untouched, which gives every page a stable `/style.css` to point at.
- **Card images silently failed while the detail-page image worked.** The cards set the image through a CSS `background-image: url(...)`, and the image URLs contained commas and a query string, which broke the unquoted `url()`. Wrapping the value in quotes fixed the parsing — but the images still didn't appear, which turned out to be a second, unrelated problem.
- **The third-party image host was rate-limiting eight simultaneous card requests.** One image loaded fine in isolation; eight at once came back empty. Downloading the images into `client/public/images/` removed the dependency entirely.
- **`npm run build` is not optional during development.** The dev server renders the home page from source, but the gift detail and 404 pages are served by Express out of `server/public`, which only exists after a build. Forgetting the build step makes "Read More" look broken.

## Running it

Two terminals.

```bash
# terminal 1 — API on http://localhost:3001
cd server
npm install
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
| `GET /gifts` | all gifts, as JSON |
| `GET /gifts/:giftId` | serves the gift detail page |
| anything else | serves the 404 page |

## License

Copyright 2026 Arbaz Attar

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
