export class Checkbox {
    constructor(id, labelText, checked = false) {
      this.id = id;
      this.labelText = labelText;
      this.checked = checked;
    }
  
    render() {
      const container = document.createElement('label');
      container.className = 'custom-checkbox';
      container.setAttribute('for', this.id);
  
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = this.id;
      input.checked = this.checked;
  
      const checkmark = document.createElement('span');
      checkmark.className = 'checkmark';
  
      const text = document.createTextNode(` ${this.labelText}`);
  
      container.appendChild(input);
      container.appendChild(checkmark);
      container.appendChild(text);
  
      return container;
    }
  }  