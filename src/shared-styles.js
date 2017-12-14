const $_sharedStyles = document.createElement('div')
$_sharedStyles.setAttribute('style', 'display: none;')

$_sharedStyles.innerHTML = `
<dom-module id="shared-styles">
  <template>
    <style>
      :host {
        --primary-color: var(--paper-red-500);
        --secondary-color: var(--paper-purple-700);
      }
      
      paper-button {
        font-weight: bold;
      }

      paper-button[raised] {
        background-color: var(--primary-color);
        color: white;
      }
    </style>
  </template>
</dom-module>
`

document.head.appendChild($_sharedStyles)
