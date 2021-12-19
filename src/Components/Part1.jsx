import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"

const baseEndpoint = `https://swapi.py4e.com/api`;

function Part1() {

    const [vehicles, setVehicles] = useState([])

    const [vehicle, setVehicle] =useState(null)
    const [planet, setPlanet] = useState(null)
    const [population, setPopulation] = useState(null)
    const [pilot, setPilot] = useState(null)


    const getVehicles = async() =>{
        
        const response = await axios.get(`${baseEndpoint}/vehicles`)

        setVehicles(response.data.results)
    }

    useEffect(() =>{
        
        getVehicles()
    }, [])
    
    




    
    async function planetsDetails(planetsAddress){
        
        let planetsDetails = []
        for(let i = 0; i < planetsAddress.length; i++){

            const response = await axios.get(`${planetsAddress[i]}`)

            planetsDetails.push(response.data)
        
        }

        let planet1 = planetsDetails.reduce(function(prev, current) {
            return (prev.population > current.population) ? prev : current
        })



        let index = planetsDetails.reduce(function(prev, current, index) {
            return (prev.population > current.population) ? index : index
        })

        setPlanet(planet1.name)
        setPopulation(planet1.population)

        return planetsAddress[index]
    }



    async function getPlanet (pilotsDetailed){
        let planetsAddress = []

        for(let i = 0; i < pilotsDetailed.length; i++){
            planetsAddress.push(pilotsDetailed[i].homeworld)
        }
        
        let mostPopulatedPlanetAddress = await planetsDetails(planetsAddress)
        

        let thePilot = pilotsDetailed.find(pilot => pilot.homeworld === mostPopulatedPlanetAddress)

        setPilot(thePilot.name)

        const response = await axios.get(`${thePilot.vehicles}`)

        setVehicle(response.data.name)

    }


    async function getPilotsDetails (allPilots){
        
        let pilotsDetailed = []
        for(let i = 0; i < allPilots.length; i++){

            const response = await axios.get(`${allPilots[i]}`)

            pilotsDetailed.push(response.data)
            
        }
        
        
         getPlanet(pilotsDetailed)


     }




    //get the pilots
    function getPilots(vehiclesWithPilots){
        
        let allPilots = []


        for(let i = 0; i < vehiclesWithPilots.length; i++){
            if(vehiclesWithPilots[i].pilots.length > 1){
                for(let j = 0; j < vehiclesWithPilots[i].pilots.length; j++){
                    allPilots.push(vehiclesWithPilots[i].pilots[j])
                    
                }
            }
            else{
                allPilots.push(vehiclesWithPilots[i].pilots);
                
            }

        }

        getPilotsDetails(allPilots)

    }

    //find which vehicles are assigned with pilots
    function findPilots(vehicles){
        let vehiclesWithPilots = []
        vehiclesWithPilots = vehicles.filter(vehicle => vehicle.pilots.length >= 1)
        getPilots(vehiclesWithPilots)

    }
    findPilots(vehicles)
    



    return (
        <div>
            Part 1:
            
            <table>
                <tr>
                    <td>Vehicle name with the largest sum</td>
                    <td>{vehicle}</td>
                </tr>
                <tr>
                    <td>Related home planets and their respective population</td>
                    <td>{planet}, {population}</td>
                </tr>
                <tr>
                    <td>Related pilot names</td>
                    <td>{pilot}</td>
                </tr>
            </table>
            

            
        </div>
    )
}

export default Part1
