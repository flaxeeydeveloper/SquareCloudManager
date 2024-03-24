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
        await interaction.deferReply({ ephemeral: true });
        const findUser: UserType = await client.prisma.sqm_users.findUnique({ where: { id: interaction.user.id }});
        const match = await comparePassword(password, findUser.password);
        if(!match)  return interaction.editReply({ content: `<:admin_purple:1211125198460551169> [SquareManager Guard] \`Your password is incorrect, please ensure you are using the correct password and try again.\``});
        if(findUser.api_key) {
            const decryptedAPIKEY = API_KEY_DecryptationHelper(interaction.user.id, findUser.api_key, password);
            client.cache._set(`${interaction.user.id}/authentication`, decryptedAPIKEY, 1500 );
            return interaction.editReply({ content: `<:admin_purple:1211125198460551169> [SquareManager Guard] \`You have been successfully authenticated, you can now use commands that interact with your SquareCloud account.\``})
        } else {
            return interaction.editReply({ content: `<:admin_purple:1211125198460551169> [SquareManager Guard] \`You haven't yet set your api key with the '/api' command.\``})
        };
        
    };
};