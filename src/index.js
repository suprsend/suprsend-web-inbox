import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import SuprSendInbox from "@suprsend/react-inbox";
import "react-toastify/dist/ReactToastify.css";

function CustomHeaderRightComponent({ markAllRead, config, language }) {
  const markAllAsReadText =
    language === "fr" ? "Tout marquer comme lu" : "Mark all as read";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <p
        style={{
          fontWeight: 600,
          fontSize: 16,
          color: "#2E70E8",
          fontSize: 12,
          cursor: "pointer",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
          margin: 0,
          ...(config?.theme?.header?.markAllReadText || {}),
        }}
        onClick={(e) => {
          e.stopPropagation();
          markAllRead();
        }}
      >
        {markAllAsReadText}
      </p>
      {config?.headerIconUrl && (
        <img
          src={config.headerIconUrl}
          alt="header image"
          style={{
            height: 18,
            width: 18,
            cursor: "pointer",
            ...(config?.theme?.header?.headerIcon || {}),
          }}
          onClick={(e) => {
            e.stopPropagation();
            config?.headerIconClickHandler?.();
          }}
        />
      )}
    </div>
  );
}

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
      host={config?.host}
      tenantId={config?.tenantId}
      stores={config?.stores}
      pageSize={config?.pageSize}
      pagination={config?.pagination}
      themeType={config?.themeType}
      hideInbox={config?.hideInbox}
      hideToast={config?.hideToast}
      language={config?.language}
      notificationClickHandler={config?.notificationClickHandler}
      primaryActionClickHandler={config?.primaryActionClickHandler}
      secondaryActionClickHandler={config?.secondaryActionClickHandler}
      popperPosition={config?.popperPosition}
      theme={config?.theme}
      toastProps={config?.toastProps}
      headerRightComponent={({ markAllRead }) => (
        <CustomHeaderRightComponent
          config={config}
          markAllRead={markAllRead}
          language={config?.language}
        />
      )}
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
