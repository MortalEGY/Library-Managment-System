function SigninValidation() {
  // Get the values of the "signin_id" and "signin_password" input fields.
  let Id = document.getElementById("signin_id").value;
  let Password = document.getElementById("signin_password").value;

  // Check if either the "Id" or "Password" fields are empty.
  if (Id === "" || Password === "") {
    return false; // Return false if either field is empty.
  } else {
    // Prepare the parameters for a POST request with JSON data.
    let params = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: Id,
        Password: Password,
      }),
      method: "POST"
    };

    // Send a fetch request to 'http://localhost:4000/signin' with the provided parameters.
    fetch('http://localhost:4000/signin', params)
      .then(response => response.json())
      .then(data => {
        console.log(data.valid);

        // Check if the response data indicates a valid user (valid === 1).
        if (data.valid === 1) {
          // Redirect to './admin.html' with user information as query parameters.
          location.href = './admin.html' + "?Id=" + data.info.Id + "&Name=" + data.info.Name + "&Email=" + data.info.Email + "&Gender=" + data.info.Gender + "&Phone=" + data.info.Phone;
        } else {
          // Show a prompt with the value of 'data.valid' and log an error message.
          prompt(data.valid);
          console.log("User Not Found With this type");
          return false;
        }
      });
  }
}
