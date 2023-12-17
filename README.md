# Advent of Code 2023

My solutions to the [Advent of Code 2023](https://adventofcode.com/2023) challenges.

I keep updating this repository as I solve more challenges. I will keep the code mostly as they were when I solved the challenges; I will possibly only make minor changes to make the code more readable, such as adding comments, renaming variables, and deleting repetition or unnecessary code.

## Post mortem

Like last year, I used JavaScript. I did not use any libraries, but I did use ES6 features, such as `const`, `let`, and arrow functions. I don't use JavaScript too much in my day-to-day work, so I thought this would be a good opportunity to practice. VS Code tools for JavaScript have also improved quite a lot during the past couple of years, making it a quite pleasant experience.

I found myself using "C-like" style (such as for-loops instead of map and reduce) this year more than in previous years. Sure, my background primarily lies in imperative languages and Java-style object-oriented programming, so I am probably biased. Still, I think that in many ways AoC, at least this year and at least for me, favored imperative style. Below, I try to explain the reasoning based on my personal experience.

First, I think imperative style is sometimes (but not always) more readable than functional style. Second, sometimes my functional code was just too slow and I had to change it to imperative style. For example, on [day 16](https://github.com/ajlakanen/AdventOfCode2023/blob/main/16.js), I first went for an arguably nice and elegant recursive solution, but it was just way too slow. I converted most of it to a `while (true)` loop, which _barely_ helped me get the two stars (my code ran for ~60 minutes when I eventually got the result) -- thus, I can't really say that my solution was anywhere near optimal. Similarly, I went with a recursive solution on [part 2 of day 5](https://github.com/ajlakanen/AdventOfCode2023/blob/3a7787ae20819f7588e1ecc8818eb130947f4a0b/05.js#L87) (that task was just pure pain for me), which turned out to be overly complicated and slow. I started to change it to a straightforward for loop, but I haven't finished it yet --- got the two stars, though.

Third, imperative code seems to be so much easier to debug -- which I had to do a lot this year. I don't know if I'm doing something wrong here, but *map*s and *reduce*s are incredibly hard to debug, in VS Code at least. I did use functional style when it made sense, but I found myself using imperative style quite often for this reason.

To be continued...
