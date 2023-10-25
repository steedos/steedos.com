import { useEffect, useState } from 'react'
import Image from 'next/future/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/salient/Container'
import backgroundImage from '@/images/background-features.jpg'
import screenshotProject from '@/images/screenshots/project.png'
import screenshotObjectFields from '@/images/screenshots/object-fields.png'
import screenshotPageDesigner from '@/images/screenshots/page-designer.png'
import screenshotFlowDesigner from '@/images/screenshots/flow-designer.png'
import screenshotExpenses from '@/images/screenshots/expenses.png'
import screenshotDashboard from '@/images/screenshots/dashboard.png'
import screenshotNodered from '@/images/screenshots/node-red.png'
import screenshotVatReturns from '@/images/screenshots/vat-returns.png'

const features = [
  // {
  //   title: '企业级解决方案',
  //   description:
  //     "只需点击鼠标，就能快速搭建企业级解决方案，处理和分析您的业务数据，并与您现有的业务系统无缝联通。",
  //   image: screenshotProject,
  // },
  {
    title: '可视化页面设计',
    description:
      "全新引入 amis 渲染器，并提供可视化编辑工具，帮助开发人员快速使用 百度 amis 创建自定义页面",
    image: screenshotPageDesigner,
  },
  {
    title: '可视化模型设计',
    description:
      "基于模型驱动，内置功能强大的建模引擎，零代码也能快速创建智能化、移动化的企业应用程序。",
    image: screenshotObjectFields,
  },
  {
    title: '可视化仪表盘设计',
    description:
      '轻松创建和共享交互式仪表板，帮助用户快速了解数据趋势、关键指标和业务运营状况。',
    image: screenshotDashboard,
  },
  {
    title: '可视化流程设计',
    description:
      "内置流程设计、流程运行、管理维护、统计分析与流程优化等各类工具，帮助企业快速部署、有效监控并持续优化业务流程。",
    image: screenshotFlowDesigner,
  },
  {
    title: '可视化开发',
    description:
      '提供基于流程的编程工具，可以让用户轻松地将物联网设备、API和在线服务连接在一起。',
    image: screenshotNodered,
  },
]

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
          可视化，更高效的开发方式
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
          通过直观的拖放界面、预构建的模板和各种自动化工具，用户可以加速应用开发过程，提高工作效率，从而更快地推动业务创新和转型。此外，华炎魔方的可视化界面也大大降低了应用开发的门槛，使得无论是 IT 专业人员还是业务人员都能参与到应用的构建过程中。

          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-blue-600 lg:text-white'
                              : 'text-blue-100 hover:text-white lg:text-white'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white'
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={feature.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  )
}
