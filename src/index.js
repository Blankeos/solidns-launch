import { render } from "@nativescript-community/solid-js";
import { Application } from "@nativescript/core";
import { App } from "./app";

Application.run({
  create: () => {
    document.body.actionBarHidden = true;
    render(() => <App />, document.body);
    return document;
  },
});
