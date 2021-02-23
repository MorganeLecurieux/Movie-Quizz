# Morguy's Movie Quiz Test

### How to ?

#### Locally serve it ?

Simply run `yarn start`

#### Build it ?

Easy again, run `yarn build`

#### Wanna check that I coded with pretty coding style ?

Go for `yarn lint`

### A Problem ?

You might run into a CORS error that I wasn't able to manage as I don't have access to the API.
If you're using Chrome, the following command will help :

`open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials`

### Why the internationalization ?

I wanted to try something, that was the good spot 😅

### Some stuff I'd like to improve...

...but didn't got enough time to invest in it :

- I avoided any icon, a proper way to load them needs to be coded
- The API is a bit frustrating as I'd love to just fetch random actors and movies. Since it's paginated, my only option is to refetch from times to times, or maybe keep the last cursor in the localStorage to always refetch new actors at each party. A home made api based on this one could also be fun
- The highscores are not persisted right now, but that would be a good thing to do if the game was live
- Some generic other components (randomly.. the buttons, as for now they have no changes on interaction - which is a bit frustrating ^^)
- A nice theme, but, to have a nice theme... We need a nice design + design system 😜
- Skeletons and loaders everywhere it's needed
- Test the function in **play** and some utils as **humanizeTime**
- Error gestion in apollo
