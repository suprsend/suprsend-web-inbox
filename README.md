# @suprsend/web-inbox

This package is used to integrate inbox channel in non react applications. For react application use [@suprsend/react-inbox](https://docs.suprsend.com/docs/inbox-react).

### Documentation

Documentation can be found here: https://docs.suprsend.com/docs/embeddable-inbox

### Integrate using script tag

This solution works if you are using applications like Django, Laravel, ruby.

```html
<div id="suprsend-inbox"></div>

<script type="text/javascript">
  function initializeSuprSend(distinctId, subscriberId) {
    window.suprSendConfig = {
      workspaceKey: "your_workspace_key",
      distinctId: distinctId,
      subscriberId: subscriberId,
       .....
    };

    let scriptElem = document.createElement("script");
    scriptElem.async = 1;
    scriptElem.src =
      "https://web-inbox-assets.suprsend.com/v0.3.0.js";
    document.body.appendChild(scriptElem);
  }

  initializeSuprSend("your_distinct_id", "your_subscriber_id");
</script>
```

In above code replace **your_distinct_id**, **your_subscriber_id**,  
**your_workspace_key** and **SPECIFIC_VERSION** variables with valid values.

Example code: <https://github.com/suprsend/suprsend-web-inbox/blob/main/index.html>

<br>

### Integrate using NPM module

This solution work if you are using applications like angular, vue etc. If you are using server side rendering frameworks then render this inbox component after mounting on client side.

```shell npm
npm install @suprsend/web-inbox@latest
```

```shell yarn
yarn add @suprsend/web-inbox@latest
```

```javascript
import { initSuprSendInbox } from "@suprsend/web-inbox";

<div id="suprsend-inbox"></div>

const suprSendConfig= {
  workspaceKey: "your_workspace_key",
  distinctId: "your_distinct_id",
  subscriberId: "your_subscriber_id",
  ......
}

initSuprSendInbox(document.getElementById("suprsend-inbox"), suprSendConfig);
```

Calling **initSuprSendInbox** function will initialize inbox inside div tag.

To unmount inbox component manually you can use **cleanSuprSend** function provided in SDK.

```javascript
const targetElement = docuent.getElementById("suprsend-inbox");
cleanSuprSend(targetElement);
```

<br>

### Customising Inbox

For **suprSendConfig** (script and npm package) you can pass other options to customize.

| Field        | Type                 | Description                                                                                                                                                           |
| :----------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| workspaceKey | string (Mandatory)   | You can find it in SuprSend Dashboard inside _Settings -> API Keys_.                                                                                                  |
| distinctId   | any (Mandatory)      | Unique identifier for the user.                                                                                                                                       |
| subscriberId | string (Mandatory)   | This is unique string for every distinctId used for authentication to inbox service. You check [generation docs](https://docs.suprsend.com/docs/hmac-authentication). |
| tenantId     | string (Optional)    | If you use multi-tenant architecture you can get inbox notifications for that specific tenant/brand only.                                                             |
| stores       | IStore\[] (Optional) | Pass stores array if you ant to use [multi-tab feature](https://docs.suprsend.com/docs/multi-tabs).                                                                   |
| pageSize     | number (Optional)    | Notifications to get in one api call. Used for pagination to get older notifications. Maximum allowed is 50. Defaults to 20.                                          |
| pagination   | boolean (Optional)   | By default infinite scroll will be enabled to get older notifications on scroll. It can be disabled by passing false.                                                 |

Other UI based options are:

```javascript suprSendConfig
interface ISuprSendInboxConfig {
  ....
  themeType?: 'light' | 'dark'
  hideInbox?: boolean
  hideToast?: boolean
  hideAvatar?: boolean
  notificationClickHandler?: (notificationData: any) => void
  toastProps?: IToastProps
  theme?: Dictionary
  popperPosition?: 'top' | 'bottom' | 'left' | 'right'
}
```

```javascript Example
const suprSendConfig = {
  workspaceKey: "your_workspace_key",
  distinctId: "your_distinct_id",
  subscriberId: "your_subscriber_id",
  tenantId: "testing",
  themeType: "dark",
  hideToast: true,
  theme: {
    bell: { color: "blue" },
    badge: { backgroundColor: "red", color: "black" },
  },
};
```

Details about these UI styling customizations can be found here: <https://docs.suprsend.com/docs/react-customize-inbox>
