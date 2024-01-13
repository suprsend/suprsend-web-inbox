# @suprsend/web-inbox

This package is used for non react web applications. For react appliction use [@suprsend/react-inbox](https://docs.suprsend.com/docs/inbox-react)

### Documentation

For full documentation on this refer: [Web Inbox](https://docs.suprsend.com/docs/node)

### Quick Setup

Add below snippet in html file

```html
<div id="suprsend-inbox"></div>

<script type="text/javascript">
  function initializeSuprSend(distinctId, subscriberId) {
    window.suprSendConfig = {
      workspaceKey: "your_workspace_key",
      distinctId: distinctId,
      subscriberId: subscriberId,
    };

    let scriptElem = document.createElement("script");
    scriptElem.async = 1;
    scriptElem.src =
      "https://web-inbox-assets.suprsend.com/v{SPECIFIC_VERSION}.js";
    document.body.appendChild(scriptElem);
  }

  initializeSuprSend("your_distinct_id", "your_subscriber_id");
</script>
```

In above code replate `your_distinct_id`, `your_subscriber_id`,
`your_workspace_key` and `SPECIFIC_VERSION` variables with valid values

### License MIT © [https://github.com/suprsend](https://github.com/suprsend)
