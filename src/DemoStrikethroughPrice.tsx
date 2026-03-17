import type React from "react";

export const DemoStrikethroughPrice =
  (Wrapped: React.FC<any>) => (props: any) => (
    <div>
      <div
        style={{ textDecoration: "line-through", color: "#aaa", fontSize: 12 }}
      >
        Regulärpreis
      </div>
      <Wrapped {...props} />
    </div>
  );
