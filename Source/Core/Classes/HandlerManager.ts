import HandlerManagerConfiguration from "../JSON/handlerManagerConfig.json"; /* Importing the HandlerManager Configuration File */
import IHandlerManager from "../Interfaces/IHandlerManager"; /* Importing the created interface into the HandlerManager configuration file */
import * as Logger from "../Components/CustomLogger"; /* Importing the Custom Logger */
import ApplicationClient from "./ApplicationClient"; /* Importing the ApplicationClient class */
import { Collection } from "discord.js"; /* Importing 'collection' from discord.js (map) */
import { resolve, join } from "path"; /* Importing dependency necessary to resolve paths, and incrementing paths in others */
import { readdir } from "fs"; /* Importing dependency necessary to perform readings */

export default class HandlerManager {
    public handlermanager_config: IHandlerManager; /* Define what is the type of handlermanager_config */
    public commands: Collection<string, any>; /* An collection to store commands */
    private applicationCommands_body = []; /* Array to hold application commands body (slash_commands register) */
    private ApplicationClient: ApplicationClient; /* Define what is the type of ApplicationClient */

    constructor(ApplicationClient: ApplicationClient) {
        this.ApplicationClient = ApplicationClient;
        this.handlermanager_config = HandlerManagerConfiguration; /* Defining the configuration file inside the class */
        this.commands = new Collection<string, any>(); // Defining the Collection for commands storage
    };

    loadListeners() { /* Function to record all events present in the folder defined in the configuration file */
        readdir(resolve(this.handlermanager_config.events_path), (err, files) => { /* Starting reading from the defined path */
            if(err) {
                console.error(`${Logger.time()} [${Logger.error(`ERROR`)}] An error occurred when trying to read the folder responsible for storing the events, if you are unable to do this, try calling me on discord so I can help you with this. (Discord: flaxeeyx)`); /* Error Message */
                process.exit(1); /* Stopping the bot, since without the events it cannot work */
            };
            files.forEach(async(event) => { /* Preparing events to register them on the client */
                const import_event = await import(resolve(this.handlermanager_config.events_path, event)); /* Performing the initial import of the event */
                const event_inicialization = new import_event.default(this.ApplicationClient); /* Initializing the event class */
                const prepared_event = event_inicialization; /* Just to look aesthetically beautiful */
                const eventName = event.split(".")[0]; /* Capturing only the event name */
                console.info(`${Logger.time()} [${Logger.info(`INFO`)}] The event '${eventName}' has been loaded.`); /* Notify in the console that the command has been loaded */
                this.ApplicationClient.on(eventName, (...args) => prepared_event.handleExecution(...args)); /* The event is already inside the client */
            });
        });
    };
};