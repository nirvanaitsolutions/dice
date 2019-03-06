import { customElement, bindable, bindingMode } from 'aurelia-framework';

@customElement('text-input')
export class TextInput {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
}
