const geo = require("geolib");

// Algorithm to find recommended matches - currently hardcoded based off:
// 	location (within 15km)
// 	genre matches (at least 1)
// 	Age gap (within 5 years)
// 	Skill rating (ommitted as not included in seed data)
const isMatch = (user1, user2) => {
  const withinRadius = geo.isPointWithinRadius(
    user1.location,
    user2.location,
    15000
  );
  let sameGenre = false;
  for (let genre of user1.genres) {
    if (user2.genres.includes(genre)) {
      sameGenre = true;
    }
  }
  const user1DOB = new Date(user1.dateOfBirth);
  const user2DOB = new Date(user2.dateOfBirth);
  const ageDiff = user1DOB.getFullYear() - user2DOB.getFullYear();
  const skillDiff = Math.abs(user1.skillLevel - user2.skillLevel);
  if (withinRadius && sameGenre && ageDiff < 5) {
    return true;
  }
  return false;
};

module.exports = isMatch;
