Task:
Create a web page (can be either deployed on the web or served locally).
The web page should show an Open Layers map. On the map show all the Starbucks store location
according to the list found here. (The list updates so, needs to be fetched every time the page loads).
On the side of the map insert a selection box containing the names of all countries (see attached list).
When the user selects a country from the list, the map should only show the Starbucks stores whose
location fall inside the polygon representing the countries’ territorie for the attached list.

- Filtering should be based only on geographic coordinates.

Bonus: create a service the receives the coordinates of a store and a 3-letter code of a country. The
service should return whether the location is inside the relevant country. This service should be
deployed as a docker container and used by the main web page.

- Feel free to use Turf, Proj4 or any other package you want.
  \*\* the interview will be based on the task so please have the full code available for the interview.

Good Luck 😀
