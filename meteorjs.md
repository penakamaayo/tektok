# Meteor

### What we'll Cover
* WTH is meteor?
* Live coding
* Learning resources




## So, What is Meteor?
> "Meteor is what we should have built in 1994 at Netscape" - Marc Andressen


* Built on top of Node.js for building real-time apps
* Uses JavaScript on both the client and on the server







## Why Meteor?
* "Meteor is easy to learn"
  * JavaScript will stay relevant as long as people use the internet


## Meteor Principles
* Data on the Wire
  - Modern app serve data, not HTML
* One Language.
  - All hail JS!!
* Database everywhere
  - Mongo's Everywhere
* Latency Compensation
  - Premise: *lets pretend things work right the first time*
* Reactivity
  - Realtime is the new *sexy*.


## What's inside?
- MongoDB
- Node JS
- lots of packages



## Getting started

* installing meteor

```
curl https://install.meteor.com | sh
```

* creating a simple app

```
meteor create yourappname
```

* running your app

```
cd yourappname
meteor
```

* Meteor packages (ruby gem like)

```
meteor add package-name
```

## File Structure of a Meteor App

* /server - only runs on the server
* /client - only runs on the client
* /lib  - both client & server
* /public - public assets
* **Load order**
  * HTML template files are always loaded before everything else
    * Files beginning with main.* are loaded last
    * Files inside any lib/ directory are loaded next
    * Files with deeper paths are loaded next
    * Files are then loaded in alphabetical order of the entire path

## Let's start coding!

##
##
##
##
##
##
##
##



###### So, is Meteor today's Ruby on Rails?
### Ruby on Rails is today's Ruby on Rails.



## References:
* https://www.meteor.com/
* http://docs.meteor.com/
* http://meteorpedia.com/
* http://manual.meteor.com/
* https://meteorhacks.com/
* http://meteorcapture.com/



