# Champ Grid for Angular

![GitHub package.json version](https://img.shields.io/github/package-json/v/ChampITSolutions/c-grid-angular)
![GitHub](https://img.shields.io/github/license/ChampITSolutions/c-grid-angular)
![GitHub issues](https://img.shields.io/github/issues/ChampITSolutions/c-grid-angular)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ChampITSolutions/c-grid-angular)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ChampITSolutions/c-grid-angular)
![npm](https://img.shields.io/npm/v/c-grid-angular)

## Features

- Responsiveness (Bootstrap)
- Striped Rows (Bootstrap)

## Getting Started

### Install CGrid & Dependencies

```console
$ npm install c-grid-angular bootstrap
```

### Add CGrid Placeholder to HTML

```html
<c-grid [data]="gridData" [config]="gridConfig"></c-grid>
```

### Importing CGrid Module

```ts
import { CGridAngularModule } from "c-grid-angular";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CGridAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Set CGrid Configurations

```ts
import { CGridConfig } from "c-grid-angular";
```

```ts
config: CGridConfig = {
  responsive: true,
  striped: true,
};
```

## Set CGrid Data

```ts
import { CGridData } from "c-grid-angular";
```

```ts
data: CGridData[] = []

ngOnInit(): void {
  this.data = [{
    id: 1,
    name: "Andrew Miller",
    email: "andrew@miller.com",
    amount: 1334.55
  }, {
    id: 2,
    name: "Chuck Steve",
    email: "chuck@steve.com",
    amount: 1234.55
  }, {
    id: 3,
    name: "Monika Galler",
    email: "monika@galler.com",
    amount: 4567.55
  }, {
    id: 4,
    name: "Joe Tribbiani",
    email: "joe@tribbiani.com",
    amount: 4567.55
  }]
}
```

## Contributors

<a href="https://github.com/ChampITSolutions/c-grid-angular">
  <img src="https://contrib.rocks/image?repo=ChampITSolutions/c-grid-angular"/>
</a>

## How to Contribute

Please read the [docs](docs/CONTRIBUTING.md) about how to contribute for more information
