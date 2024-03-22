import ApplicationClient from '../Core/Classes/ApplicationClient'; /* Importing the Custom Logger */
import commandStructure from '../Core/Components/CommandStructure'; /* Importing the command structure to get types */
import * as Logger from '../Core/Components/Logger'; /* Importing the ApplicationClient class */
import { HandlerManager } from '../Core/Main'; /* Import required to capture registered commands */
import { Interaction } from 'discord.js';
import type { sqm_users as UserType } from '@prisma/client' /* Import Users type */

export default class readyEvent {
    private ApplicationClient: ApplicationClient; /* Define what is the type of ApplicationClient */
    
    constructor(ApplicationClient: ApplicationClient) {
        this.ApplicationClient = ApplicationClient;
    };

    async handleExecution(interaction: Interaction) {
        if(interaction.isCommand()) { 
            const findCommand: commandStructure = HandlerManager.commands.get(interaction.commandName); /* Looking for the command on the map */
            if(findCommand.internal_settings.command_isEnabled === false) return; /* Message with i18next for command disabled warning */

            try {
                const findUserInCache = this.ApplicationClient.cache._get(interaction.user.id); /* Looking for the user on the cache */
                let userData: UserType;
        
                if(!findUserInCache) { /* If user data is not found in cache, query the database */
                    userData = await this.ApplicationClient.prisma.sqm_users.findUnique({
                        where: {
                            id: interaction.user.id
                        }
                    })
                } else { /* If user data is found in cache, use cached data */
                    userData = findUserInCache;
                };

                if(userData && userData.blacklist === false) return findCommand.handleExecution(this.ApplicationClient, interaction); 
                if(userData && userData.blacklist === true) return interaction.reply({ content: `You are blacklisted by SquareCloud Manager, if you think this is an error, please contact the bot administrator!`, ephemeral: true })
                if(!userData) {
                  return interaction.reply(`Not registered!`)  
                };
            } catch(e) { /* Handle any errors that occur during execution */
                console.error(`${Logger.time()} [${Logger.error("ERROR")}] Event: Unable to run command '${findCommand.internal_settings.command_name}': \n`+e);
            };
        };
    };

};
