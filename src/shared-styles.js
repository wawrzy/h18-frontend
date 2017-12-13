const $_sharedStyles = document.createElement('div')
$_sharedStyles.setAttribute('style', 'display: none;')

$_sharedStyles.innerHTML = `
<dom-module id="shared-styles">
  <template>
    <style>
    </style>
  </template>
</dom-module>
`

document.head.appendChild($_sharedStyles)
