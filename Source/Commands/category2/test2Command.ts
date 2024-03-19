import { CommandInteraction } from "discord.js";
import ApplicationClient from "../../Core/Classes/ApplicationClient";
import commandStructure from "../../Core/Helpers/CommandStructure";

export default class testCommand extends commandStructure {
    constructor() {
        super({
            command_name: "commandname2",
            command_description: "command description2",
            command_memberPermissions: ['SendMessages'],
            command_isEnabled: true,
        });
    };

    buildCommand() {
        this.builder.setDMPermission(false);
    };
    
    async handleExecution(client: ApplicationClient, interaction: CommandInteraction) {

    }
}