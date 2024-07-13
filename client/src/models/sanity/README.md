# `client/src/models/sanity`

This is where all the sanity related models should be exported from

Under `client/src/models/sanity/[SchemaName]/Schema` need to export:

- Schema for sanity client (using `defineField`)

> [!IMPORTANT]
> After creating this schema need to import it in `client\sanity\schema.ts`

Under `client/src/models/sanity/[SchemaName]/Utils` need to export:

- ts type (for static fetching)
- Relevant queries for that schema (for our use cases its pretty much only going to be getting all of them)
  - cheat sheet: https://www.sanity.io/docs/query-cheat-sheet

> This extra file exists to avoid dependency on sanity in the about page which was causing build errors
