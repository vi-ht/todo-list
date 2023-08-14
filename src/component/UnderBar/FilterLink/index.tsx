"use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

const style = {
  fontSize: "16px",
  textDecoration: "none",
  color: "gray",
}


const activeStyle = {
  borderRadius: "0",
  fontSize: "16px",
}

const normalStyle = {
  border: "none",
  fontSize: "16px",
}

const ChipTemplate = ({ option, children }: any) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      label={children}
      sx={option ? activeStyle : normalStyle} />
  );
}

export default function FilterLink() {
  const pathname = usePathname();
  const [options, setOptions] = useState({ all: true, active: false, completed: false });
  useEffect(() => {
    const changeLink = () => {
      switch (pathname) {
        case "/":
          setOptions({ all: true, active: false, completed: false })
          break;
        case "/active":
          setOptions({ all: false, active: true, completed: false })
          break;
        case "/completed":
          setOptions({ all: false, active: false, completed: true })
          break;
        default:
          return true;
      }
    }
    changeLink();
  }, [pathname])
  return (
    <Stack direction="row" sx={{ position: "relative", left: "10px" }}>
      <ChipTemplate option={options.all}>
        <Link href="/" style={ style } > All</Link>
      </ChipTemplate>
      <ChipTemplate option={options.active}>
        <Link href="/active" style={style}>Active</Link>
      </ChipTemplate>
      <ChipTemplate option={options.completed}>
        <Link href="/completed" style={style}>Completed</Link>
      </ChipTemplate>
    </Stack>
  )
}
