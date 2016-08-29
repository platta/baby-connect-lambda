# Baby Connect Project
This repository contains one part of a multi-part project to enable the
automation of adding data to the [Baby Connect](https://www.baby-connect.com)
service.

The flow is:

- User presses an AWS IoT Button.
- The IoT Button triggers an AWS Lambda function (__baby-connect-lambda__).
- The Lambda function sends a message to an AWS SQS message queue.
- A Raspberry Pi running a listener
([baby-connect-sqs-listener](https://github/platta/baby-connect-sqs-listener))
receives the message from the message queue.
- The listener uses a library
([baby-connect](https://github.com/platta/baby-connect)) to log into the Baby
Connect web site and add the data.

Since Baby Connect doesn't expose an API, the
([baby-connect](https://github.com/platta/baby-connect)) library uses browser
automation. This requires launching chromium as a child process which is not
supported in Lambda and is the reason we use a message queue with a standalone
listener application.

# baby-connect-lambda
This repository contains the code to use in the Lambda function that will be
triggered by the AWS IoT button.