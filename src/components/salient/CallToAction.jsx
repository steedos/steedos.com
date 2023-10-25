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
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
          源码驱动开发，引领低代码革命
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
          Steedos DX（Developer Experience）是一个革命性的产品，改变了传统的开发流程，特别强调源码驱动的开发方式。与其他低代码或无代码平台不同，Steedos DX优先考虑版本控制和持续集成/持续部署（CI/CD），使得开发人员能够在一个更加结构化和版本化的环境中协作。
          </p>
          <Button href="https://docs.steedos.com/developer" color="white" className="mt-10">
            了解更多
          </Button>
        </div>
      </Container>
    </section>
  )
}
