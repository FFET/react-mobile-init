import React from "react";

import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import { Input, AntButton } from "../src/components";

export default {
  title: "Button test",
  component: Button,
};

export const Text = () => <Button onClick={action("clicked")}>Hello Button</Button>;
export const 输入框 = () => <Input placeholder={"test"} onClick={action("clicked")} />;
export const AntButtonStory = () => (
  <AntButton type="primary" onClick={action("clicked")} style={{ width: 100 }}>
    登录
  </AntButton>
);

export const Emoji = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

Emoji.story = {
  name: "with emoji",
};
