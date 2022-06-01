import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

let testimonials = [
  // Column 1
  [
    {
      content: '使用可视化界面，进行数据建模，创建对象、字段、关系，快速构建业务系统原型.',
      url: '/docs/admin/object',
      author: {
        name: '数据建模',
        role: '无代码',
        avatar: require('@/img/icons/home/constraint-based.png').default,
      },
    },
    {
      content:
        '华炎魔方提供灵活的多维度数据权限架构。使用权限集、权限集组和简档，控制用户可以访问的对象和字段。使用组织范围的共享设置、用户角色和共享规则，以指定用户可以查看并编辑的单个记录。',
      url: '/docs/admin/permission_set',
      author: {
        name: '权限控制',
        role: '无代码',
        avatar: require('@/img/icons/home/constraint-based.png').default,
      },
    },
    {
      content:
        '定义业务数据的查询与展现形式，您可以自定义需要显示的字段，从不同的维度定义视图展示不一样的数据，设定筛选条件和排序规则等参数。',
      url: '/docs/admin/listview',
      author: {
        name: '列表视图',
        role: '无代码',
        avatar: require('@/img/icons/home/constraint-based.png').default,
      },
    },
    {
      content:
        '页面布局用于控制按钮、字段和相关子表的布局和组织方式。它们也帮助确定哪些字段可见、只读和必填。使用页面布局，为您的用户自定义记录页面的内容。        ',
      url: '/docs/admin/page-layout',
      author: {
        name: '页面布局',
        role: '无代码',
        avatar: require('@/img/icons/home/constraint-based.png').default,
      },
    },
  ],
  [
    {
      content: '通过配置数据源，可以轻松的连接到第三方业务系统，实现与外部数据的打通.',
      url: '/docs/admin/datasource',
      author: {
        name: '外部数据源',
        role: '低代码',
        avatar: require('@/img/icons/home/build-anything.png').default,
      },
    },
    {
      content:
        '可视化查询设计工具，连接外部数据源，编写SQL语句即可预览和生成查询API，进一步搭配报表工具和amis工具实现数据分析功能。',
      url: '/docs/admin/query',
      author: {
        name: '查询设计器',
        role: '低代码',
        avatar: require('@/img/icons/home/build-anything.png').default,
      },
    },
    {
      content:
        '华炎魔方内置功能强大的报表统计与分析功能，可以快速创建分组报表、数据透视图。        ',
      url: '/docs/admin/record_report',
      author: {
        name: '分析报表',
        role: '低代码',
        avatar: require('@/img/icons/home/build-anything.png').default,
      },
    },
    {
      content:
        '基于华炎魔方 Stimulsoft 报表插件，可以使用可视化工具设计像素级报表，例如报价单、发货单等业务单据，或是二维码、条形码。',
      url: '/docs/admin/stimulsoft',
      author: {
        name: '像素级报表',
        role: '低代码',
        avatar: require('@/img/icons/home/build-anything.png').default,
      },
    },
  ],
  [
    {
      content: '通过 VS Code 插件，可以将可视化开发的元数据同步为项目源码，实现元数据的版本管理，并进一步利用传统开发中的DevOps工具实现团队开发和自动化。',
      url: '/docs/developer/sync-metadata',
      author: {
        name: '元数据同步',
        role: 'DevOps',
        avatar: require('@/img/icons/home/editor-tools.png').default,
      },
    },
    {
      content: '通过编写触发器，可以在记录增删改前和增删改查之后自动触发一段服务端代码，实现个性化的数据校验和处理。',
      url: '/docs/admin/object',
      author: {
        name: '触发器',
        role: '高代码',
        avatar: require('@/img/icons/home/editor-tools.png').default,
      },
    },
    {
      content:
        '基于华炎魔方创建的自定义对象，会自动生成 GraphQL API 接口，接口自带身份验证和权限控制，确保业务数据的安全。',
      url: '/docs/developer/graphql-api',
      author: {
        name: 'GraphQL API',
        role: '高代码',
        avatar: require('@/img/icons/home/editor-tools.png').default,
      },
    },
    {
      content:
        '如果华炎魔方自动生成的标准API不能满足业务需求，可以编写自定义API，在服务端处理业务数据。',
      url: '/docs/admin/listview',
      author: {
        name: '自定义API',
        role: '高代码',
        avatar: require('@/img/icons/home/editor-tools.png').default,
      },
    },
  ],
]

function Testimonial({ author, content, url, expanded }) {
  let [focusable, setFocusable] = useState(true)
  let ref = useRef()

  useEffect(() => {
    if (ref.current.offsetTop !== 0) {
      setFocusable(false)
    }
  }, [])

  return (
    <li ref={ref} className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </blockquote>
        <figcaption className="flex items-center space-x-4">
          <img
            src={author.avatar}
            alt=""
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
          />
          <div className="flex-auto">
            <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
              {url ? (
                <a href={url} tabIndex={focusable || expanded ? 0 : -1}>
                  <span className="absolute inset-0" />
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </div>
            <div className="mt-0.5">{author.role}</div>
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

export function Testimonials() {
  let ref = useRef()
  let [expanded, setExpanded] = useState(false)
  let [showCollapseButton, setShowCollapseButton] = useState(false)
  let [transition, setTransition] = useState(false)
  let { ref: inViewRef, inView } = useInView({ threshold: 0 })
  let initial = useRef(true)

  useIsomorphicLayoutEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }
    if (expanded) {
      ref.current.focus({ preventScroll: expanded })
    } else {
      ref.current.focus()
      ref.current.scrollIntoView()
    }
    if (expanded) {
      setShowCollapseButton(false)
    }
  }, [expanded])

  useEffect(() => {
    setTimeout(() => setTransition(expanded), 0)
  }, [expanded])

  useEffect(() => {
    if (!expanded || !inView) return
    function onScroll() {
      let bodyRect = document.body.getBoundingClientRect()
      let rect = ref.current.getBoundingClientRect()
      let middle = rect.top + rect.height / 4 - bodyRect.top - window.innerHeight / 2
      let isHalfWay = window.scrollY > middle
      if (showCollapseButton && !isHalfWay) {
        setShowCollapseButton(false)
      } else if (!showCollapseButton && isHalfWay) {
        setShowCollapseButton(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [expanded, showCollapseButton, inView])

  return (
    <section
      ref={ref}
      tabIndex="-1"
      className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5"
    >
      <h2 className="sr-only">Testimonials</h2>
      <div
        ref={inViewRef}
        className={clsx(
          'grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3',
          !expanded && 'max-h-[33rem] overflow-hidden'
        )}
      >
        {testimonials.map((column, i) => (
          <ul
            key={i}
            className={clsx(
              'space-y-8',
              i === 1 && 'hidden sm:block',
              i === 2 && 'hidden lg:block'
            )}
          >
            {column.map((testimonial) => (
              <Testimonial key={testimonial.author.name} expanded={expanded} {...testimonial} />
            ))}
          </ul>
        ))}
      </div>
      <div
        className={clsx(
          'inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900',
          expanded ? 'sticky -mt-52' : 'absolute',
          transition && 'transition-opacity duration-300',
          expanded && (showCollapseButton ? 'opacity-100' : 'opacity-0')
        )}
      >
        <button
          type="button"
          className={clsx(
            'relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600',
            transition && 'transition-transform',
            expanded && !showCollapseButton && 'translate-y-4',
            (!expanded || showCollapseButton) && 'pointer-events-auto'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '好的，朕知道了 👍' : '查看更多...'}
        </button>
      </div>
    </section>
  )
}
