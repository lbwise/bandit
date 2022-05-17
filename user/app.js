const axios = require("axios");
const baseUrl = "http://localhost:3000";

const clProcess = () => {
  const args = process.argv.splice(2);
  if (args.length == 0) {
    return null;
  }
  return {
    verb: args[0],
    value: args[1],
  };
};

const catchAsync = (fn, args) => {
  try {
    fn({ ...args }[0]);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
};

const getProfiles = async () => {
  let url = `${baseUrl}/profile`;
  const profiles = await axios.get(url);
  console.log(profiles.data);
};

const getProfile = async (userId) => {
  let url = `${baseUrl}/profile/${userId}`;
  const profile = await axios.get(url);
  console.log(profile.data);
};

const createProfile = async () => {
  let url = `${baseUrl}/profile`;
  const profile = await axios.post(url, {
    name: "Josh Goodman",
    dateOfBirth: new Date(1987, 2, 22),
    skillLevel: 4,
    location: {
      latitude: -37.874724,
      longitude: 145.058021,
    },
    genres: ["Hip Hop", "Classical"],
    instruments: ["Flute", "Saxaphone", "Trumpert"],
  });
  console.log(profile.data);
};

const getMatches = async (userId) => {
  let url = `${baseUrl}/match/${userId}`;
  const matches = await axios.get(url);
  console.log("--------------------------");
  console.log(`${matches.data.length} MATCH(ES) FOUND`);
  console.log("--------------------------");
  console.log(matches.data);
};


function main() {
  const instructs = clProcess();
  console.log(instructs);
  const out = instructs.value.split("=");
  if (out[0] == "profiles") {
    catchAsync(getProfiles);
  } else if (out[0] == "profile") {
    catchAsync(getProfile, [out[1]]);
  } else if (out[0] == "newProfile") ={

  }
}

main();
