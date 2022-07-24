This is an API for matching musicians together based of compatibility
No interface is included however endpoints and requests are displayed below
There is also no authentication or authorization included yet

Endpoints:

**GET /matches/id** - shows all the recommended profiles of a user

**POST /matches/id** - sends a like to the profile of the recommended match (id here represents the id of the liked match)

**GET /matches/id/likes** - Shows all the likes of the user

**GET /profile** - Shows an array of all users

**POST /profile** - Creates a new user following the schema requirement (shown below)

**GET /profile/id** - Shows a users information identified by a unique id (/id)

**PUT /profile/id** - Updates the users information

**DELETE /profile/id** - Deletes the user from the database


User creation Schema:
- name (required)
- dateOfBirth (required)
- location (required):
	- longitude
	- latitude
- instruments (recommeded) (array)
- genres (recommeded) (array)


// includes name, date created, DOB, user location, instruments,
// preffered genres, liked users and matches (mutual likes)
Created by Liam Wise