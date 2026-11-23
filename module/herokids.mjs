import { HeroKidsActor } from "./documents/actor.mjs";
import { HeroKidsActorSheet } from "./sheets/hero-sheet.mjs";

Hooks.once("init", async function () {
  console.log("Hero Kids | Initializing System");

  CONFIG.Actor.documentClass = HeroKidsActor;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("herokids", HeroKidsActorSheet, {
    types: ["hero", "monster"],
    makeDefault: true
  });
});