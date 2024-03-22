import { Client, ClientOptions } from "discord.js";
import { PrismaClient } from "@prisma/client";
import HandlerManager from "./HandlerManager";
import { CacheManager } from "./CacheManager";
import "dotenv/config";

export default class ApplicationClient extends Client {
    cache: CacheManager;
    prisma: PrismaClient;
    constructor(__clientOptions: ClientOptions) { 
        super(__clientOptions); 
        this.cache = new CacheManager();
    };

    startBot() { /* Initialize the application */
        this.login(process.env.DISCORD_TOKEN); /* Application Login  */
    };

    triggerHandlers() {
        const handlerManager = new HandlerManager(this); /* Initialize the HandlerManager class */
        handlerManager.loadCommands().then(async() => { /* Load/Register Commands */
            handlerManager.loadListeners(); /* Inicialize listeners */
        }); 
        return handlerManager; /* Return inicializated HandlerManager class */
    };
};