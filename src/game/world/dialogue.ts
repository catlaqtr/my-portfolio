import oldman from "../../assets/game/faces/oldman.png";
import gladiator from "../../assets/game/faces/gladiator.png";
import princess from "../../assets/game/faces/princess.png";
import monk from "../../assets/game/faces/monk.png";
import inspector from "../../assets/game/faces/inspector.png";
import woman from "../../assets/game/faces/woman.png";
import villager3 from "../../assets/game/faces/villager3.png";
import villager4 from "../../assets/game/faces/villager4.png";
import type { NpcId } from "./layout";

export interface Dialogue {
  /** Villagers are fictional; what they say about Mete is drawn from the portfolio content. */
  name: string;
  portrait: string;
  lines: string[];
}

export const dialogue: Record<NpcId, Dialogue> = {
  guide: {
    name: "Elder Rowan",
    portrait: oldman,
    lines: [
      "Welcome to Hearthvale, traveller! This whole village is Mete Ünal's portfolio.",
      "Walk with WASD or the arrow keys. Stand by a door or a villager and press E, Space or Enter.",
      "North-west is the ArcClash Arena and north-east the AnimeGuess Arcade. The Skills Academy is west, the Contact Center east, and Mete's house is south.",
      "In a hurry? Open the Map at the top of the screen, or switch to Recruiter Mode for the classic portfolio.",
    ],
  },
  gladiator: {
    name: "Brakka",
    portrait: gladiator,
    lines: [
      "ArcClash is still being forged. Mete is building its duel engine in Java 21 and Spring Boot.",
      "Each duel you pick a hidden fighter, a stance and maybe a magic card. Then both sides reveal at once!",
    ],
  },
  arcadeFan: {
    name: "Mika",
    portrait: princess,
    lines: [
      "In AnimeGuess you ask an AI yes-or-no questions until you can name the hidden anime character.",
      "My favourite is the Daily Challenge: everyone gets the same character that day.",
    ],
  },
  scholar: {
    name: "Brother Tomas",
    portrait: monk,
    lines: [
      "The Academy keeps a record of Mete's skills: Java and Spring Boot on the back end, React and TypeScript on the front end, and the tools in between.",
      "Skills marked \"currently learning\" are still in training. Everything else has been used in real projects.",
    ],
  },
  postmaster: {
    name: "Postmaster Quill",
    portrait: inspector,
    lines: [
      "Hoping to reach Mete? The Contact Center has the resume, email, GitHub, LinkedIn and more.",
    ],
  },
  neighbour: {
    name: "Hana",
    portrait: woman,
    lines: [
      "That cottage is Mete's. Step inside to hear how a Geography graduate from Istanbul University became a software developer.",
    ],
  },
  angler: {
    name: "Jun",
    portrait: villager3,
    lines: [
      "Quiet by the pond, isn't it? Fun fact: this village runs on Phaser, with React drawing the menus.",
    ],
  },
  townsfolk: {
    name: "Pip",
    portrait: villager4,
    lines: [
      "Every road in Hearthvale starts at this fountain. Hard to get lost!",
    ],
  },
};
