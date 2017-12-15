const $_sharedStyles = document.createElement('div')
$_sharedStyles.setAttribute('style', 'display: none;')

$_sharedStyles.innerHTML = `
<dom-module id="shared-styles">
  <template>
    <style>
      :host {
        --primary-color: var(--paper-red-500);
        --secondary-color: var(--paper-purple-700);
        --paper-tab-ink: var(--secondary-color);
        --paper-tabs-selection-bar-color: var(--secondary-color);
      }
      
      paper-button:not([dialog-dismiss]) {
        font-weight: bold;
      }

      paper-button[raised] {
        background-color: var(--primary-color);
        color: white;
      }
      
      paper-tabs {
        --paper-tabs: {
          height: 64px;
          background-color: var(--primary-color);
        };
      }
      
      paper-tab {
        --paper-tab: {
          text-transform: uppercase;
          color: white;
        }
      }
    </style>
  </template>
</dom-module>
`

document.head.appendChild($_sharedStyles)
