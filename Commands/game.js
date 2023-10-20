import {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
  CommandInteraction,
} from "discord.js";
import { config } from "dotenv";

config();

// Define the slash command using SlashCommandBuilder
export const data = new SlashCommandBuilder()
  .setName("dnd") // Command name that users will type
  .setDescription("Explantion of rules in Dungeons & Dragons"); // Description of the command

export async function execute(interaction) {
  //API link
  let names = [];
  let urls = [];
  let deafaultUrl = "https://www.dnd5eapi.co/api/ability-scores";

  let response = await fetch(deafaultUrl);
  let json = await response.json();

  let options = json.results;

  const buttons = new ActionRowBuilder();

  //split object data from API JSON
  for (let i = 0; i < 5; i++) {
    let { name } = options[i];
    names.push(name);
    let { url } = options[i];
    urls.push(url);

    //Make Buttons
    buttons.addComponents(
      new ButtonBuilder()
        .setCustomId(i.toString())
        .setLabel(name)
        .setStyle(ButtonStyle.Primary)
    );
  }

  //Wait for Reply
  await interaction.reply({
    content: "D&D Rules!", // Message content
    components: [buttons], // Attaching the button row to the message
  });

  //Make Sure only user can press button
  const filter = (i) => {
    return i.user.id === interaction.user.id;
  };

  //Timeout function
  const buttonInteraction = await interaction.channel
    .awaitMessageComponent({
      filter,
      componentType: ComponentType.Button,
      time: 10000, // Timeout period in milliseconds
    })
    .catch((err) => {
      // Handling the scenario where user doesn’t respond in time
      interaction.followUp("Timed Out :(");
    });
  if (!buttonInteraction) return; // Exit function if no valid interaction is collected

  //Grab choice and input url into API
  const userChoice = buttonInteraction.customId;

  let choice = Number(userChoice);
  let choiceUrl = `https://www.dnd5eapi.co${urls[choice]}`;

  //Second subcatagory for navigating API
  let response2 = await fetch(choiceUrl);
  let json2 = await response2.json();

  let { desc } = json2;
  let text = desc.toString();
  console.log(text);
  await buttonInteraction.reply(text);

  // const buttons2 = new ActionRowBuilder();

  // //split object data from API JSON
  // for (let i = 0; i < 5; i++) {
  //   let { name } = options2[i];
  //   names2.push(name);
  //   let { url } = options2[i];
  //   urls2.push(url);

  //   buttons.addComponents(
  //     new ButtonBuilder()
  //       .setCustomId(i.toString())
  //       .setLabel(name)
  //       .setStyle(ButtonStyle.Primary)
  //   );
  // }

  // //Wait for Reply 2
  // await interaction.reply({
  //   content: json2.name, // Message content
  //   components: [buttons2], // Attaching the button row to the message
  // });

  // const userChoice2 = buttonInteraction.customId;

  // let choice2 = Number(userChoice2);
  // let choiceUrl2 = `https://www.dnd5eapi.co${urls[choice2]}`;

  // let response3 = await fetch(choiceUrl2);
  // let json3 = await response3.json();

  // console.log(json3);
}
