import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { treeData } from './TreeData';
import { PanZoomConfig, PanZoomConfigOptions } from 'ngx-panzoom';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
})
export class VisualizerComponent implements OnInit {
  panZoomConfig = new PanZoomConfig({
    freeMouseWheel: true,
    scalePerZoomLevel: 2,
    zoomLevels: 15,

    zoomStepDuration: 0.1,
    zoomOnDoubleClick: false,
    friction: 10,
    keepInBounds: true,
  });
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.renderTree();
  }

  getCode() {
    return `<html>
     <head>
     <title>
     Example of Paragraph tag
     </title>
     </head>
     <body>
     <p> <!-- It is a Paragraph tag for creating the paragraph -->
     <b> HTML </b> stands for <i> <u> Hyper Text Markup Language. </u> </i> It is used to create a web pages and applications. This language
     is easily understandable by the user and also be modifiable. It is actually a Markup language, hence it provides a flexible way for designing the
     web pages along with the text.
     </p>
     HTML file is made up of different elements. <b> An element </b> is a collection of <i> start tag, end tag, attributes and the text between them</i>.
     </p>
     </body>
     </html>  `;
  }

  parser = new DOMParser();
  htmlDoc = this.parser.parseFromString(this.getCode(), 'text/html');
  renderTree() {
    const nativeElement = this.elementRef.nativeElement;

    // set the dimensions and margins of the diagram
    const margin = { top: 20, right: 90, bottom: 30, left: 90 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy<any>(document, (d: any) => d.children);
    console.log(nodes);
    // maps the node data to the tree layout
    nodes = treemap(nodes);

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

    // adds the links between the nodes
    const link = g
      .selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', (d) => d.data.level)
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
      .attr('r', (d) => d.data.value)
      .style('stroke', (d) => d.data.type)
      .style('fill', (d) => d.data.level);

    // adds the text to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d) =>
        d.children ? (d.data.value + 5) * -1 : d.data.value + 5
      )
      .attr('y', (d: any) =>
        d.children && d.depth !== 0 ? -(d.data.value + 5) : d
      )
      .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d) => d.data.name);
  }
}
