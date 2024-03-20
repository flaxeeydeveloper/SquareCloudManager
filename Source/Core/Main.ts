/*
⚠ IMPORTANT DISCLAIMER ⚠:

⚠ ATTENTION: This project utilizes an open-source codebase created by me, Flaxeey. 
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
*/


import { GatewayIntentBits } from "discord.js";
import * as Logger from "./Components/Logger";

/* Importing the ApplicationClient class */
import ApplicationClient from "./Classes/ApplicationClient";

/* Initializing the ApplicationClient class */
const client = new ApplicationClient({ 
    intents: [
        GatewayIntentBits.Guilds, /* Intention required for everything to work as expected. */
        GatewayIntentBits.GuildMessages, /* Intention required for everything to work as expected. */
        GatewayIntentBits.GuildMessageReactions, /* Intention required for everything to work as expected. */
        GatewayIntentBits.MessageContent ] /* Intention required for everything to work as expected. */
        /* Here you can add more intents, if you modify the project and are necessary! */
});

console.log(`${Logger.time()} [${Logger.warning("WARNING")}] `)
export const HandlerManager = client.triggerHandlers(); /* Trigger Handlers and export them */
client.startBot(); /* Initialize services and initialize the application */