 let margin={top:40, bottom:150, left:150, right:200},
    width=1500 - margin.left - margin.right,
    height=600 - margin.top -margin.bottom;

  let horizontal=d3.scale.ordinal().rangeRoundBands([0,width],0.05),
    vertical=d3.scale.linear().rangeRound([height,0]);

  let color = d3.scale.ordinal().range(["#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  let xAxis=d3.svg.axis()
    .scale(horizontal)
    .orient("bottom");

  let yAxis=d3.svg.axis()
    .scale(vertical)
    .orient("left");

  let svg=d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  d3.json("../output/plotpower.json",function(err,data){
  data.forEach(function(d){
    d.Country=d.Country;
    d.gdp2010=d.gdp2010;
    d.gdp2011=d.gdp2011;
    d.gdp2012=d.gdp2012;
      d.gdp2013=d.gdp2013;
  });
  let xData=["gdp2010","gdp2011","gdp2012","gdp2013"];
  let dataIntermediate = xData.map(function (c) {
        return data.map(function (d) {
            return {x: d.Country, y: d[c]};
        });
    });
  let dataStackLayout = d3.layout.stack()(dataIntermediate);

  horizontal.domain(dataStackLayout[0].map(function (d) {
        return d.x;
    }));
  vertical.domain([0,d3.max(dataStackLayout[dataStackLayout.length - 1],
                  function (d) { return d.y0 + d.y;})
      ])
      .nice();
  let layer = svg.selectAll(".stack")
          .data(dataStackLayout)
          .enter()
          .append("g")
          .attr("class", "stack")
          .style("fill", function (d, i) {
                return color(i);
    });

  layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")

        .attr("x", function (d) {
            return horizontal(d.x);
          })
          .attr("y", function (d) {
              return vertical(d.y + d.y0);
          })
          .attr("height", function (d) {
              return vertical(d.y0) - vertical(d.y + d.y0);
        })
      .attr("width", horizontal.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
               .style("text-anchor", "end")

       .style("font-size","15px")
       
       //.text("Country");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
       .attr("transform", "rotate(-90)")
       .attr("x",-height/2)
       .attr("dy","-5em")
       .style("text-anchor","middle")
       .style("font-size","25px")
       .text("In Billions");

       let legend = svg.selectAll(".legend")
         .data(color.domain().slice())
       .enter().append("g")
         .attr("class", "legend")
         .attr("transform", function(d, i) { return "translate(0," + i * 20 +  ")"; });


     legend.append("rect")
         .attr("x", width -100)
         .attr("width", 18)
         .attr("height", 18)
         .style("fill", color);

     legend.append("text")
         .attr("x", width - 110)
         .attr("y", 9)
         .attr("dy", ".35em")
         .style("text-anchor", "end")
         .style("fill","green")
         .text(function(d,i) { return xData[i]; });

  });
