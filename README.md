# Adult Manhwa/Manga Scrapper API

Manhwa/Manga Scrapper from manhwa18.net based on cheerio and node.js

## Test Url

manhwa-reader.vercel.app/api/

## Installing

    npm install
    node api
    
## Endpoints

Latest Chapters at: `/api/latest/:page` (example: `/api/latest/1`) 

All Manhwa List at: `/api/all` 

Manhwa Info + Chapters at: `/api/info/:slug` (example: `/api/info/manga-secret-class` [without .html]) 

Manhwa Images List at: `/api/chapter/:slug` (example: `/api/chapter/read-secret-class-chapter-1` [without .html])

## Note

Works well on vercel, added caching on the chapter pages.
