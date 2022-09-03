# Movie Ticket Reservation
# Deployment

## Intro

A movie ticket reservation platform.

![](./screenshots/homepage.png)

### Functionalities

1. Signup.
   
   ![](./screenshots/signup.png)

2. Login
   
   ![](./screenshots/login.png)

3. Reserve currently playing movies.
   
   ![](./screenshots/reserve.png)

4. Check reservation history.
   
   ![](./screenshots/Dashboard.png)

5. Search by the movie title.
   
   ![](./screenshots/Search.png)

### Frameworks

1. Frontend webpage: ReactJS
2. Load-balancing: Envoy proxy
3. Microservices communication: gRPC
4. Microservices container: Docker
5. Backend database: MongoDB

## Installation Guide

```
$ cd movieTicketReservation
$ docker-compose build
$ docker-compose up
```

## Please Change the PORT Number in the ```docker-compose.yml``` file.




After installation, go to the URL: `http://localhost:3000/`.



## Contributors

- [Name: Avijit Sen]( https://github.com/ashavijit )


## License
 
movieTicketReservation is licensed under the MIT License.

