# Solesca's Full-Stack Junior SWE Programming Interview
## Copyright Notice
&copy; Solesca Energy Inc., 2022. All rights reserved. Sharing or distributing this repository without the permission of Solesca Energy Inc. is prohibited.
## Welcome!
Welcome to Solesca's take-home assignment for junior software engineers! This should be a fun yet challenging test to allow you to demonstrate your skills in React and Python. For the take-home part, we're going to be solely focusing on the backend.

Here are some of the things we'll be looking for in your solution:

- Can you clone and set up this workspace?
- Can you create an effective solution in a reasonable amount of time?
- Does it actually work?
- Did you add any unnecessary complexity?
- Is it well tested?
- Can you maintain good project hygiene, treating this like "real world" software that you would want to maintain in perpetuity?

In short, we’re looking for code that is clean, readable, performant, and maintainable.

## The Problem: Laptop Stickers

### Overview

You've just purchased a new PearBook Pro, and are looking to get in the holiday spirit by decorating it with stickers. You're feeling really festive, and want to cover as much of your laptop as possible.

The problem is: you bought more stickers (41, to be exact) than can fit on your laptop, and all of the stickers are different shapes. You need to figure out what configuration of stickers results in the greatest surface area coverage of your PearBook.

You are provided with a frontend, built using React and Next.js, and a backend, built using Python and Flask. For this take-home, you will not need to change anything on the frontend. On the backend, you are asked to write code to maximize the amount of surface area coverage of the stickers placed on the PearBook (silver rectangle) without overlapping or overhanging stickers or covering the pear logo.

![Scoreboard and blank PearBook](/init_screen.png "The initial screen you'll see")
_The default frontend, before you've covered your PearBook with stickers. After you've edited the backend, when you click `Run`, your configuration of stickers should appear._

### What to do

**For this take-home, you are only asked to change the `app.py` and `ideas.md` files within the `backend` folder. For `app.py`, you only need to modify the section starting at `line 78`. In `ideas.md`, please jot down your thought process as you go. You will be asked to submit both of these files.**

That being said, you are welcome to modify any part of the code if you see the need.

This backend makes heavy use of the Shapely library, which is built off of the GEOS library, part of the Java Topology Suite. I strongly suggest familiarizing yourself with the Shapely documentation here: <a href='https://shapely.readthedocs.io/en/stable/manual.html' target='_blank'>https://shapely.readthedocs.io/en/stable/manual.html</a>.

Here are some of the most common operations to know:

```bash
affinity.rotate(geom, angle, origin='center', use_radians=False)
affinity.translate(geom, xoff=0.0, yoff=0.0)
object.contains(other)
object.intersects(other)
```

The primary goal of your code is to **maximize the percent coverage of stickers** on the PearBook. Again, the stickers may not overlap one another, cover the pear logo, or hang off of the computer.

The percent coverage is automatically calculated and displayed on the frontend, along with the execution time. Your code should have a reasonable execution time for the percent coverage you achieve (it's up to you to define "reasonable"). If you're achieving high percentages of coverage, it's OK for your code to take a bit longer to run.

**Don't stress if you don't get a percent coverage that you think is good. We're more interested in your process and the way you approach the problem.** Still, do try to get as high a percentage as you can. 

You are given five inputs: `sticker_data`, `pear_book`, `pear_book_dims`, `pear_logo`, and `pear_logo_dims`. There is not a requirement to use all of these inputs.

Your code should have one output: `sticker_response`, which is a one-dimensional list.

I give more info about the inputs and output below.

### Input format (provided)

- `sticker_data`
  - Data type: `list` (one dimensional) of `dictionaries`
    - Length = total number of stickers = 41
  - Contains all relevant information about the stickers
  - Schema:
    - [{`'polygon'`: shapely Polygon object (outer boundary of sticker), `'width'`: int (pixels), `'height'`: int (pixels), `'i'`: sticker number}]
- `pear_book`
  - Data type: `Shapely Polygon` 
  - For the outer border of the PearBook
    - Includes the border radius
- `pear_book_dims`
  - Data type: `list`
  - Width and height of PearBook
    - Varies based on screen size
  - Schema:
    - [`width` in pixels (int), `height` in pixels (int)]
- `pear_logo`
  - Data type: `Shapely MultiPolygon`
  - For the pear logo 
    - Includes stem
- `pear_logo_dims`
  - Data type: `list`
  - Width and height of the pear logo
  - Schema: 
    - [`width` in pixels (int), `height` in pixels (int)]

### Output format (what your program generates)

- `sticker_response`
  - This list is the **only output** your program needs
  - Data type: `list` (one dimensional) of `dictionaries`
    - An empty listed named `sticker_response` has been initialized for you.
    - Length = however many stickers your program used
  - Contains all relevant information about your sticker selections, positions, and rotations.
  - Schema:
    ```bash
    [{'size': [width (int), height (int)], 'position': [x (int), y (int)], 'rotation': degrees (int), 'i': (int)}, ...]
    ```
    - Notes: `size` and `i` are immutable and should be passed on from `sticker_data`. Your program should only need to come up with `position` and `rotation`.
        - The origin for `position` is the upper left hand corner.
        - If your program doesn't want to rotate the shape, it should still specify a `rotation` value of 0.
  - Truncated example:
    ```bash
    [{'size': ['140', '126'], 'position': [0, 0], 'rotation': 0, 'i': 5}, {'size': ['130', '127'], 'position': [108, 14], 'rotation': 0, 'i': 12}, ...]
    ```


## Problem Environment

### Getting Started

First, clone this repository:

```bash
git clone https://github.com/Solesca-Energy/junior_interview.git
```

### Frontend

Change directory to the frontend directory:

```bash
cd frontend
```

Then, start the development server:

```bash
yarn dev
```

If you don't have the Yarn package manager installed, make sure to install that first.

Open <a href='http://localhost:3000' target='_blank'>http://localhost:3000</a> with your browser to see the result.

### Backend

In a new terminal:\
Change directory to the backend directory:

```bash
cd backend
```

Create a new virtual environment (the "python3" keyword may change depending on how you have Python configured):

```bash
python3 -m venv venv
```

Then, activate the virtual environment:

```bash
source venv/bin/activate
```

or on Windows (cmd.exe):

```bash
venv\Scripts\activate.bat
```

There should now be a `(venv)` next to your name/hostname.\
\
Next, install the required Python packages:

```bash
pip install -r requirements.txt
```

Finally, start the Flask server:

```bash
flask run
```

**Whenever you make changes to your code, remember to restart the Flask server to apply those changes:**

```bash
CTRL+C
flask run
```

If you need to stop the virtual environment, run:

```bash
deactivate
```

And of course, click the big green `Run` button to visualize your solution.

## Project Guidelines & Caveats

### Guidelines:

- Stickers must not overlap one another.
- Stickers must not cover the PearBook logo (even partially).
- Stickers must not hang off of the PearBook.
- You may not change the size of the stickers.
- You may not reuse stickers.
- No hard-coding: sticker selections, positions, and rotations must be generated by your program.
- Rotating the stickers is optional.
- You're not expected to, nor should you need to, edit any other portion of the code besides the designed section, BUT you may if you wish.

### Caveats:

- Careful if/when rotating stickers: this can cause them to hang off the PearBook or intersect one another.
- The frontend has been designed to be responsive, and the backend has been designed to accommodate different screen sizes. Don't worry if you think your screen dimensions put you at a disadvantage, I'll run all submitted code on my laptop as well to ensure uniformity.
- Do make sure that your code can handle a few different screen sizes (laptop or monitor, don't worry about mobile).
- You won't be able to fit all of the stickers on the screen. Your code should select the ones that maximize the coverage you're able to obtain.

## Getting Help & External Sources

**At any point, please contact me (Brendan Devine) at bdevine@solesca.com to report a bug or ask questions!**

You **may**:

- Consult the internet, including open source code, videos, documentations, etc.
- Refer to any notes or previous code you have.
- Import open-source libraries. If you do, please perform the following command and include this new `requirements.txt` file in your upload:

```bash
pip freeze > requirements.txt
```

You **may not**:

- Seek help from other individuals.
- Copy and paste code without being able to explain its function.
- Share or discuss your solution or this take-home assignment with anyone, **even after you have submitted your solution**.

## Submitting Your Solution
It should be possible to set up this repo and come up with a minimally viable solution in around two hours. At that point, if you are satisfied, you may submit your solution or continue improving it until the submission deadline. If you finish before the deadline and are confident you don't want to make more changes, please submit early so we can begin reviewing your solution.

Submit your solution at: <a href='https://forms.gle/243yKmHzBsHRJwUY9' target='_blank'>https://forms.gle/243yKmHzBsHRJwUY9</a>. You are asked to provide your `name`, `email address`, your `app.py` and `ideas.md` file (along with any other modified files), and a `screenshot` of the visualization of your solution (not the code). 


**This take-home assignment is due at 11:59 P.M. Eastern time on Sunday, October 30, 2022**. 
