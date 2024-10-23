
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'


export function Logo(props) {
  
  return (
    // <div id="logo"
    //   className={props.className}
    // />
    <img src="/favicon.png" class={`w-8 h-8 ${props.className}`} alt="Steedos Logo" />
  )
}
