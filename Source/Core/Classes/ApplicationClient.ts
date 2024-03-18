import { Client, ClientOptions } from "discord.js";
import HandlerManager from "./HandlerManager";
import "dotenv/config";

export default class ApplicationClient extends Client {
    constructor(__clientOptions: ClientOptions) { super(__clientOptions) };

    startBot() { /* Initialize the application */
        this.login(process.env.DISCORD_TOKEN); /* Application Login  */
    };

    triggerHandlers() {
        const handlerManager = new HandlerManager(this); /* Initialize the HandlerManager class */
        handlerManager.loadCommands(); /* Load Commands */
        handlerManager.loadListeners(); /* Inicialize listeners */
        return handlerManager; /* Return inicializated HandlerManager class */
    };
};