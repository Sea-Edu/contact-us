document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData(form);
      const object = Object.fromEntries(formData.entries());
      const json = JSON.stringify(object);
      result.innerHTML = "Please wait...";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status === 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 3000);
        });
    }
  });

  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const consent = document.getElementById("allow-text");
  const allow = document.getElementById("allow");
  const first_check = document.getElementById("general");
  const second_check = document.getElementById("support");



  const first_check_block = document.getElementById("first_check");
  const second_check_block = document.getElementById("second_check");

  firstName.addEventListener("input", () => {
    firstName.classList.remove("invalid");
  });
  lastName.addEventListener("input", () => {
    lastName.classList.remove("invalid");
  });
  email.addEventListener("input", () => {
    email.classList.remove("invalid");
  });
  message.addEventListener("input", () => {
    message.classList.remove("invalid");
  });
  
  first_check.addEventListener("change", () => {
    first_check_block.classList.remove("invalid");
    second_check_block.classList.remove("invalid");
  });

  second_check.addEventListener("input", () => {
    first_check_block.classList.remove("invalid");
    second_check_block.classList.remove("invalid");
  });

  allow.addEventListener('change', () => {
    if(allow.checked){
      consent.classList.remove("invalid-color");
    }
  })

  function validateForm() {
    let isValid = true;

    if (!firstName.value) {
      firstName.classList.add("invalid");
      isValid = false;
    }
    if (!lastName.value) {
      lastName.classList.add("invalid");
      isValid = false;
    }
    if (!email.value) {
      email.classList.add("invalid");
      isValid = false;
    } else if (!validateEmail(email.value.trim())) {
      email.classList.add("invalid");
      isValid = false;
    }
    if (!message.value) {
      message.classList.add("invalid");
      isValid = false;
    }
    if (!consent.checked) {
      consent.classList.add("invalid-color");
      isValid = false;
    }
    if (!first_check.checked && !second_check.checked) {
      first_check_block.classList.add("invalid");
      second_check_block.classList.add("invalid");
      isValid = false;
    }

    if(allow.checked){
      console.log('test');
    }

    return isValid;
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
});
