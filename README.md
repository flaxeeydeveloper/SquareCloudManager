# SquareCloud Manager
> ⚠️ This project is not part of an official application made by SquareCloud


This project was created using the [official api](https://github.com/squarecloudofc/wrapper-api-js) provided by SquareCloud.

---

With this application you can:
- [x] Start/Restart/Stop your application;
- [x] View logs from your hosted application;
- [x] View the file structure of your application;
- [x] Back up your application (if your plan allows it);
- [x] Is it possible to upload/commit via Discord;

> ⚠️ It is important to remember that errors can happen, and your report is necessary so that the problem can be resolved.

---
### 🤔 How to install?

### `1 -` 🛠️ Install runtimes and tools:
- [NodeJS](https://nodejs.org/pt-br/) | Perform a common installation of node.js (chocolatey is not necessary, present in the installation).
- [PostgreSQL](https://www.postgresql.org/download/) | Make the installation that suits you, you only need the connection link in the future.
### `2 - ` 📁 Clone the project (with git)
```bash
git clone https://github.com/flaxeeydeveloper/SquareCloudManager
```
### `3- ` Install project dependencies (npm/yarn)
```bash
# choose one.
npm install # This will download all the necessary packages (dependencies).
yarn # This will download all the necessary packages (dependencies).
```
### `4- ` Configure the enviroment file (.env)
```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN_GOES_HERE
DATABASE_URL=YOUR_DATABASE_URL_GOES_HERE
```

> ⚠️ Afthr this, rename the .env.example to .env (If you don't do this the bot won't work)

### `5 -` Start the bot
```bash
# With npm
npm run sqm_application
# With yarn
yarn run sqm_application
