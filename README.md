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
  - Comma Separated Numbers
  - Custom Name
  - Prefix
  - Sorting
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
        commaSeparate: true,
      },
      name: { sort: true },
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

Following settings are applied to data within the selected column.

| Property            | Type    | Default   | Possible Values       | Description                                              |
| ------------------- | ------- | --------- | --------------------- | -------------------------------------------------------- |
| align               | string  | start     | start, center, end    | Change the alignment                                     |
| bold                | boolean | false     | true, false           | Set font weight to bold                                  |
| commaSeparate       | boolean | false     | true, false           | Comma separate numbers                                   |
| dataType            | string  | string    | string, date, number  | Used as sort by type                                     |
| disableInternalSort | boolean | false     | true, false           | Disable internal sort and emit sortClick event           |
| name                | string  | undefined | Any string, undefined | If provided, this will be used as the name of the column |
| prefix              | string  | undefined | Any string, undefined | Prefix to the column data                                |
| sort                | boolean | false     | true, false           | Enable sorting                                           |
| suffix              | string  | undefined | Any string, undefined | Suffix to the column data                                |

## Emitters

### sortClick

This event will be emitted when sorting a column.

**Output Data Type**

```ts
interface CGridSortClickOut {
  column: string;
  type: "asc" | "desc" | "none";
}
```

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
