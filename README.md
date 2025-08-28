The API test for the bookstore application:

I have kept my approach simple, and tried a CRUD operation in tests. The authetication token is saved using the playwrights inbuilt options, such as projects and dependencies.
The API auth context is further used for all requests hitting from the tests. 
For the Data creation I have made use of the type interface for preventing values mismatches. The creation of values, I have used it as fixtures.
As per the mentioned, assignment, it was also required  to run the negative test. I have seen few negative test flows.
I have included one as using the duplicate ID for create request.
Reports used are allure, however HTML reports were fine, but as per instructions I have added the external reporting mechanism.
For the envrinoment setting, I have created a utility which should check the properties presence before assigning the value.
I have used Libraries such as Faker, to generate the Book Details.
Last part of assignment was supposed to be for the CI/CD integration, my builts on repo are failing despite setting the actions secret keys,
this will need the debugging and in interest of time for the submission of this project I am unable to add the CI/CD integration.

I have also added the solo services, but have used the skip as of now for them. 

Thank you.
Ankita.
