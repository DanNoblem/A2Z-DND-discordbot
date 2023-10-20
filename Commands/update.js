// Importing modules using ES6 syntax
import { SlashCommandBuilder } from "discord.js";

// Replies array
const replies = [
  "Update: you did it",
  "Update: Nice work!",
  "Update: Congrats!",
];

// Command Builder export
export const data = new SlashCommandBuilder()
  .setName("update")
  .setDescription("Update on the update");

// Execute function export
export async function execute(interaction) {
  const index = Math.floor(Math.random() * replies.length);
  await interaction.reply(replies[index]);
}
