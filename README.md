# CloudScrum
This is a repo for structuring scrum online, with burndown charts etc
Written in MEAN 2.0, in typescript only. 

# Run
The gulp default task ensures watch on code changes, compiles all files into a few files that got served with npm start.
The project compiles on change, so the only time you need to restart is when backend changes has been made (restart npm). 

## Problems running gulp
Sometimes gulp fails the default task, often this is due to the build-ts-server got skipped, hence run this and then gulp default
