# Welcome to Champ Grid for Angular Contributing Guide

Thank you for investing your time in contributing to Champ Grid for Angular

## Build

Use the following command to build the library.

```bash
$ ng build c-grid-angular
```

## Testing

Build the library and then use the following commands to create a symbolic link to the package.

```bash
$ cd dist\c-grid-angular
# npm link
```

Then create a new angular project and add `"preserveSymlinks": true` in your `angular.json` file.

```json
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "preserveSymlinks": true,
    "outputPath": "dist/c-grid-angular-test",
    "index": "src/index.html",
    "main": "src/main.ts"
  }
}
```

Use the following command in a terminal to include the library to your test project.

```bash
$ npm link c-grid-angular
```

Add the `CGridAngularModule` to your `app.module.ts` file.

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CGridAngularModule } from "c-grid-angular";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CGridAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Now you can use `<c-grid></c-grid>` tag in your `app.component.html` file.
