# DRIVEHUB REACT INTERVIEW TEST
## Problems
- We implementing a bulk renting car
- We provide car list API which is contains car title, photo and price
- We provide discount list API which is contains code and amount
- Create a list of cars and cart checkout
- You can refactor anyway you want
- 
## Requirements
- As a user, I want to see list of car
- As a user, I want to search car by title
- As a user, I want to sorting car by price, title
- As a User, I want to pick many cars as I want
- As a User, I want to update rental duration of each car in cart
- As a User, I want to see total amount of the cart
- As a User, I want to apply a discount coupon
- As a User, I want to refresh the page and the cart is not reset

## Rules
- You can use any libary
- You can use any css tool
- Follow the design from wireframe
  
## Wireframe
- Have CarList Component on the left and Cart Component on the right
![Wireframe](wireframe.png)

## APIs
- Car List `https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car`
- Discount List `https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount`
- access_token `VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o`
- Just put access_token as a params or put it in request header `Authorization: Bearer ${access_token}` should be fine
- API doc `https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/authentication`

## Nice to Have
- Unit Tests
- Component reusable

## Project Submission
- Clone this respository and create your own git (gitlab/github)
- Reply email with git url

