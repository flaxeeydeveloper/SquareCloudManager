/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import { CommandInteraction, EmbedBuilder } from "discord.js";
import ApplicationClient from "../../Core/Classes/ApplicationClient";
import commandStructure from "../../Core/Components/CommandStructure"; 
import * as Logger from '../../Core/Components/Logger';

export default class profileCommand extends commandStructure {
    constructor() {
        super({
            command_name: "profile",
            command_description: "View your SquareCloud Profile",
            command_memberPermissions: ['SendMessages'],
            command_isEnabled: true,
        });
    };

    buildCommand() {
        this.builder.setDMPermission(false)
    };
    
    async handleExecution(client: ApplicationClient, interaction: CommandInteraction) {
        await interaction.deferReply({ ephemeral: true });
        const AuthorizationFinder = await client.cache._get(`${interaction.user.id}/authentication`);
        if(!AuthorizationFinder) return interaction.editReply(`<:admin_purple:1211125198460551169> [SquareManager Guard] \`You are not authenticated, use the '/authenticate <password>' command to enable the user commands.\``)
        interaction.editReply({ content: `<a:Loading:1221522294825025747> [INFO] Did you know that your SquareCloud API key and password are encrypted?`});
        setTimeout(async() => { 
            await fetch('https://api.squarecloud.app/v2/user', {method: 'GET', headers: {Authorization: AuthorizationFinder}}).then((response) => response.json()).then((response: any) => {
                if(response.status === 'error' && response.code === 'ACCESS_DENIED') return interaction.editReply({ content: `\`❌ Your SquareCloud API Key is invalid!\``})    
                const user = response.response.user;
                const applications = response.response.applications;
                const accountEmbed = new EmbedBuilder()
                .setTitle(`Application Manager - View Profile`)
                .setDescription(`<:member_purple:1221525848549621913> Owner ${user.tag} (<:copy_id:1221525296067645592> ${user.id})\n<:announce_purple:1221525933861634108> Owner Email: ${user.email}\n\n<:arrowpurple:1221538709263089825> Plan: **${user.plan.name.toUpperCase()}**\n\n<:memory:1221539798091829369> RAM Limit: **${user.plan.memory.limit}MB**\n<:memory:1221539798091829369> RAM Used: **${user.plan.memory.used}MB**\n<:memory:1221539798091829369> RAM Available: **${user.plan.memory.available}MB**\n\n<:application_bot:1221529248838324236> Total Applications: **${applications.length}**`)
                .setFooter({ text: "This project is not licensed by SquareCloud (Not made by official developers of the company)" })
                .setThumbnail("https://media.licdn.com/dms/image/D4D0BAQFdhJRqHn9thA/company-logo_200_200/0/1688863060544/squarecloud_logo?e=2147483647&v=beta&t=7ei8i05-qw_nPuNVKSKRcT5dRW05_aWemZST6JtA8Pg")
                .setColor("White");
                return interaction.editReply({ content: ``, embeds: [accountEmbed] })
            }).catch((e) => {
                console.error(`${Logger.time()} [${Logger.error("ERROR")}] It looks like the SquareCloud service is having problems... `+e);
                return interaction.editReply({ content: `<:Time_Out:1221525502909481102> An error occurred while the bot was interacting with the SquareCloud API, please try again later.` })
            });
        }, 3000)
    };
};