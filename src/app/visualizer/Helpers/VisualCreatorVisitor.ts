import { forEachChild } from 'typescript';
import { IVisualElement } from './IVisualElement';
import { shajs } from 'sha.js';
export class VisualCreatorVisitor {
  public visualELement!: IVisualElement;
  currentLevel = 0;
  Visit(visualELement: IVisualElement) {
    if (!this.visualELement) {
      this.visualELement = visualELement;
    }
    console.log('Visiting', visualELement.nodeName);
  }
  Leave(visualELement: IVisualElement) {
    visualELement.id = this.generateId(visualELement);
    console.log('Leaving', visualELement.nodeName);
  }

  generateId(visualELement: IVisualElement) {
    let str =
      visualELement.classList +
      visualELement.children.length.toString() +
      visualELement.nodeName +
      visualELement.nodeType +
      visualELement.value;

    return str;
  }

  stringToHash(string: String) {
    var sha256stream = shajs('sha256');
    sha256stream.end('42');
    return sha256stream.read().toString('hex');
  }
}
