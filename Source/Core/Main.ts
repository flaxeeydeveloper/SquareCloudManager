import { GatewayIntentBits } from "discord.js";

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