import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'
import {mixinBehaviors} from '../node_modules/@polymer/polymer/lib/legacy/class'
import {PaperDialogBehavior} from '../node_modules/@polymer/paper-dialog-behavior/paper-dialog-behavior'
import {NeonAnimationRunnerBehavior} from '../node_modules/@polymer/neon-animation/neon-animation-runner-behavior.js'

import {uniq} from '../node_modules/lodash/lodash'

import '../node_modules/@polymer/paper-dialog-behavior/paper-dialog-shared-styles'
import '../node_modules/@polymer/paper-button/paper-button'

import './shared-styles'

export class OttoTimeSlotDialog extends mixinBehaviors([PaperDialogBehavior, NeonAnimationRunnerBehavior], PolymerElement) {
  static get template() {
    return `
    <style include="paper-dialog-shared-styles shared-styles">
      .content {
        display: flex;
        flex-direction: column;
      }

      .role {
        font-weight: bold;
      }

      .staff {
        position: relative;
      }

      .staff:not(:last-of-type) {
        margin-right: 4px;
      }

      .staff:not(:last-of-type)::after {
        position: absolute;
        right: -4px;
        display: block;
        content: ',';
      }
    </style>
    
    <div class="content">
      <h1>[[day]] - [[time]]</h1>

      <template is="dom-if" if="{{timeSlot.anyStaffRequired}}">
        <h2>Required staff</h2>
        <template is="dom-repeat" items="{{timeSlot.requiredStaffs}}" as="requiredStaff">
          <div>
            <span class="role">[[requiredStaff.role]]:</span>
            <span>[[requiredStaff.quantity]]</span>
          </div>
        </template>
      </template>

      <template is="dom-if" if="{{timeSlot.anyStaffScheduled}}">
        <h2>Scheduled staff</h2>
        <template is="dom-repeat" items="{{scheduledStaffRoles}}" as="role">
          <div>
            <span class="role">[[role.name]]:</span>
            <template is="dom-repeat" items="{{role.staffs}}" as="staff">
              <span class="staff">[[staff.fullName]]</span>
            </template>
          </div>
      </template>
    </template>
    </div>
    <div class="buttons">
      <paper-button dialog-confirm autofocus>Done</paper-button>
    </div>
    `
  }

  static get properties() {
    return {
      day: {
        type: String,
        computed: '_computeDay(timeSlot)'
      },
      time: {
        type: String,
        computed: '_computeTime(timeSlot)'
      },
      timeSlot: {
        type: Object,
        required: true
      },
      scheduledStaffRoles: {
        type: Array,
        computed: '_computeScheduledStaffRoles(timeSlot)',
      }
    }
  }

  ready() {
    super.ready()

    this.setAttribute('role', 'dialog')
    this.setAttribute('aria-modal', 'true')

    this.addEventListener('neon-animation-finish', this._onNeonAnimationFinish)
  }

  _computeDay(timeSlot) {
    return timeSlot.datetime.format('dddd')
  }

  _computeTime(timeSlot) {
    return timeSlot.datetime.format('HH:mm')
  }

  _computeScheduledStaffRoles(timeSlot) {
    const roles = uniq(timeSlot.scheduledStaffs.map((staff) => staff.role))
    return roles.map((role) => {
      const staffs = timeSlot.scheduledStaffs.filter((staff) => staff.role === role)
      return {
        name: role,
        staffs
      }
    })
  }

  _renderOpened() {
    this.cancelAnimation()
    this.playAnimation('entry')
  }

  _renderClosed() {
    this.cancelAnimation()
    this.playAnimation('exit')
  }

  _onNeonAnimationFinish() {
    if (this.opened) {
      this._finishRenderOpened()
    } else {
      this._finishRenderClosed()
    }
  }
}

customElements.define('otto-time-slot-dialog', OttoTimeSlotDialog)
