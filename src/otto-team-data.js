import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

class Team {
  constructor(name, staffs) {
    this.name = name
    this.staffs = staffs || []
  }
}

export class OttoTeamData extends PolymerElement {
  static get properties() {
    const team = new Team('Otto')

    return {
      team: {
        type: Object,
        value: team,
        notify: true
      }
    }
  }
}

customElements.define('otto-team-data', OttoTeamData)
