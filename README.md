# 銀行 - Ginko

![Screenshot](/screenshot.png?raw=true)

Technical details
-----------------

- There are no users, groups or any kind of authentication
- This is not supposed to be exposed to the internet
- The frontend is based on Bootstrap and React, the backend on Ruby on Rails 5 backed by SQLite3
- Digits are stored as cents in big decimal database columns with precision set to 8 digits

Setup
-----

- Backend

  ```sh
  $ cd api
  $ bundle install
  $ bundle exec rake db:migrate
  $ bundle exec rails s -p 4567
  ```

- Frontend

  ```sh
  $ yarn install
  $ cd public && yarn install
  $ cd .. && yarn start
  ```

TODOs
-----

- Create bank from the frontend
- Better UX for registering funds
- Budgets
- ecc.
