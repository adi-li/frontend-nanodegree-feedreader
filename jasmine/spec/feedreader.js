/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).not.toBeFalsy();
            });
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have name defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).not.toBeFalsy();
            });
        });
    });


    /* Test suite about "The menu" */
    describe('The menu', function() {
        /* Ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function(){
            expect($('.menu-hidden .menu').length).toBeGreaterThan(0);
        });

         /* Ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('is toggled by clicking menu icon', function(){
            var icon = $('.menu-icon-link');
            icon.click();
            expect($('.menu-hidden .menu').length).toBe(0);
            icon.click();
            expect($('.menu-hidden .menu').length).toBeGreaterThan(0);
        });
    });

    /* Test suite about "Initial Entries" */
    describe('Initial Entries', function() {
        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
         });

         it('is loaded from loadFeed function correctly', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
         });
    });

    /* Test suite about "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldContent;
        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                oldContent = $('.feed').html();
                loadFeed(1, function(){
                    done();
                }); 
            });
         });

        it('changes the old feed content', function(done){
            var newContent = $('.feed').html();
            expect(oldContent == newContent).toBeFalsy();
            done();
        });
     });

    /* Test suite about "Load Undefined Feed" */
    describe('Load Undefined Feed', function() {
        /* Ensures the error message is shown when loading an undefined feed id.
         */
        beforeEach(function(done){
            loadFeed(-1, function(){
                done();
            });
         });

        it('is handled by showing error message', function(done){
            expect($('.feed .error-message').length).toBeGreaterThan(0);
            done();
        });
     });

    /* Test suite about "Load Feed Error" */
    describe('Load Feed Error', function() {
        var originalFeedCreation;
        /* Ensures the error message is shown when loading an undefined feed id.
         */
        beforeEach(function(done){
            // Backup the original google.feeds.Feed 
            originalFeedCreation = google.feeds.Feed;

            // Create a spy function to fake the execution of google.feeds.Feed
            // The fake one will always load error
            google.feeds.Feed = jasmine.createSpy("google.feeds.Feed() spy").and.callFake(function(){
                return {
                    load: function(cb) {
                        if (cb) {
                            cb({
                                error: 'Load feed error.'
                            });
                        }
                    }
                };
            });

            loadFeed(0, function(){
                done();
            });
         });

        afterEach(function(done){
            // Restore the google.feeds.Feed function
            google.feeds.Feed = originalFeedCreation;
            done();
        });

        it('is handled by showing error message', function(done){
            expect($('.feed .error-message').length).toBeGreaterThan(0);
            done();
        });
     });
}());
