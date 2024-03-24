/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import { CommandInteraction } from "discord.js";
import ApplicationClient from "../../Core/Classes/ApplicationClient"; /* Importing the ApplicationClient */
import commandStructure from "../../Core/Components/CommandStructure"; /* Importing the command structure */
import { API_KEY_EncryptationHelper, comparePassword } from "../../Core/Components/Encryptation";
import type { sqm_users as UserType } from "@prisma/client";
import * as Logger from '../../Core/Components/Logger';

export default class setAPIKeyCommand extends commandStructure {
    constructor() {
        super({
            command_name: "api",
            command_description: "Link API Key to your Discord account",
            command_memberPermissions: ['SendMessages'],
            command_isEnabled: true,
        });
    };

    buildCommand() {
        this.builder.setDMPermission(false).addStringOption(option => 
            option.setName("api_key")
            .setDescription("Enter your SquareCloud API Key")
            .setRequired(true)
        ).addStringOption(option => 
            option.setName("password")
            .setDescription("Enter a password.")
            .setRequired(true)
            .setMinLength(4)
            .setMaxLength(12)
        )
    };
    
    async handleExecution(client: ApplicationClient, interaction: CommandInteraction) {
        const apikey = interaction.options.get('api_key').value.toString();
        const password = interaction.options.get('password').value.toString();
        const findUser: UserType = await client.prisma.sqm_users.findUnique({ where: { id: interaction.user.id }});
        const match = await comparePassword(password, findUser.password);
        if(!match) return interaction.reply({ content: `\`❌ Unable to authenticate, password is incorrect!\``, ephemeral: true});

        await fetch('https://api.squarecloud.app/v2/user', {method: 'GET', headers: {Authorization: apikey}}).then((response) => response.json()).then(async(response: any) => {
        if(response.status === 'error' && response.code === 'ACCESS_DENIED') return interaction.reply({ content: `\`❌ Your SquareCloud API Key is invalid!\``, ephemeral: true})
        const encryptedkey = API_KEY_EncryptationHelper(interaction.user.id, apikey, password);
        
        await client.prisma.sqm_users.update({ 
            where: {
                id: interaction.user.id
            },
            data: {
                api_key: encryptedkey
            }
        }).then(() => { 
            return interaction.reply({ content: `\`✅ Your api key has been set successfully.\``, ephemeral: true})
        }).catch((e) => {
            console.error(`${Logger.time()} ${Logger.error("ERROR")} Unable to save a user to the database: \n`+e)
            return interaction.reply({ content: `\`❌ We were unable to update your account at this time, please try again later!\``, ephemeral: true})
        });
    }).catch((err) => {
            return interaction.reply({ content: `\`❌ SquareCloud service is temporarily offline!\``, ephemeral: true})
        });
    };
};

// return interaction.reply({ content: `\`✅ Your API key is valid!\``, ephemeral: true})