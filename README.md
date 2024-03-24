# SquareCloud Manager
> ⚠️ This project is not part of an official application made by SquareCloud


This project was created using the [official api](https://github.com/squarecloudofc/wrapper-api-js) provided by SquareCloud.

---

With this application you can:
- [x] View your account details;
- [] Start/Restart/Stop your application;
- [] View logs from your hosted application;
- [] View the file structure of your application;
- [] Back up your application (if your plan allows it);
- [] Is it possible to upload/commit via Discord;

> ⚠️ It is important to remember that errors can happen, and your report is necessary so that the problem can be resolved (Some functions are still under development).

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
DISCORD_BOT_ID=YOUR_DISCORD_BOT_ID_GOES_HERE
DATABASE_URL=YOUR_DATABASE_URL_GOES_HERE
```

> ⚠️ Afthr this, rename the .env.example to .env (If you don't do this the bot won't work)

### `5 -` Start the bot
```bash
# With npm
npm run sqm_application
# With yarn
yarn run sqm_application
```

---

### ⚠️ IMPORTANT DISCLAIMER ⚠️

**ATTENTION**: This project utilizes an open-source codebase created by me, Flaxeey. 
While it has been developed with the intention of providing a secure and efficient solution,
I cannot be held liable for any misuse or consequences resulting from the improper use of this application.

Please be aware that malicious individuals may potentially modify this source code to gain unauthorized access to your sensitive data, 
including Square Cloud API keys. It is highly recommended to implement robust security practices, such as strong authentication and constant monitoring, 
to safeguard your information.

Always remember to keep your API keys and confidential information in a secure location and never share them publicly.
If you suspect any security compromise, take immediate steps to mitigate risks and protect your data.

If you have any questions or concerns about the security of this project, feel free to contact me in discord (flaxeeyx).

Thank you for using this application and for your understanding.

Best regards,
flaxeeydeveloper (https://github.com/flaxeeydeveloper)