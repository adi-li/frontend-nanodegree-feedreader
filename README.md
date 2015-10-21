# Feed Reader Behavioral Test

## How to run?

1. Go to the project folder.
1. Run `python -m SimpleHTTPServer 8000` command in terminal.
1. Open browser and go to [http://localhost:8000](http://localhost:8000).
1. View the test result.

## Added tests

* Load Undefined Feed
  * It test `loadFeed` function for handling an undefined feed id is passed to it.<br>
  Expected a template with class `.error-message` is shown inside the `.feed` container instead of `.entry`.

* Load Feed Error
  * It test `loadFeed` function for handling error from loading feed on `google.feeds.Feed.load`.<br>
  Expected a template with class `.error-message` is shown inside the `.feed` container instead of `.entry`.
