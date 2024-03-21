import { CommandInteraction } from "discord.js";
import ApplicationClient from "../../Core/Classes/ApplicationClient"; /* Importing the ApplicationClient */
import commandStructure from "../../Core/Components/CommandStructure"; /* Importing the command structure */

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
        this.builder.setDMPermission(false);
    };
    
    async handleExecution(client: ApplicationClient, interaction: CommandInteraction) {
        
    }
}