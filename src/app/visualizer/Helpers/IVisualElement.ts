export interface IVisualElement {
  nodeName: string;
  nodeType: number;
  level: number;
  children: IVisualElement[];
  value: string | null;
  id: string | null;
  parent: IVisualElement;
  classList?: String;
}
