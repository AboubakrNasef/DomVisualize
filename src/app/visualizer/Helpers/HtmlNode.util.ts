import { IVisualElement } from './IVisualElement';
import { VisualCreatorVisitor } from './VisualCreatorVisitor';

export function accept(
  node: Node,
  parent: IVisualElement | null,
  visitor: VisualCreatorVisitor
) {
  let visualELement = getVisualElementFromNode(node, parent);
  visitor.Visit(visualELement);
  for (let index = 0; index < node.childNodes.length; index++) {
    const element = node.childNodes[index];
    accept(element, visualELement, visitor);
  }
  visitor.Leave(visualELement);
}
function getText(ele: Node) {
  if (ele.nodeType === ele.TEXT_NODE || ele.nodeType === ele.COMMENT_NODE) {
    return ele.textContent;
  }
  return '';
}
function getVisualElementFromNode(
  node: Node,
  parent: IVisualElement | null
): IVisualElement {
  let visualEle: IVisualElement = {
    nodeName: node.nodeName,
    nodeType: node.nodeType,
    level: 0,
    value: getText(node),
    children: [],
    id: '',
    parent: parent!,
    // classList: node.classList.toString(),
  };
  parent?.children.push(visualEle);

  return visualEle;
}
