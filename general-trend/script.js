// Data
const data = [
  { label: 'Point 1', value1: 52, value2: 56 },
  { label: 'Point 2', value1: 71, value2: 51 }
];

// Chart dimensions
const width = 600;
const height = 300;

// Create SVG container
const svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Define scales
const xScale = d3.scaleBand()
  .domain(data.map(d => d.label))
  .range([0, width])
  .padding(0.2);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => Math.max(d.value1, d.value2))])
  .range([height, 0]);

// Draw first line
svg.selectAll('.line1')
  .data([data])
  .enter()
  .append('path')
  .attr('class', 'line1')
  .attr('d', d3.line()
    .x(d => xScale(d.label) + xScale.bandwidth() / 2)
    .y(d => yScale(d.value1))
  );

// Draw second line
svg.selectAll('.line2')
  .data([data])
  .enter()
  .append('path')
  .attr('class', 'line2')
  .attr('d', d3.line()
    .x(d => xScale(d.label) + xScale.bandwidth() / 2)
    .y(d => yScale(d.value2))
  );

// Draw x-axis
svg.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Draw y-axis
svg.append('g')
  .attr('class', 'y-axis')
  .call(d3.axisLeft(yScale));

