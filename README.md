# UOA Snowsports Club Website & Booking System

Project initiated by WDCC in 2023.

## Team Leadership

- Bill Wong (Project Manager)
- Tony Feng (Tech Lead)

## Team Members

- Atharva Arankalle
- Campbell Wood
- Edward Li
- Mitchell Wong
- Selin Akkaya
- Tony Yin
- Zaid Mustafa

## About

**2023:** This project is focused on developing a new website for the University of Auckand's Snowsports Club (UASC) from their existing website,
with the purpose of improving bookings for both users and admins.

**2024:** We are focused on providing a functional membership management system for UASC

Tech Stack:

- React
- Express
- Firebase
- Stripe
- tsoa

Material UI is used as the styling library.

## Getting Started

To begin, run `yarn` at the root (the directory this `README.md` is in). This will install all the dependencies used for this project.

If you are using VS Code run `yarn vsc-setup` which will install ESLint and Prettier. Other environments like nvim please refer to relevant documentation to set this up. Setting up auto formatting is recommended (for VSC: `File > Preferences > Settings > Text Editor > Formatting`)

We are using **yarn workspaces** so if you want to (run all these commands from the root if possible):

**Add any packages:**

- To add to the client (frontend) run `yarn workspace client add <package-name> <--dev>(if dev dependency)`
- To add to the server (backend) run `yarn workspace server add <package-name> <--dev>(if dev dependency)`

**Run the dev environment:**

- Start client (frontend) run `yarn dev-client`
- Start server (backend) run `yarn dev-server`

## Pre commit hooks

We use `husky` to run linters and formatters on each commit to help ensure that code quality is maintained before pushes. These will be done automatically, however if your device is ~~trash~~ slow then it is acceptable to add `--no-verify` to the end of your `git commit`. However if you are going to push the commit(s) avoid doing this and allow the precommits to run before you push.

## Code generation

We make use of `openapi-typescript` to create types for the frontend (based on `swagger.json`) when calling our backend API and `tsoa` to automatically generate routes for our express application and create a `swagger.json`.

- To generate types for the frontend run `yarn workspace client generate-types`
- To generate routes for the backend run `yarn workspace server tsoa spec-and-routes`

**Note:** this is automatically handled when running the dev commands

## Testing

Testing is handled with jest and tests should be written where possible

To test everything, run `yarn test`. Otherwise find the relative path of the file to test use `yarn test <relative-file-path>`

## ENV File format

**Client**:

```
VITE_FIREBASE_API_KEY=
VITE_ENV=
VITE_BACKEND_BASE_URL=
```

**Server**:

```
DEV=
```
