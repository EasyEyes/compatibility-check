const { PhonePeer } = require("./main");

console.log(
  `
    Welcome to the compatibility check endpoint.
    This page will be accessed from the participant's phone.
  `
);

async function main() {
  const pp = new PhonePeer({
    onError: (err) => {
      console.log(err);
      alert("An error occurred. Please press the button below to refresh.");
      location.reload();
    },
  });

  await pp.init();
  console.log("!. ~ file: index.html:24 ~ pp:", pp);
}

main().catch((err) => console.error(err));
