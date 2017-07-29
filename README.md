# 銀行 - Ginko

![Screenshot](/screenshot.png?raw=true)

Technical details
-----------------

- There are no users, groups or any kind of authentication as this is not supposed to be exposed over the internet
- The frontend is based on Bootstrap and React.js, the backend on Ruby on Rails 5 backed by SQLite3
- Digits are stored as cents in big decimal database columns with precision set to 8 digits

Setup
-----

- Prerequisites
  - Node.js v6 ([nvm](https://github.com/creationix/nvm))
  - [Yarn](https://yarnpkg.com/)
  - Ruby ([rvm](https://rvm.io/))

- Backend

  ```sh
  $ cd api
  $ bundle install
  $ bundle exec rake db:migrate
  $ bundle exec rails s -p 4567
  ```

  To add a `Bank`, enter the console via `$ bundle exec rails c` and type
  something like `Bank.create!(name: 'My Bank')`.

  If you want some fake data, run instead `$ bundle exec rake db:seed`.

- Frontend

  ```sh
  $ yarn install
  $ cd public && yarn install
  $ cd .. && yarn start
  ```

If you want to use ginko standalone, run `$ yarn build` to generate the static HTML/CSS/JS files
and then `$ yarn dist` to build an executable for your machine thanks to [electron](https://electron.atom.io/).

TODOs
-----

- Move currency form (i.e.: move €200 worth of ETH from UniCredit to CryptoWallet)
- Create bank from the frontend
- Delete funds created by mistake
- Better UX for registering funds
- Budgets
- ecc.
