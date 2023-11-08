# Library-Managment-System
Assessment for GeekyAir Job Application

## Application Documentation

### Application Overview

This documentation provides information on how to set up and run the application and details the API endpoints with expected inputs and outputs.

### Setting Up the Application

1. **Clone the Repository:**
   Clone the application's source code repository from your version control system.

   ```shell
   git clone https://github.com/MortalEGY/Library-Managment-System
   ```

2. **Install Dependencies:**
   Navigate to the project directory and install the required dependencies.

   ```shell
   cd Library-Managment-System
   npm install
   ```

3. **Environment Configuration:**
   Create a configuration file (e.g., `.env`) to set up environment variables for your application. Here are the environment variables to configure:

   - `PORT`: The port on which your application should run.
   - `DATABASE_URL`: The URL for your database.

4. **Database Setup:**
   Set up your database and apply any necessary migrations or seed data.

5. **Run the Application:**
   Start the application by running the following command:

   ```shell
   node your-app.js
   ```

6. **Access the Application:**
   Open a web browser and navigate to `http://localhost:4000`, where `4000` is the port you specified in the environment configuration.

### API Endpoints

#### 1. `/book`

- **Method:** POST
- **Description:** Retrieve a list of books.
- **Input:**
  - No request body required.
- **Output:**
  - JSON response with an array of book data.
- **Example Response:**
  ```json
  {
    "data": [
      {
        "BookId": "123",
        "Name": "Sample Book",
        "Publisher": "Publisher Name",
        "Author": "Author Name",
        "ISBN": "978-1234567890",
        "Edition": "1st",
        "Pages": 200,
        "Available": 5
      },
      // Additional book entries...
    ]
  }
  ```

#### 2. `/borrower`

- **Method:** POST
- **Description:** Retrieve a list of borrowers.
- **Input:**
  - No request body required.
- **Output:**
  - JSON response with an array of borrower data.
- **Example Response:**
  ```json
  {
    "data": [
      {
        "Id": "1",
        "Name": "John Doe",
        "Email": "johndoe@example.com",
        "Phone": "1234567890",
        "Gender": "Male"
      },
      // Additional borrower entries...
    ]
  }
  ```

#### 3. `/bookreport`

- **Method:** POST
- **Description:** Retrieve a report of issued books to borrowers.
- **Input:**
  - No request body required.
- **Output:**
  - JSON response with an array of book issuance data.
- **Example Response:**
  ```json
  {
    "data": [
      {
        "borrower Id": "1",
        "borrower Name": "John Doe",
        "Book Id": "123",
        "Book Name": "Sample Book",
        "Issued Date": "2023-11-08",
        "Due Date": "2023-11-15",
        "Return": "<a href=\"#\">Return</a>",
        "Fine": 0
      },
      // Additional issuance entries...
    ]
  }
  ```

### Additional Features

- The application provides functionality to add books, borrowers, and issue books to borrowers. Use the respective functions to interact with these features.

### Conclusion

This documentation should help you set up and understand the API endpoints of the application. Please refer to the source code for additional details and customizations. If you encounter any issues or have questions, please refer to the application's support channels or contact the developer for assistance.
