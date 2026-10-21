# @webdevsk/react-mui5-nested-menu

A reusable nested menu item component for React and Material UI (MUI) v5.

## Features

- Supports nested submenus.
- Configurable submenu opening delay.
- Customizable submenu positioning through `popperProps`.
- Optional left and right icons.
- Configurable highlight for the parent menu item.
- Supports standard MUI `MenuItem` props.
- Written in TypeScript.

## Installation

```bash
npm install @webdevsk/react-mui5-nested-menu
```

### Requirements

- React 18 or later
- Material UI v5

## Usage

```tsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NestedMenuItem from '@webdevsk/react-mui5-nested-menu';

function Example() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  function click(event) {
    console.log(event.currentTarget.textContent)
  }

  return (
    <>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{pointerEvents: 'all'}}
      >
        Open menu
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          Regular item
        </MenuItem>

        <NestedMenuItem
          label="More options"
          rightIcon={<ChevronRightIcon />}
        >
          <MenuItem onClick={click}>Option 1</MenuItem>
          <MenuItem onClick={click}>Option 2</MenuItem>

          <NestedMenuItem
            label="Advanced"
            disableHighlight={false}
            rightIcon={<ChevronRightIcon />}
          >
            <MenuItem onClick={click}>Advanced option 1</MenuItem>
            <MenuItem onClick={click}>Advanced option 2</MenuItem>
          </NestedMenuItem>
        </NestedMenuItem>
      </Menu>
    </>
  );
}
```

## Props

`NestedMenuItem` extends MUI's `MenuItemProps` and supports standard `MenuItem` properties.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Content displayed as the menu item label. |
| `openDelay` | `number` | `200` | Delay in milliseconds before opening the submenu after hovering over the item. |
| `leftIcon` | `ReactNode` | — | Optional content displayed before the label. |
| `rightIcon` | `ReactNode` | — | Optional content displayed after the label. |
| `disableHighlight` | `boolean` | `false` | Disables the background highlight of the parent menu item while its submenu is open. |
| `popperProps` | `Omit<PopperProps, 'open' \| 'anchorEl' \| 'children'>` | — | Additional props for the submenu's MUI `Popper`. |

## Customizing submenu positioning

Use `popperProps` to customize the submenu's placement and behavior.

```tsx
<NestedMenuItem
  label="More options"
  disableHighlight={false}
  popperProps={{
    placement: 'left-start',
  }}
>
  <MenuItem>Option 1</MenuItem>
  <MenuItem>Option 2</MenuItem>
</NestedMenuItem>
```

For available options, see the [MUI Popper documentation](https://v5.mui.com/material-ui/react-popper/).

## Icons

You can use any React node for `leftIcon` and `rightIcon`, including MUI icons.

```tsx
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

<NestedMenuItem
  label="Settings"
  leftIcon={<SettingsIcon />}
  rightIcon={<ChevronRightIcon />}
>
  <MenuItem>Preferences</MenuItem>
  <MenuItem>Account</MenuItem>
</NestedMenuItem>
```

## Imports

Both default and named imports are supported.

```tsx
import NestedMenuItem from '@webdevsk/react-mui5-nested-menu';

// Or

import { NestedMenuItem } from '@webdevsk/react-mui5-nested-menu';
```

## License

[MIT](./LICENSE)
