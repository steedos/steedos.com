
import Image from 'next/image'


export function Logo(props) {
  return (

    <Image
      src={require("@/img/logo_platform.png")}
      className={props.className}
      height={40}
      width={128}
    />
  )
}
