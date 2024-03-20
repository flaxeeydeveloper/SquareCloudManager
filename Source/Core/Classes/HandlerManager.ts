import HandlerManagerConfiguration from "../JSON/handlerManagerConfig.json"; /* Importing the HandlerManager Configuration File */
import { IHandlerManager } from "../Interfaces/IHandlerManager"; /* Importing the created interface into the HandlerManager configuration file */
import { Collection, REST, Routes } from "discord.js"; /* Importing 'collection/REST/Routes' from discord.js (map) */
import * as Logger from "../Helpers/CustomLogger"; /* Importing the Custom Logger */
import ApplicationClient from "./ApplicationClient"; /* Importing the ApplicationClient class */
import { readdir, readdirSync } from "node:fs"; /* Importing dependency necessary to perform readings */
import { resolve, join } from "node:path"; /* Importing dependency necessary to resolve paths, and incrementing paths in others */
import commandStructure from "../Helpers/CommandStructure"; /* Importing the command structure */
import "dotenv/config" /* This import is necessary to read the EnvironmentFile */

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

    loadCommands() { /* Function to register all commands present in the bot */
        return new Promise(async(res, rej) => {
            const foldersPath = resolve(join(this.handlermanager_config.commands_path)); /* Define where is commands path */
            const commandsFolder = readdirSync(resolve(foldersPath)).filter(file => !(file.endsWith(".js") || file.endsWith(".ts"))); /* Resolve/Read/Filter the commands category folder */
            for(const category of commandsFolder) {
                const commandsPath = resolve(join(this.handlermanager_config.commands_path, category)); /* Define where the category is located */
                const commandFiles = readdirSync(commandsPath).filter(file => (file.endsWith(".js") || file.endsWith(".ts"))); /* Resolve/Read/Filter the commands folder */
                for(const command of commandFiles) {
                    const commandLocation = resolve(join(commandsPath, command)); /* Define where the command is located */
                    const import_command = await import(commandLocation); /* Performing the initial import of the command */
                    const command_inicialization = new import_command.default(); /* Initializing the command class */
                    const prepared_command = command_inicialization; /* Just to look aesthetically beautiful */
                    if(prepared_command instanceof commandStructure) {
                        const data = prepared_command.builder;
                        this.applicationCommands_body.push(data.toJSON());
                        this.commands.set(prepared_command.internal_settings.command_name, prepared_command); /* Now the command is inside the commands map */
                    };
                };
            };

            try { /* Try registering slash commands */
            console.info(`${Logger.time()} [${Logger.info(`INFO`)}] Updating slash commands...`);
            
            const rest = new REST().setToken(process.env.DISCORD_TOKEN); /* Build and prepare REST */
            const data = await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_ID), { body: this.applicationCommands_body});
            console.info(`${Logger.time()} [${Logger.info(`INFO`)}] The slash commands have been updated successfully.`);
            res(this.commands);
            } catch(e) {
            /* If an error occurs, it will return in the console */
            console.error(`${Logger.time()} [${Logger.error("ERROR")}] Unable to register slash commands at this time, please try again later, if you think this is a developer issue, please contact me on discord: "flaxeeyx"`)
            process.exit(1); /* Stopping the bot, since without the commands it cannot work */
            };
        });
    };
};