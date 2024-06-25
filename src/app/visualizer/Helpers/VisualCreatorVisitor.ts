import { forEachChild } from 'typescript';
import { IVisualElement } from './IVisualElement';

export class VisualCreatorVisitor {
  public visualELement!: IVisualElement;
  currentLevel = 0;
  #getText(ele: Node) {
    if (ele.nodeType === ele.TEXT_NODE || ele.nodeType === ele.COMMENT_NODE) {
      return ele.textContent;
    }
    return '';
  }
  VisitRoot(ele: Node) {
    this.visualELement = {
      nodeName: ele.nodeName,
      nodeType: ele.nodeType,
      level: 0,
      value: this.#getText(ele),
      children: [],
    };

    for (let index = 0; index < ele.childNodes.length; index++) {
      const element = ele.childNodes[index];

      this.#VisitChild(element, this.visualELement);
    }
  }
  #VisitChild(ele: Node, visualEle: IVisualElement) {
    if (ele.nodeType === ele.TEXT_NODE && !ele.textContent?.trim()) {
      return;
    }
    const level = visualEle.level + 1;
    const localVisEle = {
      nodeName: ele.nodeName,
      nodeType: ele.nodeType,
      level: level,
      value: this.#getText(ele),
      children: [],
    };
    visualEle.children.push(localVisEle);

    for (let index = 0; index < ele.childNodes.length; index++) {
      const element = ele.childNodes[index];
      this.#VisitChild(element, localVisEle);
    }
  }
}
