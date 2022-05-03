# Champ Grid for Angular

![GitHub package.json version](https://img.shields.io/github/package-json/v/ChampITSolutions/c-grid-angular)
![GitHub](https://img.shields.io/github/license/ChampITSolutions/c-grid-angular)
![GitHub issues](https://img.shields.io/github/issues/ChampITSolutions/c-grid-angular)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ChampITSolutions/c-grid-angular)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ChampITSolutions/c-grid-angular)
![npm](https://img.shields.io/npm/v/c-grid-angular)

## Features

- Responsiveness
- Striped Rows
- Column Configurations
  - Alignment
  - Bold
  - Custom Name
  - Prefix
  - Suffix

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
  data: {
    columns: {
      amount: {
        align: "end",
        prefix: "$",
        name: "Amount",
      },
      id: { bold: true, suffix: "--", name: "#" },
    },
  },
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

## Configurations

| Property   | Type                                | Default   | Possible Values |
| ---------- | ----------------------------------- | --------- | --------------- |
| data       | [CGridConfigData](#CGridConfigData) | undefined | N/A             |
| responsive | boolean                             | false     | true, false     |
| striped    | boolean                             | false     | true, false     |

### CGridConfigData

| Property | Type                                              | Default   | Possible Values |
| -------- | ------------------------------------------------- | --------- | --------------- |
| columns  | [CGridConfigDataColumns](#CGridConfigDataColumns) | undefined | N/A             |

#### CGridConfigDataColumns

| Property                               | Type                                            | Default | Possible Values |
| -------------------------------------- | ----------------------------------------------- | ------- | --------------- |
| columnId (Can add one for each column) | [CGridConfigDataColumn](#CGridConfigDataColumn) | N/A     | N/A             |

##### CGridConfigDataColumn

| Property          | Type    | Default   | Possible Values       |
| --------          | ------- | --------- | --------------------- |
| align             | string  | start     | start, center, end    |
| bold              | boolean | false     | true, false           |
| name              | string  | undefined | Any string, undefined |
| prefix            | string  | undefined | Any string, undefined |
| suffix            | string  | undefined | Any string, undefined |
| commaSeparate     | boolean | false     | true, false           |

## Issue Reporting

If you have found a bug in the grid, please report it in the [issues](https://github.com/ChampITSolutions/c-grid-angular/issues) section.

## How to Contribute

Please read the [docs](docs/CONTRIBUTING.md) about how to contribute for more information

## Contributors

<a href="https://github.com/ChampITSolutions/c-grid-angular">
  <img src="https://contrib.rocks/image?repo=ChampITSolutions/c-grid-angular"/>
</a>

## License

Champ Grid for Angular is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
