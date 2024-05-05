import React, { useRef, useState } from 'react';
import { Avatar, Card, ClickAwayListener, Popper, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AuthMenu } from './AuthMenu/AuthMenu';

export const AuthPopper = ({ bannerRef }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const lock = useRef(false);

  const handleClick = (event) => {
    if (lock.current) return;
    lock.current = true;
    setTimeout(() => (lock.current = false), 100);

    if (open) {
      bannerRef.current.style.removeProperty('padding-right');
      return setAnchorEl(null);
    }
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title={`${!open ? 'Account' : ''}`}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </Tooltip>
      <ClickAwayListener mouseEvent="onMouseUp" touchEvent="onTouchEnd" onClickAway={handleClick}>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-end" className="z-20">
          <Card elevation={5} className="backgroundColor rounded-2xl mt-4 p-4 min-w-64">
            <AuthMenu />
          </Card>
        </Popper>
      </ClickAwayListener>
    </>
  );
};
