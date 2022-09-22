# Turn Google Sheets into a REST API and Use it with a React Application

React application to post form data to Google Sheets [build using this blog](https://www.freecodecamp.org/news/react-and-googlesheets/).


### For expanding this project:
- Add a homescreen with different categories cards - Groceries, procurement, etc.
- Instead of semantic UI use [neumorphic UI](https://akaspanion.github.io/ui-neumorphism/). Checkout this [npm package](https://www.npmjs.com/package/ui-neumorphism)
- Each card opens a different react form and stores that value in their own spreadsheet. (procurement stores in procurement and groceries in groceries).
- See if it can be done in a single spreadsheet with different tabs.
- Use function components instead of class based ones.
- Add dropdown in textbox for 'requested by'.
- Make a common list common instead of a list component for each form type. Use redux if necessary or else just use context api.
	- When adding item make API call and store result in redux.
	- When navigates to list component fetch data from redux store and show it in cards.
	- On leaving the list component the redux store should be set to empty.
	- There are many other validations that needs to be kept in mind when implimenting this
- Another way of doing it is to simply add list component below the form.
	- This list will always be visible and the form will be closed. User needs to click on button to toggle open the form.
	- The list here is a common component. Using this method we don't have to add redux thus simplifying the project as well as reducing the size of the bundle.
	- For better UX if the list is empty the form will by default be open and a banner of 'no items in list' can be shown, but if there are items in the list the form needs to be hidden and should be toggle opened.
- [Make this a PWA](https://blog.reactplay.io/building-a-progressive-web-application-pwa-using-react)
- [Use .env file to store API keys](https://www.freecodecamp.org/news/gitignore-file-how-to-ignore-files-and-folders-in-git/)

Note: UI could be a black background with gradient cards for each category. 