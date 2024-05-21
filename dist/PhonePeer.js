console.log(
  `
    Welcome to the compatibility check endpoint.
    This page will be accessed from the participant's phone, by way of scanning
    a QR code from the experiment Needs page.
    `
);

const pp = new EasyEyesPeer.PhonePeer({
  onError: (err) => {
    //show alert and reload when alert closes
    console.log(err);
    alert("An error occurred. Please press the button below to refresh.");
    location.reload();
  },
});

await pp.init();
console.log("!. ~ file: index.html:24 ~ pp:", pp);
