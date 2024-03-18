import { Client, ClientOptions } from "discord.js";
import HandlerManager from "./HandlerManager";
import "dotenv/config";

export default class ApplicationClient extends Client {
    constructor(__clientOptions: ClientOptions) { super(__clientOptions) };

    startServices() { /* Initialize the services, and initialize the application */
        const handlerManager = new HandlerManager(this); /* Initialize the HandlerManager class */
        handlerManager.loadListeners();
        this.login(process.env.DISCORD_TOKEN);
    };
};