/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import { CommandInteraction } from "discord.js";
import ApplicationClient from "../../Core/Classes/ApplicationClient";
import commandStructure from "../../Core/Components/CommandStructure"; 
import { hashPassword } from "../../Core/Components/Encryptation";
import * as Logger from '../../Core/Components/Logger';
import type { sqm_users as UserType } from "@prisma/client";

export default class setPasswordCommand extends commandStructure {
    constructor() {
        super({
            command_name: "set-password",
            command_description: "Set your SquareCloudManager password.",
            command_memberPermissions: ['SendMessages'],
            command_isEnabled: true,
        });
    };

    buildCommand() {
        this.builder.setDMPermission(false).addStringOption(option => 
            option.setName("password")
            .setDescription("Enter a password.")
            .setRequired(true)
            .setMinLength(4)
            .setMaxLength(12)
        )
    };
    
    async handleExecution(client: ApplicationClient, interaction: CommandInteraction) {
        const password = interaction.options.get('password').value.toString();
        const hashedPassword = hashPassword(password);
        
        const findUser: UserType = await client.prisma.sqm_users.findUnique({ where: { id: interaction.user.id }});
        if(findUser && findUser.password) return interaction.reply({ content: `👀 You already have a password set, you need to reset it with the '/change-password' command, using your old password.`, ephemeral: true })
        if(findUser && !findUser.password) {
            await client.prisma.sqm_users.update({
                where: {
                    id: interaction.user.id
                },
                data: {
                    password: hashedPassword
                }
            }).then(() => {
                return interaction.reply({ content: `\`✅ Your password has been set successfully (${password.length} characters) [${password}]\``, ephemeral: true})
            }).catch((e) => {
                console.error(`${Logger.time()} ${Logger.error("ERROR")} Unable to save a user to the database: \n`+e)
                return interaction.reply({ content: `\`❌ We were unable to update your account at this time, please try again later!\``, ephemeral: true})
            });
        }

        if(!findUser) {
            await client.prisma.sqm_users.create({
                data: {
                    id: interaction.user.id,
                    blacklist: false,
                    password: hashedPassword
                }
            }).then(() => {
                return interaction.reply({ content: `\`✅ Your password has been set successfully (${password.length} characters) [${password}]\``, ephemeral: true})
            }).catch((e) => {
                console.error(`${Logger.time()} ${Logger.error("ERROR")} Unable to save a user to the database: \n`+e)
                return interaction.reply({ content: `\`❌ We were unable to create your account at this time, please try again later!\``, ephemeral: true})
            });
        }
    };
};