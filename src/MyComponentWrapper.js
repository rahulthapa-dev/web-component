import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './components/MyComponent';

class MyComponentWrapper extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);

    // Render React component
    ReactDOM.render(<MyComponent />, mountPoint);
    
    // Retarget events to the custom element
    this.retargetEvents(shadowRoot);
  }

  retargetEvents(shadowRoot) {
    const events = [
      'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove',
      'mouseenter', 'mouseleave', 'keydown', 'keyup', 'keypress', 'input', 'focus', 'blur',
      'change', 'submit'
    ];

    events.forEach(eventName => {
      shadowRoot.addEventListener(eventName, (event) => {
        const customEvent = new event.constructor(event.type, event);
        this.dispatchEvent(customEvent);
      }, { capture: true });
    });
  }
}

customElements.define('my-component-wrapper', MyComponentWrapper);
