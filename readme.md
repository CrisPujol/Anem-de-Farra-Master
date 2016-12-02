#Anem de farra

Anem de farra is a searcher of Catalonia local feasts. Also, every registred user can create new feasts. 
Is possible find feasts by Region, start date and location.




## Topics
Topics covered in this project:

- **API endpoints** using data from a **MongoDb collection** to retrieve data or perform actions:
    + `GET` `/feasts` → get all feasts
    + `POST` `'/feasts'`  → get feasts filter by region, date or region and date together.
    + `POST` `/feasts/coord` → get by user location. 
    + `GET` `/feasts/:id` → get by id. 
    + `GET` `/create` → get page create.
    + `GET` `/coord/:region` → get json with feasts region filter. 
    + `POST` `/create` → SAve new feast