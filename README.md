# BmiCalculator


### `npm start`

Runs the app in the localhost.
Open http://localhost:5000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.





### `npm run test`

To check if test passes use--- **npm run test**





### `Endpoints`


**1. Adding documents to the collection use**

 POST http://localhost:5000/api/bmi/add

  **Example-** 
  {
      "gender": "Female", 
      "heightCm": 175,
      "weightKg": 75
  }




**2. Get Data from the collection**

GET http://localhost:5000/api/bmi

**Example-**
{
    "statuscode": 200,
    "message": "BmiCalculator Added Successfully",
    "response": {
        "status": true,
        "_id": "609253bb66ce2a2a18847855",
        "gender": "Female",
        "heightCm": 175,
        "weightKg": 75,
        "bmi": 24.49,
        "bmiCategory": "Normal weight",
        "healthRisk": "Low risk",
        "createdAt": "2021-05-05T08:13:47.388Z",
        "updatedAt": "2021-05-05T08:13:47.388Z",
        "__v": 0
    }
}





