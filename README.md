Credit to Hack@Brown's design team for the 3D campfire model!
## Inspiration
During COVID, all of us each played the online escape room games. Inspired by building fun, interactive community-bonding events, we created a scavenger hunt game that allows anyone to create their own AR scavenger hunts to send to their friends and family.
## What it does
ScavengerAR has 2 main components: a hunt maker and a hunt player.
As a hunt maker, you can create your own scavenger hunts by custom-selecting locations on a user-friendly map. This generates a personalized URL that you can send to friends and family.

As a hunt player, you received a URL and can play a the scavenger hunt, guided by a hot-cold linear gradient color. As you approach the specified landmarks, which are marked with bonfires, the color gradient becomes warmer. When you finally reach each location, you engage in a competitive minigame where you try and collect as many bonfires as possible in a 20 second time period.

The entire scavenger hunt ends after you visit each landmark.

## How we built it
We used Figma to prototype the front-end landing page.
We used typescript, react, and the Google Maps API to build the front-end that the hunt maker interacts with.
We used A-frame, Geolocator API, ar.js, HTML, CSS, and Javascript to create the AR experience for hunt players.

## Challenges we ran into
The main challenge we faced was location-based AR. We use your current latitude and longitude location for creating the map and generating an accurate location tracker. 

## Accomplishments that we're proud of
We are extremely proud that we created an MVP that allows hunt makers to create personalized scavenger hunts, allows hunt players to play custom AR scavenger hunts, and encourages a sense of community.

## What we learned
This was our first time using AR technologies, and we learned a lot of the following skills:
1) Knowledge of augmented reality technology and its application.
2) Understanding of game design and development.
3) How to create engaging and challenging puzzles and obstacles.
4) How to integrate technology with physical surroundings to create a seamless experience.
5) Importance of user experience and testing to ensure a smooth and enjoyable game.  

## What's next for ScavengerAR
We developed our own moving average to solve an issue for the hot-cold mechanic. In the future, we could further this accuracy by using CV techniques such as SLAM to provide more accurate data on where we are. We can also further the game experience by having an online leaderboard, coin system where users can purchase different 3d entities, add customizability on what entities can appear, and more variety of minigames.
