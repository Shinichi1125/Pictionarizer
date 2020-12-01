# Pictionarizer
An app that helps users strengthen their vocabulary with images and contexts in learning a foreign language

# URL
[http://pictionarizer.work](http://pictionarizer.work)

"Easy Login" button available. You can log in as a "Test User" by just clicking the button. 

# Description (How to use the App)
* Post a new word that you want to remember in your target language.
* When posting the word, add an example sentence to provide a context.
* Also, add an image that fits the word and sentence. Remember the word with the context and image.
* If you find some users that you find interesting, follow them! 
* If you find an interesting example sentence / image, like it and leave a comment! 
* If you find a grammatical mistake in someone's example sentence, kindly correct it :) 
* The interactions mentioned above can also strengthen the learner's memory, because the memory is personalized. 

# Top page screenshot
![Top page](https://user-images.githubusercontent.com/37083992/100702340-30bbc100-33aa-11eb-8671-510df7685c01.png)

# Tools that I used for building this app
## Database
* MySQL

## Backend
* Java
* Spring Boot

## Frontend
* TypeScript
* React
* Bootstrap

## Testing
* JUnit
* Jest
* Enzyme

## Version control
* Git, GitHub

## Infrastructure
* AWS
  * EC2
  * VPC
  * IAM
  * Route 53
* Docker, docker-compose
* CircleCI
  
# Functionality
## User
* "Create User" with name, email address, password, profile image, user description etc
* Login, Logout
* "Update User" (user profile's information can be updated)
* "Delete User" (All the information related to this particular user will also be deleted)

## Word Object (Post something)
* "Create Word" (post a new word you want to remember in your target language)
* "Update Word" 
* "Delete Word" 

## SNS-like functions
* Follow
* Like
* Comment 

## Searching
* Search by keyword
* Filter the search result by username / word

## Others
* User recommendation ("Users that you may want to follow")






