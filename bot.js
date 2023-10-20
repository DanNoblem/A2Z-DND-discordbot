import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import * as update from "./Commands/update.js";
import * as game from "./Commands/game.js";

config(); // Using dotenv config function directly

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyDiscord);

// Login to Discord with your client's token
client.login(process.env.TOKEN);

function readyDiscord() {
  console.log("💖");
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "update") {
    await update.execute(interaction);
  } else if (interaction.commandName === "dnd") {
    await game.execute(interaction);
  }
});
