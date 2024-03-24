import ApplicationClient from '../Core/Classes/ApplicationClient'; /* Importing the Custom Logger */
import commandStructure from '../Core/Components/CommandStructure'; /* Importing the command structure to get types */
import * as Logger from '../Core/Components/Logger'; /* Importing the ApplicationClient class */
import { HandlerManager } from '../Core/Main'; /* Import required to capture registered commands */
import { Interaction, EmbedBuilder, CommandInteraction } from 'discord.js';
import type { sqm_users as UserType } from '@prisma/client' /* Import Users type */

export default class readyEvent {
    private ApplicationClient: ApplicationClient;
    
    constructor(ApplicationClient: ApplicationClient) {
        this.ApplicationClient = ApplicationClient;
    };

    async handleExecution(interaction: Interaction) {
        if(interaction.isCommand()) { 
            const findCommand: commandStructure = HandlerManager.commands.get(interaction.commandName); 
            if(findCommand.internal_settings.command_isEnabled === false) return; 

            try {
                const findUserInCache = this.ApplicationClient.cache._get(interaction.user.id);
                let userData: UserType;

                if(!findUserInCache) { 
                    await this.ApplicationClient.prisma.sqm_users.findUnique({
                        where: {
                            id: interaction.user.id
                        }
                    }).then((data: UserType) => { 
                        userData = data;
                        this.ApplicationClient.cache._set(interaction.user.id, data, 60);
                    });
                } else { 
                    userData = findUserInCache;
                };
                
                if(userData && userData.blacklist === true) return interaction.reply({ content: "`❌ You are permanently suspended from using any commands available on this bot!`", ephemeral: true })
                if(userData && !userData.password && findCommand) return this.unableToFindUserOrPassword(findCommand, interaction);
                if(userData && userData.blacklist === false) return findCommand.handleExecution(this.ApplicationClient, interaction); 
                if(!userData) return this.unableToFindUserOrPassword(findCommand, interaction);
            } catch(e) { /* Handle any errors that occur during execution */
                console.error(`${Logger.time()} [${Logger.error("ERROR")}] Event: Unable to run command '${findCommand.internal_settings.command_name}': \n`+e);
            };
        };
    };

    private unableToFindUserOrPassword(findCommand: commandStructure, interaction: CommandInteraction) {
        if(findCommand.internal_settings.command_name === 'set-password') return findCommand.handleExecution(this.ApplicationClient, interaction);
        const notRegisteredEmbed = new EmbedBuilder() 
        .setTitle("❌ It looks like you haven't registered yet!")
        .setDescription("👀 You must use the '/password' command to register your account, it will not be visible to other people in your chat, or even the developer of this application.\n\n\n:warning: As the creator of this Discord bot, I've developed it to enhance your experience on the platform.\nHowever, I want to emphasize that while this bot is open source and freely available for use, I cannot accept responsibility for any misuse or unintended consequences that may arise from its usage.\nI encourage users to utilize this bot responsibly and within the guidelines of the Discord platform. Thank you for your understanding.")
        .setFooter({ text: "This project is not licensed by SquareCloud (Not made by official developers of the company)" })
        .setThumbnail("https://media.licdn.com/dms/image/D4D0BAQFdhJRqHn9thA/company-logo_200_200/0/1688863060544/squarecloud_logo?e=2147483647&v=beta&t=7ei8i05-qw_nPuNVKSKRcT5dRW05_aWemZST6JtA8Pg")
        .setColor("White");
        return interaction.reply({ embeds: [notRegisteredEmbed], ephemeral: true });
    }

};
