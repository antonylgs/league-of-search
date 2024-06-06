# League Of Search

## About

League Of Search is a website which let's anyone search and visualize a League Of Legends player's data.\

League Of Legend is a 5v5 MOBA video game developed by Riot Games, released in 2009.

It's an easy and open way to search about a League Of Legend player to analyze his playstyle or his overall level directly from the web without having to open the game launcher and adding him as a friend.

Displays their top champions, let you also check all their champions mastery points and level.\
Displays their ranks in the different gamemodes.\
Displays their 7 last matches with the result, the date, the map, the gamemode, their champion, KDA, items and chosen lane.

- Web page: [league-of-search.vercel.app](https://league-of-search.vercel.app/)

## Usage

The easiest way to use League Of Search is by accessing the most updated version on the **[official app page](https://league-of-search.vercel.app/)**. However, League Of Search can also run locally on your machine: see the installation instructions below for know-how.

## Installation

If you want to run your instance of League Of Search locally on your machine, be sure you have the following requirements installed. The following guide is for intermediate users (you will have to open your console and type some commands, it's better if you know what you are doing).

### Requirements

If you want to run your instance of RAWGraphs locally on your machine, be sure you have the following requirements installed.

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (it could be used through the interface of [GitHub Desktop](https://desktop.github.com/))
- [Node.js](https://nodejs.org/en/)

### Instructions (macOS)

In the terminal, navigate to the folder where you want to install the app and clone the `RAWGraphs-app` GitHub repository:

```shell
git clone https://github.com/antonylgs/league-of-search.git
```

Browse the folder containing the repository:

```shell
cd league-of-search
```

Install the needed dependencies through npm:

```shell
npm install
```

Set up your own Riot Games developer API key inside the project:

Write your API key inside a `.env.local` at the root of the project\
<sub>You can get request your API key here : https://developer.riotgames.com/</sub>

Now you can run the project locally in development mode with the command:

```shell
npm run dev
```

You can also build your own version and upload it on your server by running the command:

```shell
npm run build
```

## Contributing

Want to contribute to League Of Search's development? You are more than welcome! Start by forking the repository (the "Fork" button at the top-right corner of this page) and follow the instructions above to clone it and install dependencies. Then you can use Github's issues and pull requests to discuss and share your work.
For more information, write me: <contact@antonylanglois.com>.

## License

MIT
