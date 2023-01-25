<h1>BandIt</h1>
<h3>Find the all the hiding musicians that are just like you!</h3>
<br/>
This is an API for matching musicians together based of compatibility.
Compatibility is based off of:
<li>Instrument</li>
<li>Age</li>
<li>Location</li>
<li>Skill</li>
<li>Preferred Genres</li>


No interface is included however endpoints and requests are displayed below.
There is also no authentication or authorization included yet.

<h2>Endpoints:</h2>

**GET /matches/id** - shows all the recommended profiles of a user

**POST /matches/id** - sends a like to the profile of the recommended match (id here represents the id of the liked match)

**GET /matches/id/likes** - Shows all the likes of the user

**GET /profile** - Shows an array of all users

**POST /profile** - Creates a new user following the schema requirement (shown below)

**GET /profile/id** - Shows a users information identified by a unique id (/id)

**PUT /profile/id** - Updates the users information

**DELETE /profile/id** - Deletes the user from the database


<h2>User creation Schema:</h2>
<li>name (required)</li>
<li>dateOfBirth (required)</li>
<li>location (required):</li>
<ul>
<li>longitude</li>
<li>latitude</li>
</ul>
<li>instruments (recommeded) (array)</li>
<li>genres (recommeded) (array)</li>
<li>skill level (int 1 - 10)</li>
<br/>
<strong>Created by Liam Wise<strong>
