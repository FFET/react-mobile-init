import React from "react";

import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import { Input } from "../src/components";

export default {
  title: "Button",
  component: Button,
};

export const Text = () => <Button onClick={action("clicked")}>Hello Button</Button>;
export const Input2 = () => <Input placeholder={"test"} onClick={action("clicked")} />;

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
