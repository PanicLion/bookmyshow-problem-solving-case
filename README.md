
# Problem Solving Case: bookmyshow

**Problem:**

> Bookmyshow is a ticketing platform where you can book tickets for a movie show. As part of this problem, we need to build API’s for the following feature. As a user, I can select any theatre in the city. On selecting the theatre, I should be able to see the dates of next 7 days. I can click on any date and the page should load to give me all the movies in that theatre on that given date. Movies should contain details of all the showtimes.

> Create an API to book seats for you and you friend for a given theatre and a show. 
Constraint: No two people should be able to book same seat at the same time for the same show. 
The API that loads data for all shows on a given date has become slow. Which columns would you index to improve the performance of the API ? Why ?  
You have noticed that even after indexing the columns the API speed isn’t under 100 ms. Update the code of existing API to cache the appropriate data in the redis.  


## See it in action:

- Create a ```.env``` file and update the fields mentioned in [env.example file](./env.example)

- Install dependecies
``` npm install ```

- Start your redis-server
``` sudo service redis-server start ``` (In Linux / WSL)

- Start the server
``` npm start ```

- Open your browser and try these REST endpoints (<i>Interactive</i>):
    - ``` http://localhost:3000/ ``` (GET) you list of cities
    - ``` http://localhost:3000/city/:cityId/cinemas ``` (GET) you list of cinemas for the city you chose
    - ``` http://localhost:3000/:cityId/:cinemaId ``` (GET) you the next 7 days (including today's) to choose shows for
    - ``` http://localhost:3000/:cityId/:cinemaId/:date ``` (GET) you the list of shows available for the chosen cinema & date
    
- endpoints for ticket booking
    - ``` http://localhost:3000/shows/:showId/seatlayout ``` (GET) you layout of available seats for the showId.

    - ``` http://localhost:3000/booktickets/:showId/:date ``` (POST) booking information and returns show and seat details.
        - ``` 
            // req.body

            {
                "no_of_seats": 2,
                "seats": ["A1", "D2"]
            } 
## Schema:

### This is the schema we'll be creating

![E-R Diagram](./E-R.png "E-R Diagram")


> The data being populated in these tables are for the dates from 2023-05-20 to 2023-05-26. But with update queries it will be updated to current and future dates.

