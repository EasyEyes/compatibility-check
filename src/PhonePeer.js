const { PhonePeer } = require("./main");

console.log(
  `
    Welcome to the compatibility check endpoint.
    This page will be accessed from the participant's phone.
  `
);

async function main() {
  // Create custom alert elements
  const modalHtml = `
    <div id="customAlert" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000;">
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; text-align: center;">
        <p>An error occurred. If you typed the address, fix any typo. Then click OK to try again.</p>
        <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 8px 24px; border-radius: 25px; cursor: pointer;">OK</button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const pp = new PhonePeer({
    onError: (err) => {
      console.log(err);
      document.getElementById("customAlert").style.display = "block";
    },
  });

  if (window.phoneApp) {
    window.phoneApp.registerSubmodule(pp);
  } else {
    console.log("PhoneApp not found");
  }
  console.log("!. ~ file: index.html:24 ~ pp:", pp);
}

main().catch((err) => console.error(err));
