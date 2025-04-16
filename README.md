## @suprsend/web-inbox

> 📘 End of Support for `@suprsend/web-inbox`. Migrate to [@suprsend/web-components](https://docs.suprsend.com/docs/web-components-integration#integration)
>
> We have changed the SDK authentication from HMAC based authentication to JWT based authentication in new SDK. This is done to improve security in frontend applications.

**@suprsend/web-inbox** is used to integrate inbox channel in non react applications. For react application use [@suprsend/react-inbox](https://docs.suprsend.com/docs/inbox-react).

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
      "https://web-inbox-assets.suprsend.com/v0.8.2.js";
    document.body.appendChild(scriptElem);
  }

  initializeSuprSend("your_distinct_id", "your_subscriber_id");
</script>
```

In above code replace **your_distinct_id**, **your_subscriber_id** and  
**your_workspace_key** variables with valid values.

Example code: <https://github.com/suprsend/suprsend-web-inbox/blob/main/index.html>

<br />

### Integrate as NPM module

This solution work if you are using applications like angular, vue etc. If you are using server side rendering frameworks then render this inbox component after mounting on client side.

```shell npm
npm install @suprsend/web-inbox
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

<br />

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
| language     | fr / en (Optional)   | Currently we support french and english languages. Please reach out to us if you need any other language requirement.                                                 |

Other UI based options are:

```javascript suprSendConfig
interface ISuprSendInboxConfig {
  ....
  themeType?: 'light' | 'dark'
  hideInbox?: boolean
  hideToast?: boolean
  hideAvatar?: boolean
  notificationClickHandler?: (notificationData: any) => void
  primaryActionClickHandler?: (notificationData: any) => void
  secondaryActionClickHandler?: (notificationData: any) => void
  headerIconUrl?: URL
  language?: "fr"/"en"
  headerIconClickHandler?: () => void
  toastProps?: {
    duration?: number, // in ms defaults to 3000ms/3sec
    position?:'top-left'| 'top-right'| 'top-center'| 'bottom-left'| 'bottom-right'| 'bottom-center',
    limit?: number // no of toast notifications to show at a time default to 3
  }
  theme?: Dictionary // check Example tab for full details
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
  language: "fr",
  theme: {
    bell: { color: "blue" },
    badge: { backgroundColor: "red", color: "black" },
  },
};

// full theme example

const darkColors = {
  primary: "#2E70E8",
  primaryText: "#EFEFEF",
  secondaryText: "#CBD5E1",
  border: "#3A4A61",
  main: "#1D2635",
  error: "#F97066",
};

const themeExample = {
  bell: { color: "#fff" },
  badge: { backgroundColor: darkColors.primary },
  header: {
    container: {
      backgroundColor: darkColors.main,
      borderBottom: `0.5px solid ${darkColors.border}`,
      boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
    },
    headerText: { color: darkColors.primaryText },
    markAllReadText: { color: darkColors.primary },
    headerIcon: { color: darkColors.primary },
  },
  tabs: {
    color: darkColors.primaryText,
    unselectedColor: darkColors.secondaryText + "D9",
    bottomColor: darkColors.primary,
    badgeColor: "rgba(100, 116, 139, 0.5)",
    badgeText: darkColors.primaryText,
  },
  notificationsContainer: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border,
    },
    noNotificationsText: {
      color: darkColors.primaryText,
    },
    noNotificationsSubtext: {
      color: darkColors.secondaryText,
    },
    loader: { color: darkColors.primary },
  },
  notification: {
    container: {
      borderBottom: `1px solid ${darkColors.border}`,
      readBackgroundColor: darkColors.main,
      unreadBackgroundColor: "#273244",
      hoverBackgroundColor: "#2D3A4D",
    },
    pinnedText: {
      color: darkColors?.secondaryText,
    },
    pinnedIcon: {
      color: "red",
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.secondaryText,
      blockquoteColor: "rgba(100, 116, 139, 0.5)",
    },
    unseenDot: { backgroundColor: darkColors.primary },
    createdOnText: { color: darkColors.secondaryText },
    subtext: { color: "#94a3b8" },
    actions: [
      { container: { backgroundColor: darkColors.primary } },
      {
        container: {
          borderColor: darkColors.border,
          backgroundColor: "transparent",
          hoverBackgroundColor: darkColors.main,
        },
        text: { color: darkColors.secondaryText },
      },
    ],
    expiresText: {
      backgroundColor: "rgba(100, 116, 139, 0.5)",
      color: darkColors.secondaryText,
      expiringBackgroundColor: "rgba(217, 45, 32, 0.15)",
      expiringColor: darkColors.error,
    },
    actionsMenuIcon: {
      color: darkColors.secondaryText,
      hoverBackgroundColor: "rgba(100, 116, 139, 0.5)",
    },
    actionsMenu: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border,
    },
    actionsMenuItem: { hoverBackgroundColor: "rgba(100, 116, 139, 0.2)" },
    actionsMenuItemIcon: { color: darkColors.secondaryText },
    actionsMenuItemText: {
      color: darkColors.secondaryText,
    },
  },
  toast: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border,
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.secondaryText,
      blockquoteColor: darkColors.border,
    },
  },
};
```

**Customization Details**: More details about these UI customization props can be found [here](https://docs.suprsend.com/docs/react-customize-inbox).
