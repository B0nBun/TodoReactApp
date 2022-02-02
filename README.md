# TodoApp
This is a "todo" app I created for practice and portfolio. Because of that it is somewhat overengineered.

Originally it was supposed to be just a little test, so I didn't bother with creating a git repository. That's why there are no commits from the start of the project

## Quickstart
If you don't have `yarn`
```
~ npm install --global yarn
~ yarn -v
```
then
```
~ yarn install
~ yarn start
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

OR

```
~ yarn install
~ yarn build
```

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Tech Stack
- [**React**](https://reactjs.org/) for UI
- [**Redux**](https://redux.js.org/) & [**Redux-Thunk**](https://github.com/reduxjs/redux-thunk) for state management
- [**Framer Motion**](https://www.framer.com/motion/) for animations
- [**Emotion**](https://emotion.sh/) for CSS in JS styling

## File Structure

**/public** - static files

**/src** - react app folder

> **/src/components** - react components + styles + Utilities

> **/src/redux** - everything regarding `state` and it's management

## Other

I didn't really want to do any server and back-end stuff, so I just created the `datasource.js` file that has a simulation of delayed async requests. All of the todos are saved in the user's `localStorage`.

There's also a delay for simulation purposes, you can change its value via console
```js
window.delay = 100 // ms
// or
delay = 100 // ms
```
"# TodoReactApp" 
