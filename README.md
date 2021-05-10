# affinidi_hackathon

## How to run
1. Clone the repository
```
$ git clone https://github.com/ChokHaoZe/affinidi_hackathon
```
2. Install `nodejs` and `npm`, verify the installation version of `nodejs`
```
$ sudo apt update
$ sudo apt install nodejs
$ sudo apt install npm
$ nodejs -v
```
3. From a terminal, enter into `issuer` folder, install dependencies and packages, copy the `.env.example` into a new `.env` file
```
$ cd issuer/
$ npm install
$ cp .env.example .env
```
4. Populate credentials in `.env` according to `.env.example`
5. Run `npm start` in the terminal
6. Start a new terminal, enter into `holder` folder, install dependencies and packages, copy the `.env.example` into a new `.env` file
```
$ cd ../holder/
$ npm install
$ cp .env.example .env
```
7. Populate credentials in `.env` according to `.env.example`
8. Run `npm start` in the terminal
9. Start a new terminal, enter into `verifier` folder, install dependencies and packages, copy the `.env.example` into a new `.env` file
```
$ cd ../verifier/
$ npm install
$ cp .env.example .env
```
10. Populate credentials in `.env` according to `.env.example`
11. Run `npm run dev` in the terminal
12. Start `localhost:3000/application` in your browser
