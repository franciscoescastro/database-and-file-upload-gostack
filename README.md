<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Challenge 06: Database and file upload with Node.js
</h3>

## :rocket: About the challenge

Implement an application to store finantial income and outcome transactions, transaction list, and csv upload containing a list of transactions

**[Full challenge description](https://github.com/Rocketseat/bootcamp-gostack-desafios/blob/master/desafio-database-upload/README.md)**

### Application routes

- **`POST /transactions`**: Stores a transaction adn a category in the database. The request body contains `title`, `value`, `type`, and `category`. Save the transaction in the following format:
```json
{
  "id": "uuid",
  "title": "Salary",
  "value": 3000,
  "type": "income",
  "category_id": <id_from_category>,
  "created_at": <timestamp>,
  "updated_at": <timestamp> 
}
```
**Important:** Only create a new category if there is not one stored in the database. Query categories by title to figure out if a category already exists.

- **`GET /transactions`**: Returns all stored transactions and a balance containing the total available credit, total income, and total outcome. Return a json in the following format:
```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salary",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z",
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z",
    },
    {
      "id": "uuid",
      "title": "Freelance",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z",
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z",
    },
    {
      "id": "uuid",
      "title": "Food",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Groceries",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z",
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z",
    },
    {
      "id": "uuid",
      "title": "Gamming Chair",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z",
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z",
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```
- **`DELETE /transactions/:id`**: Deletes an existing transaction from the database

- **`POST /transactions/import`**: Extracts a transaction list from a attached csv file and stores the list in the database. It returns a list witht the transaction saved in the database


### Database Setup

Install [docker](https://docs.docker.com/get-docker/) then:

```shell
# Create a postgres container
$ docker run --name gostack -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Connect to the postgres instance and create two tables:

* `gostack_desafio06` to use as your local database
* `gostack_desafio06_tests` to use when running tests

### Server Setup
```shell
# Clone this repository
$ git clone git@github.com:franciscoescastro/database-and-file-upload-gostack.git

# Go into the repository
$ cd database-and-file-upload-gostack.git

# Install dependencies
$ yarn install

# Run tests
$ yarn test

# Run server on dev mode
$ yarn dev:server
```

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
