/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import { CommandInteraction } from "discord.js";
import ApplicationClient from "../../Core/Classes/ApplicationClient";
import commandStructure from "../../Core/Components/CommandStructure"; 
import { API_KEY_DecryptationHelper, comparePassword } from "../../Core/Components/Encryptation";
import * as Logger from '../../Core/Components/Logger';
import type { sqm_users as UserType } from "@prisma/client";
import dayjs from "dayjs";

export default class authenticateCommand extends commandStructure {
    constructor() {
        super({
            command_name: "authenticate",
            command_description: "Authenticate with your SquareCloudManager password.",
            command_memberPermissions: ['SendMessages'],
            command_isEnabled: true,
        });
    };

    buildCommand() {
        this.builder.setDMPermission(false).addStringOption(option => 
            option.setName("password")
            .setDescription("Enter your password.")
            .setRequired(true)
            .setMinLength(4)
            .setMaxLength(12)
        )
    };
    
    async handleExecution(client: ApplicationClient, interaction: CommandInteraction) {
        const password = interaction.options.get('password').value.toString();
        const findUser: UserType = await client.prisma.sqm_users.findUnique({ where: { id: interaction.user.id }});
        const match = await comparePassword(password, findUser.password);
        if(!match) return interaction.reply({ content: `\`❌ Unable to authenticate, password is incorrect!\``, ephemeral: true});

        await client.prisma.sqm_users.update({ 
            where: {
                id: interaction.user.id
            },
            data: {
                lastLogin: dayjs().toString()
            }
        }).then((data: UserType) => {
            if(data.api_key) {
                const decryptedAPIKEY = API_KEY_DecryptationHelper(interaction.user.id, data.api_key, password);
                client.cache._set(`${interaction.user.id}/authentication`, decryptedAPIKEY, 60);
            }
            return interaction.reply({ content: `\`✅ You are authenticated, you have free use of commands for 25 minutes.\``, ephemeral: true})
        }).catch((e) => {
            console.error(`${Logger.time()} ${Logger.error("ERROR")} Unable to save a user to the database: \n`+e)
            return interaction.reply({ content: `\`❌ Unable to  authenticate at this time, please try again later\``, ephemeral: true})
        });
    };
};