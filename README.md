# Trip-Helper


## Background
The goal of this project is to create a visualization of the foreign exchange rate and provide a translation tool to make accessing foreign information easier and more aschetically pleasing.

## Functionality and MVP Features
### MVPS
1 Users can search by country and receive the current forex information for that country
2 Users can use translation tool to translate into the language of the selected country
3 Uses GoogleMaps API to select country on the globe
4 When country is selected the globe spins to that location and the selected country is hilighted
BONUS
Can Also fecth and display additional information on the selected country including current news stories
## Architecture and Technologies
#### JavaScript
* Used to make GET requests to the APIs to recieve information
* Used in styling the visiulazation/ Added and subtracting events and information
#### D3
* To incorparate data visualization, and aloow for interaction
#### GoogleMaps API, Rates API, GoogleTranslate API
* Used for fetching relevant data upon country selection

## Wireframe
The visualization consists of a single screen containing a map, a search bar and a section to display information.
![alt text](https://github.com/abschectman/)
## Implementation Timeline
#### Day 1:
* Become familiar with the basics of D3
* Test external API using Postman
#### Day 2:
* Set up initial page layout with the map
* Become familiar with making graphs/plots using D3
#### Day 3:
* Populate selected location Data on page
* Work on displaying data in aschetically pleasing manner
#### Day 4:
* Allow user to search by location and return appropriate data
* Add interactive selection to the map so that search can highlight selected country
