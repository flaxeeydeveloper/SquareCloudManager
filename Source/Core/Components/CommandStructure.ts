/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import { PermissionResolvable, CommandInteraction, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { commandInterface } from "../Interfaces/IHandlerManager";
import ApplicationClient from '../Classes/ApplicationClient';

export default abstract class commandStructure {
    public internal_settings: commandInterface;
    readonly builder = new SlashCommandBuilder();
    constructor(internal_settings: commandInterface) { this.internal_settings = internal_settings; this.builder.setName(internal_settings.command_name).setDescription(internal_settings.command_description!).setDefaultMemberPermissions(new PermissionsBitField(internal_settings.command_memberPermissions!).bitfield); this.buildCommand()}
    abstract buildCommand(): any;
    abstract handleExecution(ApplicationClient: ApplicationClient, interaction: CommandInteraction): any;
};