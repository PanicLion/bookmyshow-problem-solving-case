
# Problem Solving Case: bookmyshow

**Problem:**

> Bookmyshow is a ticketing platform where you can book tickets for a movie show. As part of this problem, we need to build API’s for the following feature. As a user, I can select any theatre in the city. On selecting the theatre, I should be able to see the dates of next 7 days. I can click on any date and the page should load to give me all the movies in that theatre on that given date. Movies should contain details of all the showtimes.

## See it in action:

- Create a ```.env``` file and update the fields mentioned in [env.example file](./env.example)

- Install dependecies
``` npm install ```

- Start the server
``` npm start ```

- Open your browser and try these REST endpoints (<i>Interactive</i>):
    - ``` http://localhost:3000/ ``` (GET) you list of cities
    - ``` http://localhost:3000/city/:cityId/cinemas ``` (GET) you list of cinemas for the city you chose
    - ``` http://localhost:3000/:cityId/:cinemaId ``` (GET) you the next 7 days (including today's) to choose shows for
    - ``` http://localhost:3000/:cityId/:cinemaId/:date ``` (GET) you the list of shows available for the chosen cinema & date
    

## Schema:

### This is the schema we'll be creating

![E-R Diagram](./E-R.png "E-R Diagram")

### You'll find the sql script for creating and populating the above schema with dummy values [here.](./sql_script.sql)

> The data being populated in these tables are for the dates from 2023-05-20 to 2023-05-26.


