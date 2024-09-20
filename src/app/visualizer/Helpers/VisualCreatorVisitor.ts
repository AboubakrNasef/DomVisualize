import { forEachChild } from 'typescript';
import { IVisualElement } from './IVisualElement';
import * as shajs from 'sha.js';
export class VisualCreatorVisitor {
  public visualELement!: IVisualElement;

  currentObjNumber = 0;
  currentLevel = 0;
  Visit(visualELement: IVisualElement) {
    if (!this.visualELement) {
      this.visualELement = visualELement;
    }
    this.currentObjNumber++;
    visualELement.no = this.currentObjNumber;
    console.log('Visiting', visualELement.no, '--', visualELement.nodeName);
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
    this.sha256(str).then((s) => console.log(visualELement.no, '--', s));

    return str;
  }

  async sha256(message: string): Promise<string> {
    // Encode the message as a Uint8Array
    const msgBuffer = new TextEncoder().encode(message);

    // Hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // Convert the hash to a byte array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Convert bytes to hex string
    const hashHex = hashArray
      .map((b) => ('00' + b.toString(16)).slice(-2))
      .join('');

    return hashHex;
  }
}
