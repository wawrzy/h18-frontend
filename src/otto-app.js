import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import moment from '../node_modules/moment/moment'
// Vendor Elements
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout'
import '../node_modules/@polymer/app-layout/app-header/app-header'
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar'
import '../node_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects'

import '../node_modules/@polymer/app-route/app-location'
import '../node_modules/@polymer/app-route/app-route'

import '../node_modules/@polymer/iron-pages/iron-pages'
import '../node_modules/@polymer/iron-icons/iron-icons'

import '../node_modules/@polymer/paper-tabs/paper-tabs'
// Custom Elements
import './shared-styles'
import './otto-schedule-page'

export class OttoApp extends PolymerElement {
  static get template() {
    return `
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: column;
        
        height: 100vh;
      }

      app-toolbar {
        color: #fff;
        background-color: var(--primary-color);
      }
      
      iron-pages {
        flex: 1 1 100%;
      }
    </style>

    <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
    
    <app-header-layout fullbleed has-scroll-region>
      <app-header slot="header" fixed>
        <app-toolbar>
          <div main-title>Otto</div>
          <div>{{currentWeek}}</div>
          <paper-icon-button icon="settings" on-tap="onSettingsTap"></paper-icon-button>
        </app-toolbar>
      </app-header>

      <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="404" role="main">
        <otto-schedule-page id="schedule" name="schedule" week="[[week]]"></otto-schedule-page>
      </iron-pages>
    </app-header-layout>
    `
  }

  static get properties() {
    return {
      week: {
        type: Object,
        value: moment().startOf('week')
      },
      currentWeek: {
        type: String,
        computed: '_formatCurrentWeek(week)'
      },
      page: {
        type: String,
        reflectToAttribute: true,
      },
      routeData: Object,
      subroute: String,
      rootPath: String
    }
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ]
  }

  onSettingsTap() {
    this.$.schedule.openSettings()
  }

  _routePageChanged(page) {
    this.page = page || 'schedule'
  }

  _formatCurrentWeek(week) {
    const firstDay = week.date()
    const lastDay = week.date() + 6
    const month = week.format('MMMM')
    return `${month} ${firstDay}-${lastDay}`
  }
}

customElements.define('otto-app', OttoApp)

