import { IVisualElement } from './IVisualElement';
import { VisualCreatorVisitor } from './VisualCreatorVisitor';
let currentLevel = 0;
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
    no: -1,
    nodeName: node.nodeName,
    nodeType: node.nodeType,
    level: parent ? parent!.level + 1 : 0,
    value: getText(node),
    children: [],
    id: '',
    parent: parent!,
    Node: node,
    // classList: node.classList.toString(),
  };
  parent?.children.push(visualEle);

  return visualEle;
}
