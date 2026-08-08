# Fractal Curve Generator

This is a project I did in High School while learning JavaScript. It is based off the [Lindenmayer System](https://en.wikipedia.org/wiki/L-system) or L-System for short and is hosted on GitHub Pages [here](https://flame48.github.io/Fractal-Curve-Generator/).

## Example Fractals

Here are some example fractals for reference,

Example Fractals:

**Sierpinski Arrowhead:**
<img width="1600" height="1600" alt="image" src="https://github.com/user-attachments/assets/d4c8b96f-7d0c-48aa-a363-d95e4d4cd10d" />
```
Axiom: A
A --> BF+AF+B
B --> AF-BF-A
turn: 60
```

**Hilbert Curve:**
<img width="1600" height="1600" alt="image" src="https://github.com/user-attachments/assets/0f827c3b-7de7-4c58-a7bd-aea2b8ce62a1" />
```
Axiom: A
A --> +BF-AFA-FB+
B --> -AF+BFB+FA-
turn: 90
```

**Gosper:**
<img width="1600" height="1600" alt="image" src="https://github.com/user-attachments/assets/b86e337d-6631-4139-ac88-aca33dc884f1" />
```
Axiom: F
F --> F-G--G+F++FF+G-
G --> +F-GG--G-F++F+G
turn: 60
```

**Dragon:**
<img width="1600" height="1600" alt="image" src="https://github.com/user-attachments/assets/ed1df59b-097b-4b8b-9ce1-fdf880109879" />
```
Axiom: F
F --> F+G
G --> F-G
turn: 90
```

**My Own Discovery:**
<img width="1600" height="1600" alt="image" src="https://github.com/user-attachments/assets/3e44f721-1166-47bd-8332-14653c98ccf2" />
```
Axiom: F
F --> F+G+F
G --> G-F-G
turn: 60
```

# Contact

If you have any questions or otherwise want to reach out, feel free to! My email is arajan8@wisc.edu
