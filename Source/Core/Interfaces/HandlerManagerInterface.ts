/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import { PermissionResolvable } from "discord.js";

/* Exporting interface of what the HandlerManager configuration file should look like  */
export interface IHandlerManager {
    commands_path: string | "./Source/Commands"; /* If the value does not exist, "./Source/Commands" is the default */
    events_path: string | "./Source/Events"; /* If the value does not exist, "./Source/Events" is the default */
};


export interface commandInterface {
    command_name: string; /* This is part of the project structure, it is not necessary to modify it */
    command_description: string | "No description."; /* This is part of the project structure, it is not necessary to modify it */
    command_memberPermissions: PermissionResolvable; /* This is part of the project structure, it is not necessary to modify it */
    command_isEnabled?: boolean | true; /* This is part of the project structure, it is not necessary to modify it */
}; 