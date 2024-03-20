import ApplicationClient from '../Core/Classes/ApplicationClient'; /* Importing the Custom Logger */
import commandStructure from '../Core/Components/CommandStructure'; /* Importing the command structure to get types */
import * as Logger from '../Core/Components/Logger'; /* Importing the ApplicationClient class */
import { HandlerManager } from '../Core/Main'; /* Import required to capture registered commands */
import { CommandInteraction, Interaction } from 'discord.js';

export default class readyEvent {
    private ApplicationClient: ApplicationClient; /* Define what is the type of ApplicationClient */
    
    constructor(ApplicationClient: ApplicationClient) {
        this.ApplicationClient = ApplicationClient;
    };

    handleExecution(interaction: Interaction) {
        if(interaction.isCommand()) { this.handleCommandExecution(interaction) };
    };

    private handleCommandExecution(interaction: CommandInteraction) {
        const findCommand: commandStructure = HandlerManager.commands.get(interaction.commandName); /* Looking for the command on the map */
        if(findCommand.internal_settings.command_isEnabled === false) return; /* Message with i18next for command disabled warning */
        try {
            findCommand.handleExecution(this.ApplicationClient, interaction); /* Execute command */
        } catch(e) {
            console.error(`${Logger.time()} [${Logger.error("ERROR")}] Unable to run command '${findCommand.internal_settings.command_name}': \n`+e);
        };
    };
};