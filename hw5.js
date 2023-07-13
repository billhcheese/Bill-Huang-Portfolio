// import {Legend, Swatches} from "@d3/color-legend"
// import {howto, altplot} from "@d3/example-components"

// Based on https://d3-graph-gallery.com/graph/barplot_basic.html

const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 2000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#main")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
        // Get current value of select element
    var yvalue = select.options[select.selectedIndex].value;
    console.log(yvalue)
        // Update chart with the selected category of letters
        //updateChart(xvalue);
    d3.csv("https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/nutrition.csv").then(function (data) {
        const maxHeight = 400, maxWidth = 500, originalCircleSize = 3
        
        let xMax = d3.max(data.map(d => +d.Energ_Kcal))
        let yMax = d3.max(data.map(d => eval(yvalue)))

        const x = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, maxWidth]);

        const y = d3.scaleLinear()
        .domain([0, yMax])
        .range([maxHeight, 0]);
        
        svg.selectAll('.myCircles')
            .data(data)
            .join(
                enter => enter
                    .append("circle")
                    .attr('class', 'myCircles')
                    .attr("cx", d => x(d.Energ_Kcal))
                    .attr("cy", d => y(eval(yvalue)))
                    .attr("r", originalCircleSize)
                    .style("fill", function(d){return color(d.MajorGroup)}),
                update => update.attr("cy", d => y(eval(yvalue))),
                exit => exit.remove()
            )
        svg.selectAll('.label1').text(`${select.options[select.selectedIndex].value.slice(3,)}`)

            
        })
    }

d3.csv("https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/nutrition.csv").then(function (data) {

    console.log(data)


    const maxHeight = 400, maxWidth = 600, originalCircleSize = 2, barChartWidth = 1400



    //add legend
    svg.append("circle").attr("cx",550).attr("cy",50).attr("r", 3).style("fill", "#3085C2")
    svg.append("circle").attr("cx",550).attr("cy",80).attr("r", 3).style("fill", "#FEC601")
    svg.append("circle").attr("cx",550).attr("cy",110).attr("r", 3).style("fill", "#F49D0C")
    svg.append("circle").attr("cx",550).attr("cy",140).attr("r", 3).style("fill", "#B9C35D")
    svg.append("circle").attr("cx",550).attr("cy",170).attr("r", 3).style("fill", "#2364AA")
    svg.append("circle").attr("cx",550).attr("cy",200).attr("r", 3).style("fill", "#58B2C9")
    svg.append("circle").attr("cx",550).attr("cy",230).attr("r", 3).style("fill", "#EA7317")
    svg.append("circle").attr("cx",550).attr("cy",260).attr("r", 3).style("fill", "#BC5B10")
    svg.append("text").attr("x", 570).attr("y", 50).text("Beverages").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append("text").attr("x", 570).attr("y", 80).text("Dairy and Egg").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append("text").attr("x", 570).attr("y", 110).text("Fats and Oils").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append("text").attr("x", 570).attr("y", 140).text("Fruit, Nut and Vegetable").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append("text").attr("x", 570).attr("y", 170).text("Meat and Fish").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append("text").attr("x", 570).attr("y", 200).text("Processed Foods").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append("text").attr("x", 570).attr("y", 230).text("Soups, Sauces, and Gravies").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append("text").attr("x", 570).attr("y", 260).text("Starches").style("font-size", "12px").attr("alignment-baseline","middle").attr('font-family',"monospace")
    svg.append('text').attr("x", 830).attr("y", 380).text("the grey circle is the average value of the nutrient in this dataset").style("font-size", "10px").attr("alignment-baseline","middle").attr('font-family',"monospace")

    // add scatterplot

    let xMax = d3.max(data.map(d => +d.Energ_Kcal))

    const x = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, maxWidth]);

    let yMax = d3.max(data.map(d => +d.Protein))

    const y = d3.scaleLinear()
        .domain([0, yMax])
        .range([maxHeight, 0]);
    
    let color = d3.scaleOrdinal()
        .domain(["Beverages","Dairy and Egg","Fats and Oils","Fruit, Nut and Vegetable","Meat and Fish","Processed Foods","Soups, Sauces, and Gravies","Starches"])
        .range(["#3085C2","#FEC601","#F49D0C","#B9C35D","#2364AA","#58B2C9","#EA7317","#BC5B10"])


    let circleGroup1 = svg.append('g')
        .attr('class', 'circleGroup')
        .attr('transform', 'translate(' + 50 + ',' + 50 + ')')

    let myCircles = circleGroup1
        .selectAll(".myCircles")
        .data(data)
        .enter()
        .append("circle")
        .attr('class', 'myCircles')
        .attr("cx", d => x(d.Energ_Kcal))
        .attr("cy", d => y(d.Protein))
        .attr("r", originalCircleSize)
        .style("fill", function(d){return color(d.MajorGroup)})

    //add x axis
    circleGroup1.append("g")
        .attr("transform", `translate(0, ${maxHeight})`)
        .call(d3.axisBottom(x));
    circleGroup1.append('text')
        .text("Protein")
        .attr('class','label1')
        .attr("transform", "rotate(-90) translate(-200,-30)").attr('font-family',"monospace")
        

    //add y axis 
    circleGroup1.append("g")
        .call(d3.axisLeft(y));
    circleGroup1.append('text')
        .text("Energy in Kcal")
        .attr('class','label2')
        .attr("transform", "translate(270,440)").attr('font-family',"monospace")


    let circleTooltip = circleGroup1.append("text")
        .attr('x', 0)
        .attr('y', 0)
        .style('font-size', 11)
        .style('fill', 'black')
        .style('text-anchor', 'middle')
        .attr('font-family',"monospace")
        .style("visibility", "hidden")
        .lower()


    let xLine = circleGroup1.append("line")
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .style("visibility", "hidden")
        .lower()

    let yLine = circleGroup1.append("line")
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .style("visibility", "hidden")
        .lower()




    myCircles
        .style('cursor', 'pointer')
        .on('mouseover', mouseOverFunction)
        .on('mouseout', mouseOutFunction)
    

    //Point Chart
    let circleGroup2 = svg.append('g')
        .attr('transform', 'translate(' + 850 + ',' + 100 + ')')

    let myCircle2 = circleGroup2.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", "#69b3a2")
    
    let myCircle2a = circleGroup2.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 227/30)
        .attr("fill", "#808080")
        .style("opacity", 0.5)

    let tooltip2 = circleGroup2.append("text")
        .attr('x',0)
        .attr('y',-80)
        .text("Energy Kcal")
        .style('font-size', 16)
        .style('fill','black')
        .style('text-anchor','middle')
        .attr('font-family',"monospace")


    // Water, Protein, Carbohydrt, Sodium, Vit_C, FA_Sat, Fiber_TD 
    let circleGroup3 = svg.append('g')
        .attr('transform', 'translate(' + 1000 + ',' + 100 + ')')
    
    let myCircle3 = circleGroup3.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", "#69b3a2")
    
    let myCircle3a = circleGroup3.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 11.6)
        .attr("fill", "#808080")
        .style("opacity", 0.5)
    
    let tooltip3 = circleGroup3.append("text")
        .attr('x',0)
        .attr('y',-80)
        .text("Protein")
        .style('font-size', 16)
        .style('fill','black')
        .style('text-anchor','middle')
        .attr('font-family',"monospace")

    
    let circleGroup4 = svg.append('g')
        .attr('transform', 'translate(' + 1150 + ',' + 100 + ')')
    
    let myCircle4 = circleGroup4.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", "#69b3a2")
    
    let myCircle4a = circleGroup4.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 21)
        .attr("fill", "#808080")
        .style("opacity", 0.5)
    
    let tooltip4 = circleGroup4.append("text")
        .attr('x',0)
        .attr('y',-80)
        .text("Carbohydrate")
        .style('font-size', 16)
        .style('fill','black')
        .style('text-anchor','middle')
        .attr('font-family',"monospace")
    
    let circleGroup5 = svg.append('g')
        .attr('transform', 'translate(' + 850 + ',' + 300 + ')')
    
    let myCircle5 = circleGroup5.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", "#69b3a2")
    
    let myCircle5a = circleGroup5.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 54)
        .attr("fill", "#808080")
        .style("opacity", 0.5)
    
    let tooltip5 = circleGroup5.append("text")
        .attr('x',0)
        .attr('y',-80)
        .text("Water")
        .style('font-size', 16)
        .style('fill','black')
        .style('text-anchor','middle')
        .attr('font-family',"monospace")
    
    let circleGroup6 = svg.append('g')
        .attr('transform', 'translate(' + 1000 + ',' + 300 + ')')
    
    let myCircle6 = circleGroup6.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", "#69b3a2")
    
    let myCircle6a = circleGroup6.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 378/30)
        .attr("fill", "#808080")
        .style("opacity", 0.5)
    
    let tooltip6 = circleGroup6.append("text")
        .attr('x',0)
        .attr('y',-80)
        .text("Sodium")
        .style('font-size', 16)
        .style('fill','black')
        .style('text-anchor','middle')
        .attr('font-family',"monospace")
    
    let circleGroup7 = svg.append('g')
        .attr('transform', 'translate(' + 1150 + ',' + 300 + ')')
    
    let myCircle7 = circleGroup7.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", "#69b3a2")
    
    let myCircle7a = circleGroup7.append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 9.36)
        .attr("fill", "#808080")
        .style("opacity", 0.5)
    
    let tooltip7 = circleGroup7.append("text")
        .attr('x',0)
        .attr('y',-80)
        .text("Vitamin C")
        .style('font-size', 16)
        .style('fill','black')
        .style('text-anchor','middle')
        .attr('font-family',"monospace")
    

    function mouseOverFunction(event, d) {

        circleTooltip
            .style('visibility', 'visible')
            .attr('data-html','true')
            .text(`${d.Short_Desc} || Kcals: ${d.Energ_Kcal} || Protein: ${d.Protein}`)
            //.text(`Protein: ${d.Protein}`)
            .attr('x', x(d.Energ_Kcal))
            .attr('y', y(d.Protein) - 10)
        //highlighting
    
        myCircles
            .style('opacity', dCircle => dCircle.Short_Desc === d.Short_Desc ? 1 : 0.1)
            .attr('r', dCircle => dCircle.Short_Desc === d.Short_Desc ? 6 : originalCircleSize)
        
        myCircle2
            .attr('r',d.Energ_Kcal/30)
        tooltip2
            .text(`Energy Kcal: ${d.Energ_Kcal}`)

        myCircle3
            .attr('r',d.Protein)
        tooltip3
            .text(`Protein: ${d.Protein}`)

        myCircle4
            .attr('r',d.Carbohydrt)
        tooltip4
            .text(`Carbohydrate: ${d.Carbohydrt}`)
        
        myCircle5
            .attr('r',d.Water)
        tooltip5
            .text(`Water: ${d.Water}`)
        
        myCircle6
            .attr('r',d.Sodium/30)
        tooltip6
            .text(`Sodium: ${d.Sodium}`)
        
        myCircle7
            .attr('r',d.Vit_C)
        tooltip7
            .text(`Vitamin C: ${d.Vit_C}`)
            
    }
    
    function mouseOutFunction(event, d) {

        circleTooltip
            .style('visibility', 'hidden')

        myCircles
            .style('opacity', 1)
            .attr('r', originalCircleSize)
        xLine.style('visibility', 'hidden')
            yLine.style('visibility', 'hidden')
        
        myCircle2
            .attr('r',5)
        myCircle3
            .attr('r',5)
        myCircle4
            .attr('r',5)
        myCircle5
            .attr('r',5)
        myCircle6
            .attr('r',5)
        myCircle7
            .attr('r',5)

   
    
    }
    
    
})
