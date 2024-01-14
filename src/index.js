import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import SuprSendInbox from "@suprsend/react-inbox";

export function initSuprSendInbox(targetElem, config) {
  if (
    !targetElem ||
    !config?.workspaceKey ||
    !config?.distinctId ||
    !config?.subscriberId
  ) {
    return;
  }

  render(
    <SuprSendInbox
      workspaceKey={config.workspaceKey}
      distinctId={config.distinctId}
      subscriberId={config.subscriberId}
      tenantId={config?.tenantId}
      stores={config?.stores}
      pageSize={config?.pageSize}
      pagination={config?.pagination}
      themeType={config?.themeType}
      hideInbox={config?.hideInbox}
      hideToast={config?.hideToast}
      notificationClickHandler={config?.notificationClickHandler}
      popperPosition={config?.popperPosition}
      theme={config?.theme}
      toastProps={config?.toastProps}
    />,
    targetElem
  );
}

export function cleanSuprSend(targetElem) {
  if (!targetElem) return;
  unmountComponentAtNode(targetElem);
}

if (window?.suprSendConfig) {
  const targetElem = document.getElementById("suprsend-inbox");
  const config = window.suprSendConfig || {};
  initSuprSendInbox(targetElem, config);
}
