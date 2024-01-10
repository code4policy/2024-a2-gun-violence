d3.csv("images/cleaned_table_1.csv").then(function(data) {
    // Convert string values to numbers
    data.forEach(function(d) {
        d.year = +d.year;
        d.month = d.month.trim();
        d["More strict"] = +d["More strict"];
        d["Less strict"] = +d["Less strict"];
        d["Kept as now"] = +d["Kept as now"];
        d["No opinion"] = +d["No opinion"];
    });

    // Set up margins and dimensions
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var width = 800 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    // Create scales and axes
    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, 100]) // Adjust the domain based on your data
        .range([height, 0]);

    var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    var yAxis = d3.axisLeft(yScale).tickFormat(d => d + "%");

    // Create SVG container
    var svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X and Y axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Year");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("x", -height / 2)
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .text("Percent");

    // Create the line functions
    var lineMoreStrict = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d["More strict"] * 100));

    var lineLessStrict = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d["Less strict"] * 100));

    var lineKeptAsNow = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d["Kept as now"] * 100));

    var lineNoOpinion = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d["No opinion"] * 100));

    // Draw the lines
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", lineMoreStrict);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", lineLessStrict);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("d", lineKeptAsNow);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", lineNoOpinion);

    // Add legend
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 100) + "," + 0 + ")");

    legend.append("rect")
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "steelblue");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 5)
        .text("More Strict");

    legend.append("rect")
        .attr("y", 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "green");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 25)
        .text("Less Strict");

    legend.append("rect")
        .attr("y", 40)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "orange");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 45)
        .text("Kept as Now");

    legend.append("rect")
        .attr("y", 60)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "red");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 65)
        .text("No Opinion");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .text("In general, do you feel that the laws covering the sale of the firearms \n should be made more strict, les strict, or kept as they are now?");
});


