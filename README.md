# 銀行 - Ginko
### DO NOT EXPOSE THIS TO THE WEB (unless you want to make your wallet public, ofc).

![Screenshot](/screenshot.png?raw=true)

Setup
-----

- Backend

  ```sh
  $ bundle install
  $ bundle exec rails s
  ```

- Frontend

  ```sh
  $ yarn install
  $ cd public && yarn install
  $ cd .. && yarn start
  ```

Technical decision
------------------

- The frontend is based on Bootstrap and React, the backend in Rails 5 backed by SQLite3
- Digits are stored as cents in big decimal database columns with precision set to 8 digits

TODOs
-----

- Create bank from the frontend
- Better UX for registering funds
- Budgets
- ecc.
