import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'
// Vendor Elements
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout'
import '../node_modules/@polymer/app-layout/app-header/app-header'
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar'
import '../node_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects'

import '../node_modules/@polymer/app-route/app-location'
import '../node_modules/@polymer/app-route/app-route'

import '../node_modules/@polymer/iron-pages/iron-pages'

import '../node_modules/@polymer/paper-styles/color'
// Custom Elements
import './otto-schedule'

export class OttoApp extends PolymerElement {
  static get template() {
    return `
    <style>
      :host {
        --primary-color: var(--paper-red-500);
        --secondary-color: var(--paper-purple-700);

        display: block;
      }

      app-toolbar {
        color: #fff;
        background-color: var(--primary-color);
      }
    </style>

    <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>

    <app-header slot="header">
      <app-toolbar>
        <div main-title>Otto</div>
        <div>December 11-17</div>
      </app-toolbar>
    </app-header>

    <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="404" role="main">
      <otto-schedule name="schedule"></otto-schedule>
    </iron-pages>
    `
  }

  static get properties() {
    return {
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

  _routePageChanged(page) {
    this.page = page || 'schedule'
  }
}

customElements.define('otto-app', OttoApp)

