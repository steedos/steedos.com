import Image from 'next/future/image'

import { Button } from '@/components/salient/Button'
import { Container } from '@/components/salient/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
          引领低代码革命，重新定义开发者体验
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
          与其他低代码或无代码平台不同，Steedos DX优先考虑版本控制和持续集成/持续部署（CI/CD），使得开发人员能够在一个更加结构化和版本化的环境中协作。通过利用源码作为真理的单一来源，它确保了更高的代码质量、更好的团队协作和更快的发布周期。
          </p>
          <Button href="https://docs.steedos.cn/zh-CN/developer" color="white" className="mt-10">
            了解更多
          </Button>
        </div>
      </Container>
    </section>
  )
}
