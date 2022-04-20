# Songlink App

I have always wanted to share my music taste with the world and now you can share yours as well.\
**Created By: Eric Cheung**

## Hosted App Link

[Songlink App via Heroku](http://songlink-frontend.herokuapp.com/)\
[Songlink (mongodb) backend via Heroku](http://songlink-backend.herokuapp.com/)\
Update v2\
[Songlink (django) Backend via Heroku](http://songlink-django.herokuapp.com/)

## Preview of Songlink

![Imgur](https://i.imgur.com/MdJa4Q1.png)

## Technology Used

- HTML/CSS
- JavaScript

## Frameworks & Libraries

-Mongodb Atlas, Mongoose

Update v2
- Django,Postgresql
- React.js
- API Axios
- Bootstrap for React

## MVP

- Users can view favorited songs by others.
  - User begins on the home page that renders all songs and favorited songs by me.
  - User finds a song that they are interested in and linked to spotify.
  - Anyone is able to edit or delete an favorited song.
  - User is able to add a new favorited song by searching an artist and top song from the artist.
Update v2
- User can view lyrics to their favorite songs
  - User can view lyrics that others have added
  - User can add lyrics with a song title
  - User can edit or delete lyrics
## STRETCH GOALS

- CSS
  -- Flexbox/Grid Display
  -- Custom Logo
  -- Custom Favicon.io
- Song API using apiURL from Axios [Spotify API](https://developer.spotify.com/)
- Search functionality of artists from spotify API as well as artist's top 10 tracks.
- Preview of songs that have sound snippets
- Bootstrap Components


## Future Features

- Responsive Mobile Design
- Search with song title
- Bug when adding consecutive songs, or updating
- Improve styling with more bootstrap
- Creation of users for favoriting and more secure editing/deleting
- Search functionality of favorite songs
- Find a better way to sort songs by genre to give users random songs
- Multiple Artists for a single song
- No duplication of songs

Updated v2
- Connect lyrics to a song as a relationship
- Format lyrics using rich text editor(ex. React Quil)
- Implement musixmatch to generate lyrics

## Models

Songs
- title = models.CharField(max_length=256)
- artist = models.CharField(max_length=128)
- albumTitle = models.CharField(max_length=256,blank=True)
- albumArt = models.CharField(max_length=128,default="/music.jpg")
- genre = models.CharField(max_length=64,blank=True)
- media = models.CharField(max_length=256,blank=True)
- preview = models.CharField(max_length=256,blank=True)
- lyrics = models.ForeignKey('lyrics_api.Lyrics', on_delete=models.CASCADE,null=True)

Update v2
Lyrics
- title = models.CharField(max_length=64)
- text = models.CharField(max_length=2048)

## General Assembly Project Requirements

- A working full-stack application, built by you
- Your project should not include EJS.
- Adhere to the MVC file structure: Models, Views, Controllers (Note, in this case views is React in it's own separate repository; there will not be an actual views directory in your Express backend)
- At least one model with full CRUD.
- At least three react components, defined in their own files, besides App.js.
- Be deployed online and accessible to the public via Heroku (Two git repositories not inside the class repo, one for your backend and one for your frontend)
- At least one GitHub commit per day
- A README.md file with explanations of the technologies used, the approach taken, unsolved problems, user stories, and notes to yourself so you can come back to your project later in the course and be able to pick up your train of thought, etc
- Have links to your hosted and working apps in the README.md files in your GitHub repos.

## Github Repo

[Songlink Frontend](https://github.com/ercheung3/songlink-frontend)\

[Songlink Backend](https://github.com/ercheung3/songlink-django)
