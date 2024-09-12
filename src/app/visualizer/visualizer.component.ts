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

      this.renderTree();
    });
  }

  ngOnInit() {}

  async renderTree() {
    const nativeElement: HTMLDivElement = this.treediagram.nativeElement;

    nativeElement.innerHTML = '';

    // set the dimensions and margins of the diagram
    const margin = { top: 40, right: 90, bottom: 30, left: 90 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    const duration: number = 250; // hold the alt key to slow down the transition
    const nodes: d3.HierarchyNode<IVisualElement>[] = [];
    const links: d3.HierarchyLink<IVisualElement>[] = [];
    // declares a tree layout and assigns the size
    const treemap = d3.tree<IVisualElement>().size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let root = d3.hierarchy<IVisualElement>(
      this.VisualElement,
      (d: IVisualElement) => d.children
    );

    // maps the node data to the tree layout
    root = treemap(root);
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
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('cursor', 'pointer');

    //adds the links between the nodes
    // const link = g
    //   .selectAll('.link')
    //   .data(root.descendants().slice(1))
    //   .enter()
    //   .append('path')
    //   .transition()
    //   .duration(300)
    //   .delay((d, i) => i * 100)
    //   .attr('class', 'link')
    //   .style('stroke', (d) => getColorOnNumber(d.data.level))
    //   .style('fill', 'none')
    //   .attr('d', (d: any) => {
    //     return (
    //       'M' +
    //       d.x +
    //       ',' +
    //       d.y +
    //       'C' +
    //       d.x +
    //       ',' +
    //       (d.y + d.parent.y) / 2 +
    //       ' ' +
    //       d.parent.x +
    //       ',' +
    //       (d.y + d.parent.y) / 2 +
    //       ' ' +
    //       d.parent.x +
    //       ',' +
    //       d.parent.y
    //     );
    //   });
    // .on('mouseover', (event: MouseEvent, d) => {
    //   d3.select(event.target as HTMLElement).attr('stroke-width', 3);
    // })
    // .on('mouseout', (event: MouseEvent, d) => {
    //   d3.select(event.target as HTMLElement).attr('stroke-width', 2);
    // })
    // .on('click', (event: MouseEvent, d: any) => {
    //   // console.log(d);
    // });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const link = g
      .selectAll('.link')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', (d: any) => getColorOnNumber(d.data.level))
      .style('fill', 'none')
      .attr('d', (d: any) => {
        // Start path at the parent node
        const o = { x: d.parent.x, y: d.parent.y };
        return diagonal(o, o);
      })
      .transition()
      .duration(300)
      .delay((d, i) => i * 125 + i * 10)
      .ease(d3.easeSinInOut)
      .attr('d', (d: any) => {
        // Draw the link to the target node
        const s = { x: d.x, y: d.y };
        const t = { x: d.parent.x, y: d.parent.y };
        return diagonal(s, t);
      });

    // Helper function to create the diagonal path data
    function diagonal(s: any, t: any) {
      return (
        'M' +
        s.x +
        ',' +
        s.y +
        'C' +
        s.x +
        ',' +
        (s.y + t.y) / 2 +
        ' ' +
        t.x +
        ',' +
        (s.y + t.y) / 2 +
        ' ' +
        t.x +
        ',' +
        t.y
      );
    }

    // adds each node as a group
    const node = g
      .selectAll('.node')
      .enter()
      .data(root.descendants())
      .enter()
      .append('g')
      .attr(
        'class',
        (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf')
      )
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
      .on('mouseover', (event: MouseEvent, d) => {
        d3.select(event.target as HTMLElement)
          .transition()
          .duration(300)
          .ease(d3.easeSinOut)
          .attr('r', 6.5);
      })
      .on('mouseout', (event: MouseEvent, d) => {
        d3.select(event.target as HTMLElement)
          .transition()
          .duration(300)
          .ease(d3.easeSinIn)
          .attr('r', 5);
      })
      .on('click', (event: MouseEvent, d: any) => {
        // console.log(d);
      });
    // adds the circle to the node
    node
      .append('circle')
      .transition()
      .duration(300)
      .delay((d, i) => i * 130 + i * 10)
      .ease(d3.easeBounce)
      .attr('r', (d) => 5)
      .style('stroke', (d) => getColorOnNumber(d.data.level + 1))
      .style('fill', (d) => getColorOnNumber(d.data.level));

    // adds the text to the node
    node
      .append('text')
      .transition()
      .duration(300)
      .delay((d, i) => i * 130 + i * 10)
      .ease(d3.easeBounce)
      .attr('dy', '.35em')
      .attr('x', (d: d3.HierarchyNode<IVisualElement>) => (d.children ? 0 : 0))
      .attr('y', (d: any) => (d.children && d.depth !== 0 ? -(15 + 5) : 20))
      .style('text-anchor', (d) => 'middle ')
      .text((d) => d.data.nodeName);

    // node
    //   .append('text')
    //   .transition()
    //   .duration(200)
    //   .delay((d, i) => i * 150 + i * 10)
    //   .ease(d3.easeBounce)
    //   .attr('dy', '.35em')
    //   .attr('x', (d: d3.HierarchyNode<IVisualElement>) => (d.children ? 0 : 0))
    //   .attr('y', (d: any) => (d.children && d.depth !== 0 ? +(15 + 5) : 35))
    //   .attr('font-weight', 'bold')
    //   .attr('overflow', 'auto')
    //   .style('text-anchor', (d) => 'middle ')
    //   .text((d: any) => {
    //     if (d.data.value!.length < 10) return d.data.value;
    //     return `${d.data.value?.substring(0, 10)!}  ...`;
    //   });

    const panzoom = Panzoom(nativeElement, {
      maxScale: 30,
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
