import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  input,
  viewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { PanZoomConfig, PanZoomConfigOptions } from 'ngx-panzoom';
import { VisualCreatorVisitor } from './Helpers/VisualCreatorVisitor';
import { IVisualElement } from './Helpers/IVisualElement';
import { getColorOnNumber } from './Helpers/colorUtils';

import Panzoom from '@panzoom/panzoom';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
})
export class VisualizerComponent implements OnInit {
  @ViewChild('treediagram') treediagram!: ElementRef;

  parser = new DOMParser();
  htmlDoc = input<Document>();
  VisualElement!: IVisualElement;
  private panZoomConfigOptions: PanZoomConfigOptions = {
    zoomLevels: 20,
    scalePerZoomLevel: 2.0,
    zoomStepDuration: 0.2,
    freeMouseWheelFactor: 0.01,
    zoomToFitZoomLevelFactor: 0.9,
    dragMouseButton: 'left',
    friction: 5,
  };
  panzoomConfig: PanZoomConfig = new PanZoomConfig(this.panZoomConfigOptions);
  constructor(private DomDivElementRef: ElementRef) {
    effect(() => {
      const doc = this.htmlDoc();

      const visitor = new VisualCreatorVisitor();
      visitor.VisitRoot(doc!.children[0]);
      this.VisualElement = visitor.visualELement;
      console.log(this.VisualElement);
      this.renderTree();
    });
  }

  ngOnInit() {}

  renderTree() {
    const nativeElement: HTMLDivElement = this.treediagram.nativeElement;
    console.log(nativeElement);
    nativeElement.innerHTML = '';

    // set the dimensions and margins of the diagram
    const margin = { top: 40, right: 90, bottom: 30, left: 90 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = d3.tree<IVisualElement>().size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy<IVisualElement>(
      this.VisualElement,
      (d: IVisualElement) => d.children
    );

    // maps the node data to the tree layout
    nodes = treemap(nodes);
    console.log(nodes);
    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    const svg = d3
        .select(nativeElement)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom),
      g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //adds the links between the nodes
    const link = g
      .selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', (d) => getColorOnNumber(d.data.level))
      .style('fill', 'none')
      .attr('d', (d: any) => {
        return (
          'M' +
          d.x +
          ',' +
          d.y +
          'C' +
          d.x +
          ',' +
          (d.y + d.parent.y) / 2 +
          ' ' +
          d.parent.x +
          ',' +
          (d.y + d.parent.y) / 2 +
          ' ' +
          d.parent.x +
          ',' +
          d.parent.y
        );
      });

    // adds each node as a group
    const node = g
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('g')
      .attr(
        'class',
        (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf')
      )
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

    // adds the circle to the node
    node
      .append('circle')
      .attr('r', (d) => 5)
      .style('stroke', (d) => getColorOnNumber(d.data.level + 1))
      .style('fill', (d) => getColorOnNumber(d.data.level));
    let currentNode = node.enter().transition().duration(200);
    // adds the text to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d: d3.HierarchyNode<IVisualElement>) => (d.children ? 0 : 0))
      .attr('y', (d: any) => (d.children && d.depth !== 0 ? -(15 + 5) : 20))
      .style('text-anchor', (d) => 'middle ')
      .text((d) => d.data.nodeName);

    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d: d3.HierarchyNode<IVisualElement>) => (d.children ? 0 : 0))
      .attr('y', (d: any) => (d.children && d.depth !== 0 ? +(15 + 5) : 35))
      .style('text-anchor', (d) => 'middle ')
      .text((d) => d.data.value?.substring(0, 10)!);

    var bound = nativeElement.getBoundingClientRect();
    console.log(bound);

    const panzoom = Panzoom(nativeElement, {
      maxScale: 20,
    });
    panzoom.pan(10, 10);
    panzoom.zoom(2, { animate: true });
    nativeElement.addEventListener('wheel', panzoom.zoomWithWheel);
    nativeElement.addEventListener('dblclick', (e) => {
      panzoom.reset();
    });
    panzoom.reset();
  }
}
