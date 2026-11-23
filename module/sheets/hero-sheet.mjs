export class HeroKidsActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["herokids", "sheet", "actor"],
      template: "systems/herokids/templates/actor/hero-sheet.hbs",
      width: 560,
      height: 520,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "actions" }]
    });
  }

  getData() {
    const context = super.getData();
    context.system = this.actor.system;
    context.powers = this.actor.items.filter(i => i.type === "power");
    context.equipment = this.actor.items.filter(i => i.type === "equipment");
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    // Clickable dice pool buttons
    html.find(".roll-pool").click(ev => {
      ev.preventDefault();
      const pool = ev.currentTarget.dataset.pool;
      this.actor.rollPool(pool);
    });

    // Item creation & deletion
    html.find(".item-create").click(this._onItemCreate.bind(this));
    html.find(".item-delete").click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item?.delete();
    });
    html.find(".item-edit").click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item?.sheet.render(true);
    });
  }

  async _onItemCreate(event) {
    event.preventDefault();
    const type = event.currentTarget.dataset.type;
    return await Item.create({ name: `New ${type}`, type }, { parent: this.actor });
  }
}