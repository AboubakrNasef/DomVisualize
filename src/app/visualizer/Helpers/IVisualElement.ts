export interface IVisualElement {
  nodeName: string;
  nodeType: number;
  level: number;
  children: IVisualElement[];
  value: string | null;
  rect?: DOMRect | null;
}
