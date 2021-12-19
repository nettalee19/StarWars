import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"

function Part2() {
    const [planets, setPlanets] = useState([])

    const getPlanets = async() =>{
        
        const response = await axios.get(`https://swapi.py4e.com/api/planets`)

        let allPlanets = response.data.results

        filterWantedPlanets(allPlanets)
    }

    useEffect(() =>{
        
        getPlanets()
        
    }, [])


    function filterWantedPlanets(allPlanets){
        let filteredPlanets = []
        filteredPlanets = allPlanets.filter(planet => ((planet.population >= 200000 && planet.population <= 45000000000) && (planet.rotation_period < 27)))

        setPlanets(filteredPlanets)
        console.log(filteredPlanets)
        
        let newArray = []
        filteredPlanets.forEach(planet => 
            newArray.push(planet.name)
        )
        for(let i = 0; i < filteredPlanets.length; i++){
            newArray.push(filteredPlanets[i].name);
            newArray.push(filteredPlanets[i].population);
        }
        console.log(newArray)
    }

    const SVG_WIDTH = 400;
    const SVG_HEIGHT = 300;

    function App(){
        const x0 = 50;
        const xAxisLength = SVG_WIDTH - x0 * 2;

        const y0 = 50;
        const yAxisLength = SVG_HEIGHT - y0 * 2;

        const xAxisY = y0 + yAxisLength;

        const dataYMax = planets.reduce(
            (acc, cur) => (cur > acc ? cur : acc),
            -Infinity
          );

          const dataYMin = planets.reduce(
            (acc, cur) => (cur > acc ? cur : acc),
            Infinity
          );
          const dataYRange = dataYMax - dataYMin;
        
          const numYTicks = 5;
        
          const barPlotWidth = xAxisLength / planets.length;

        return (
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
              {/* X axis */}
              <line
                x1={x0}
                y1={xAxisY}
                x2={x0 + xAxisLength}
                y2={xAxisY}
                stroke="grey"
              />
              <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
                Planets
              </text>
        
              {/* Y axis */}
              <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />

            {Array.from({ length: numYTicks }).map((_, index) => {
                const y = y0 + index * (yAxisLength / numYTicks);

                const yValue = Math.round(dataYMax - index * (dataYRange / numYTicks));

                return (
                <g key={index}>
                    <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
                    <text x={x0 - 5} y={y + 5} textAnchor="end">
                    {yValue}
                    </text>
                </g>
                );
            })}

              <text x={x0} y={y0 - 8} textAnchor="middle">
                Population
              </text>

                {/* Bar plots */}
                {/* {planets.map(([name, population], index) => {
                    const x = x0 + index * barPlotWidth;

                    const yRatio = (population - dataYMin) / dataYRange;

                    const y = y0 + (1 - yRatio) * yAxisLength;
                    const height = yRatio * yAxisLength;

                    const sidePadding = 10;

                    return (
                    <g key={index}>
                        <rect
                        x={x + sidePadding / 2}
                        y={y}
                        width={barPlotWidth - sidePadding}
                        height={height}
                        />
                        <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
                        {name}
                        </text>
                    </g>
                    );
                })} */}

            </svg>
          );
    }


    

    
    return (
        <div>
            Part 2

            {/* <App/> */}

           

            {planets.map(planet => {
               return <div>{planet.name} {planet.population}
               </div> 
               
            })}
        </div>
    )
}

export default Part2
