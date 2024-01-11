// Declare svg variable in a broader scope
var svg;
var lineMoreStrict, lineLessStrict, lineKeptAsNow;


// Load data from CSV file
d3.csv("images/cleaned_table_1.csv").then(function (data) {
    // Convert string values to numbers
    data.forEach(function (d) {
        d.year = +d.year;
        d.month = d.month.trim();
        d.date = new Date(d.year, parseMonth(d.month), 1);
        d["More strict"] = +d["More strict"];
        d["Less strict"] = +d["Less strict"];
        d["Kept as now"] = +d["Kept as now"];
        d["No opinion"] = +d["No opinion"];
    });

    // Set up margins and dimensions
    var margin = { top: 100, right: 20, bottom: 100, left: 50 };
    var width = 800 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    // Create scales and axes
    var xScale = d3.scaleTime()
        .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
        .range([0, width])
        console.log("xScale domain:", xScale.domain());


    var yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);

// Create X-axis
    var xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%Y-%b"));

// Set tick values explicitly
    var tickValues = xScale.ticks(d3.timeYear.every(5));
        tickValues.push(xScale.domain()[1]);  // Add the last date to tick values

        xAxis.tickValues(tickValues);

    var yAxis = d3.axisLeft(yScale)
        .tickFormat(d => d * 100 + "%");

    // Create Legend
    var legendData = [
        { name: "More Strict", color: "green", variable: "More strict" },
        { name: "Less Strict", color: "red", variable: "Less strict" },
        { name: "Kept As Now", color: "grey", variable: "Kept as now" }
    ];

    // Create SVG container (assign to the broader scope variable)
    svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right+50)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("National Opinion on Gun Control Laws After Major School Shootings");

    svg.append("text")
        .attr("x", margin.left)
        .attr("y", height + margin.bottom / 2)
        .attr("text-anchor", "left")
        .style("font-size", "10px")
        .text("Source: Gallup Poll; Created by Alice Shao with the help of ChatGPT");


    // Add X and Y axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("x", -height / 2)
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .text("Percentage");

       lineMoreStrict = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d["More strict"]));

    lineLessStrict = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d["Less strict"]));

    lineKeptAsNow = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d["Kept as now"]));
    // Add vertical lines and text annotations based on dates
    var verticalLines = [
    { date: "1999-04-20", annotation: "Columbine" },
    { date: "2018-02-14", annotation: "Parkland" },
    { date: "2012-12-14", annotation: "Sandy Hook" },
    { date: "2022-05-24", annotation: "Uvalde" }
    ]; 

    verticalLines.forEach(function (line) {
        var lineDate = new Date(line.date);
        var xPos = xScale(lineDate);

    // Add vertical line
    svg.append("line")
        .attr("class", "vertical-line")
        .attr("x1", xPos)
        .attr("x2", xPos)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4");

    // Add text annotation
    svg.append("text")
        .attr("class", "line-annotation")
        .attr("x", xPos)
        .attr("y", -margin.top/3)
        .attr("text-anchor", "middle")
        .text(line.annotation);
});
    // Define the tooltip
// Define the tooltip
    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([0, 20])
        .html(function (d) {
            var hoveredVariable = this.getAttribute("data-variable");

            var percentValue = "N/A";
            var rawValue = "N/A";

            if (hoveredVariable === "More strict") {
                percentValue = (d["More strict"] !== undefined ? (d["More strict"] * 100).toFixed(2) + "%" : "N/A");
                rawValue = d["More strict"];
                } else if (hoveredVariable === "Less strict") {
                percentValue = (d["Less strict"] !== undefined ? (d["Less strict"] * 100).toFixed(2) + "%" : "N/A");
                rawValue = d["Less strict"];
            } else if (hoveredVariable === "Kept as now") {
                percentValue = (d["Kept as now"] !== undefined ? (d["Kept as now"] * 100).toFixed(2) + "%" : "N/A");
                rawValue = d["Kept as now"];
            }

            return "Year: " + d.year + "<br>Month: " + d.month +
                "<br>" + hoveredVariable + ": " + percentValue + " (" + rawValue + ")";
    });

// Call the tooltip on the SVG container
    svg.call(tip);

// Update tooltip position
    tip.direction('e'); // Set direction to east (right side)

var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width - 150) + "," + (height + margin.bottom - 50) + ")");

legend.selectAll("rect")
    .data(legendData)
    .enter().append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("x", function (d, i) { return i * 70; }) // Adjust the spacing between items
    .style("fill", function (d) { return d.color; });

legend.selectAll("text")
    .data(legendData)
    .enter().append("text")
    .attr("x", function (d, i) { return i * 70 + 15; }) // Adjust the spacing between items and position the text to the right of the rectangle
    .attr("y", 8)  // Adjust this value to align the text with the color blocks
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .style("font-size", "8px") // Set the font size
    .text(function (d) { return d.name; });



    // Add the lines
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", lineMoreStrict)
        .attr("data-variable", "More strict") // Set variable name as a data attribute
        .on("mouseover", function (event, d) {
            tip.show.call(this, d);
        })
        .on("mouseout", function () {
            tip.hide();
        });

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", lineLessStrict)
        .attr("data-variable", "Less strict") // Set variable name as a data attribute
        .on("mouseover", function (event, d) {
            tip.show.call(this, d);
        })
        .on("mouseout", function () {
            tip.hide();
        });

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        .attr("d", lineKeptAsNow)
        .attr("data-variable", "Kept as now") // Set variable name as a data attribute
        .on("mouseover", function (event, d) {
            tip.show.call(this, d);
        })
        .on("mouseout", function () {
            tip.hide();
        });


    // Additional helper function to parse month string to a numeric value
    function parseMonth(month) {
        var months = {
            "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
            "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
        };
        return months[month];
    }
});
// Create container for tooltip with ID
var tooltipContainer = svg.append("g")
    .attr("class", "tooltip-container")
    .attr("id", "tooltip-container") // Add this line
    .style("display", "none");

// Position the tooltip container to the right
tooltipContainer.attr("transform", "translate(" + (width + margin.right) + "," + 0 + ")");
// Update the y-position for the X-axis label
svg.select(".x.axis text")
    .attr("y", margin.bottom - 10);

