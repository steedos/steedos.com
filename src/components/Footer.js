
import { footerNav } from '@/navs/footer';
import { Logo } from '@/components/Logo'

export const Footer = (props) => {
  return (
  <footer aria-labelledby="footer-heading" className="pt-20">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 grid grid-cols-4 gap-8 xl:col-span-2">
        {footerNav.map((section) => (
        <div key={section.name} className="col-span-2 sm:col-span-1">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{section.name}</h3>
            <ul role="list" className="mt-6 space-y-5">
              {section.items.map((item) => (
                <li key={item.name} className="text-sm">
                  <a href={item.href} target={item.target} className="hover:text-slate-900 dark:hover:text-slate-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 py-10 text-center">
        <p className="text-sm text-gray-500">&copy; 2022 华炎软件, 保留所有权利</p>
        <a className="text-xs text-gray-400 mt-2" href="https://beian.miit.gov.cn">(沪ICP备09089283号)</a>
        <img className="max-h-60 mx-auto pt-6" src="/img/QR_contact.png"/>
      </div>
    </div>
  </footer>
  )
}