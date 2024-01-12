d3.csv('Topic-histogram.csv').then(function(data) {
    // Convert data to appropriate format
    data.forEach(function(d) {
        d['Fox News'] = +d['Fox News'];
        d['NYT'] = +d['NYT'];
        d['Reddit'] = +d['Reddit'];
        d['X.com discussion'] = +d['X.com discussion'];
    });

    // Define dimensions and margins for the chart
    var margin = {top: 20, right: 20, bottom: 300, left: 40}, // Increased bottom margin
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    // Create the SVG container
    var svg = d3.select('#chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
              .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Define the scales and axes
    var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1),
        x1 = d3.scaleBand().padding(0.05),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis = d3.axisBottom(x0),
        yAxis = d3.axisLeft(y);

    var colors = d3.scaleOrdinal(d3.schemeCategory10); // Color scheme

    var columns = ['Fox News', 'NYT', 'Reddit', 'X.com discussion'];

    x0.domain(data.map(function(d) { return d['Row Labels']; }));
    x1.domain(columns).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return Math.max(d['Fox News'], d['NYT'], d['Reddit'], d['X.com discussion']); })]);

    // Add the bars
    var topic = svg.selectAll('.topic')
        .data(data)
        .enter().append('g')
        .attr('class', 'topic')
        .attr('transform', function(d) { return 'translate(' + x0(d['Row Labels']) + ',0)'; });

    topic.selectAll('rect')
        .data(function(d) { return columns.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append('rect')
        .attr('x', function(d) { return x1(d.key); })
        .attr('y', function(d) { return y(d.value); })
        .attr('width', x1.bandwidth())
        .attr('height', function(d) { return height - y(d.value); })
        .attr('fill', function(d) { return colors(d.key); });

    // Add the x-axis and rotate the labels
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text') // Select all text elements in the x-axis
          .style('text-anchor', 'end')
          .attr('dx', '-.8em')
          .attr('dy', '.15em')
          .attr('transform', 'rotate(-65)');

    // Add the y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis);


    // Define the colors used for the bars (same as in the bar chart)
    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    // Add a legend
    var legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(columns) // Removed slice().reverse()
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", colors);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });


});