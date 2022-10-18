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
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            快速开始
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            注册试用华炎魔方，了解全新的低代码技术如何帮助您大幅降低开发成本，提升开发效率。
          </p>
          <Button href="/register" color="white" className="mt-10">
            免费试用
          </Button>
        </div>
      </Container>
    </section>
  )
}
