# Steps to integrate inbox in angular

This document will cover the methods to integrate SuprSend SDK in your Angular applications. Adding this SDK to your app will introduce a bell icon where all the inbox notifications can be viewed. A typical inbox, toast message will look like this.

**Stage 1.** Bell icon count and toast message as soon as the notification is delivered

![](https://files.readme.io/259b66b-image.png)

**Stage 2.** Inbox view after clicking on the bell icon

<br />

![](https://files.readme.io/9bdbeae-image.png)

You can also customize your inbox by passing specific props provided by SDK.

You can integrate SuprSend inbox in 2 ways:

- Using [In-built UI component](https://github.com/suprsend/suprsend-web-inbox?tab=readme-ov-file#integrate-as-npm-module) provided by SuprSend. It has many css customisations to change default components styles.
- Using methods provided by SuprSend and building your own UI for inbox ie., [headless implementation](https://docs.suprsend.com/docs/inapp-feed).

# Using DropIn Inbox component

## Installation

You can use [embeddable inbox](https://github.com/suprsend/suprsend-web-inbox?tab=readme-ov-file#integrate-as-npm-module) provided by SuprSend in angular websites.

```shell npm
npm install @suprsend/web-inbox
```

```shell yarn
yarn add @suprsend/web-inbox
```

<br />

## Integration

1. Add the **div** tag in your code where you want to add inbox. Inbox will be embedded in that div using id.

```html test.component.html
<div id="suprsend-inbox"></div>
```

2. Import the SDK in your code and initialize it. Replace **workspaceKey**, **distinctId**, **subscriberId** with your values. Make sure you don't call **initSuprSendInbox** multiple times which may create issues.

```javascript test.component.ts
import { initSuprSendInbox } from "@suprsend/web-inbox";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"],
})
export class TestComponent {
  ngOnInit(): void {
    const suprSendConfig = {
      workspaceKey: "your_workspace_key",
      distinctId: "your_distinct_id",
      subscriberId: "your_subscriber_id",
    };

    initSuprSendInbox(
      document.getElementById("suprsend-inbox"),
      suprSendConfig
    );
  }
}
```

3. This SDK is written in Javascript so typeDefs need to be added manually to support typescript type-check strict configuration. Below is just one way to add typeDef in angular. You can choose other ways as well.
   1. Create **types/index.d.ts** inside app directory.
   2. Declare the module and methods. If you add other customization properties add them here.
   ```typescript index.d.ts
   declare module "@suprsend/web-inbox" {
     function initSuprSendInbox(
       target: HTMLElement | null,
       config: {
         workspaceKey: string;
         distinctId: string;
         subscriberId: string;
       }
     ): void;
   }
   ```
   iii. In **tsconfig.app.json** file add type file in **compilerOptions.typeRoots** key.
   ```json tsconfig.app.json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "outDir": "./out-tsc/app",
       "typeRoots": ["./src/types/"] // add this
     },
     "files": ["src/main.ts"],
     "include": ["src/**/*.d.ts"]
   }
   ```

<br />

## Customization

All the options and styles supported by embeddable inbox can be used to customize in angular as well. Please refer [customization doc](https://github.com/suprsend/suprsend-web-inbox?tab=readme-ov-file#customising-inbox)

<br />

### Example Implementation

You can refer example application to integrate the inbox and toast functionality: [https://github.com/suprsend/angular-example](https://github.com/suprsend/angular-example/blob/master/src/app/dashboard/dashboard.component.ts)
