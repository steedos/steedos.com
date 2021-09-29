
import Image from 'next/image'

const defaultLogSrc = require("@/img/logo_platform.png")

export function Logo(props) {
  let logoSrc =  props.src || defaultLogSrc
  return (
    // <Image
    //   src={logoSrc}
    //   className={props.className}
    //   height={40}
    //   width={128}
    // />
    <img src="/logo.png" 
      className={props.className}
      height={40}
      width={128}
    />
  )
}
