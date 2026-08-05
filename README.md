# STEEEEEVE

A very small website. Steve from *Cloudy with a Chance of Meatballs* stands in the middle of a
foodscape sky. There's a button on the monkey thought translator around his neck.

Press it and he says **STEEEEEVE**.

One press in fifteen, he says **gummi bears** instead — and it rains gummy bears.

## Running it

It's plain HTML/CSS/JS with no build step. Open `index.html`, or serve the folder:

```
python -m http.server 8000
```

then visit <http://localhost:8000>.

Add `?gummy=1` to the URL to rig every press to the gummi-bear outcome — handy for showing
someone the good ending without waiting on the dice.

## Files

```
index.html   markup, plus the gummy bear drawn once as an SVG <symbol>
style.css    sky, clouds, Steve layout, the button, the falling-bear animation
script.js    the 1-in-15 roll, audio playback, the downpour
media/       Steve, and the sound clips
media/alt/   spare takes and the untouched originals
```

There are three different recordings of him saying his name — `steve-a/b/c.wav` — and a normal
press rolls between them, never playing the same one twice in a row. Each is trimmed to a single
utterance and levelled to match the others, since the sources ranged about 7x in loudness.

They were picked by comparing log-mel spectrograms of every candidate: two clips that look like
different files can be the same recording, and correlation catches that where filenames don't.
Adding or dropping a take is one entry in the `TAKES` array in `script.js`.

The button is positioned with the `--dome-x` / `--dome-y` custom properties at the top of
`style.css`, as percentages of Steve's image box, so it stays on the dome at any screen size.

## Credits

Steve, his voice (Neil Patrick Harris), and the gummi bears all belong to Sony Pictures Animation.
This is a non-commercial fan toy and claims none of it.

- Steve cutout: [Cloudy with a Chance of Meatballs Wiki](https://cloudywithachanceofmeatballs.fandom.com/wiki/Steve)
- take a: [Myinstants](https://www.myinstants.com/en/instant/steve-cloudy-with-meatballs/)
- take b: [movie-sounds.org](https://movie-sounds.org/steve-the-monkey) — quote listed as "Steve.", Neil Patrick Harris
- take c: [Myinstants](https://www.myinstants.com/en/instant/steeeve-50460/)
- "Gummi Bears.": [movie-sounds.org](https://movie-sounds.org/steve-the-monkey) — 00:50:30 in the film
