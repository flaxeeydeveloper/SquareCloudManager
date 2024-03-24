/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import { CommandInteraction } from "discord.js";
import ApplicationClient from "../../Core/Classes/ApplicationClient";
import commandStructure from "../../Core/Components/CommandStructure";
import { hashPassword, comparePassword, API_KEY_DecryptationHelper } from "../../Core/Components/Encryptation";
import * as Logger from '../../Core/Components/Logger';
import type { sqm_users as UserType } from "@prisma/client";

export default class changePasswordCommand extends commandStructure {
    constructor() {
        super({
            command_name: "change-password",
            command_description: "Change your SquareCloudManager password.",
            command_memberPermissions: ['SendMessages'],
            command_isEnabled: true,
        });
    };

    buildCommand() {
        this.builder.setDMPermission(false).addStringOption(option => 
            option.setName("old-password")
            .setDescription("Enter old password.")
            .setRequired(true)
            .setMinLength(4)
            .setMaxLength(12)
        ).addStringOption(option => 
            option.setName("new-password")
            .setDescription("Enter a new password.")
            .setRequired(true)
            .setMinLength(4)
            .setMaxLength(12)
        )
    };
    
    async handleExecution(client: ApplicationClient, interaction: CommandInteraction) {
        const oldPassword = interaction.options.get('old-password').value.toString();
        const newPassword = interaction.options.get('new-password').value.toString();
        await interaction.deferReply({ ephemeral: true });

        const newHashedPassword = hashPassword(newPassword);
        const findUser: UserType = await client.prisma.sqm_users.findUnique({ where: { id: interaction.user.id }});
        const match = await comparePassword(oldPassword, findUser.password)

        if(!match) return interaction.editReply({ content: `<:admin_purple:1211125198460551169> [SquareManager Guard] \`Your password is incorrect, please ensure you are using the correct password and try again.\``})
    
        await client.prisma.sqm_users.update({
            where: {
                id: interaction.user.id
            },
            data: {
                password: newHashedPassword
            }
        }).then(() => {
            return interaction.editReply({ content: `<:admin_purple:1211125198460551169> [SquareManager Guard] \`Your new password has been set successfully.\``})
        }).catch((e) => {
            console.error(`${Logger.time()} ${Logger.error("ERROR")} Unable to update user to the database: \n`+e)
            return interaction.editReply({ content: `<:admin_purple:1211125198460551169> [SquareManager Guard] \`Unable to complete changes at this time, please try again later.\``})
        });
    };
};