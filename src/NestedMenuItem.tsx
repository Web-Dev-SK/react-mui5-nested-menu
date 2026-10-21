import {forwardRef, MouseEvent, type ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react';
import MenuItem, {MenuItemProps} from '@mui/material/MenuItem';
import {Paper, Popper, type PopperProps} from "@mui/material";
import Box from "@mui/material/Box";

interface NestedMenuItemProps extends MenuItemProps {
  label: ReactNode;
  openDelay?: number;
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
  disableHighlight?: boolean,
  popperProps?: Omit<PopperProps, 'open' | 'anchorEl' | 'children'>;
}

export const NestedMenuItem = forwardRef<HTMLLIElement, NestedMenuItemProps>(
  (
    {
      children,
      label,
      leftIcon,
      rightIcon,
      disableHighlight = false,
      openDelay = 200,
      popperProps,
      ...props
    },
    ref
  ) => {
    const menuItemRef = useRef<HTMLLIElement>(null);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const openTimerRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => menuItemRef.current!);

    useEffect(() => {
      return clearTimers;
    }, []);

    const handleMouseEnter = (event: MouseEvent<HTMLLIElement>) => {
      clearTimers();
      if (props.onMouseEnter) {
        props.onMouseEnter(event as MouseEvent<HTMLLIElement>);
      }
      openTimerRef.current = setTimeout(() => {
        setIsSubMenuOpen(true);
      }, openDelay);
    };

    const handleMouseLeave = (event: MouseEvent<HTMLLIElement>) => {
      clearTimers();
      if (props.onMouseLeave) {
        props.onMouseLeave(event);
      }
      setIsSubMenuOpen(false);
    };

    const clearTimers = () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
    return (
      <MenuItem
        {...props}
        ref={menuItemRef}
        disableRipple
        sx={[
          {
            position: 'relative',
            ...(disableHighlight && {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }),
            ...(isSubMenuOpen && !disableHighlight && {
              backgroundColor: (theme) => theme.palette.action.hover,
            }),
          },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {leftIcon}
        <Box component={"span"} sx={{flexGrow: 1}}>{label}</Box>
        {rightIcon}
        {isSubMenuOpen && (
          <Popper
            {...popperProps}
            open={isSubMenuOpen}
            anchorEl={menuItemRef.current}
            sx={{zIndex: 'modal'}}
          >
            <Paper
              onPointerDown={(e) => e.stopPropagation()}
            >
              {children}
            </Paper>
          </Popper>)}
      </MenuItem>
    )
  }
)

export default NestedMenuItem;

NestedMenuItem.displayName = 'NestedMenuItem';
