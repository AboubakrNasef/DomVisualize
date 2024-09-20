export interface IVisualElement {
  no: number;
  nodeName: string;
  nodeType: number;
  level: number;
  children: IVisualElement[];
  value: string | null;
  id: string | null;
  parent: IVisualElement;
  classList?: String;
  Node: Node;
}
