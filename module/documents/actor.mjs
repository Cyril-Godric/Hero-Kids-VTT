export class HeroKidsActor extends Actor {
  /**
   * Roll a Hero Kids dice pool (Melee, Ranged, Magic, or Armor).
   * 1+ dice = roll Nd6 and keep highest (Nd6kh).
   * 0 dice = roll 2d6 and keep lowest (2d6kl).
   */
  async rollPool(poolKey) {
    const poolCount = Number(this.system.pools?.[poolKey] ?? 0);
    const label = poolKey.charAt(0).toUpperCase() + poolKey.slice(1);

    let formula = poolCount > 0 ? `${poolCount}d6kh` : "2d6kl";
    let modeText = poolCount > 0 ? `${poolCount}d6 (Keep Highest)` : "0 Dice (Disadvantage: 2d6 Keep Lowest)";

    const roll = new Roll(formula, this.getRollData());
    await roll.evaluate();

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `<strong>${label} Check</strong><br><small>${modeText}</small>`
    });

    return roll;
  }
}