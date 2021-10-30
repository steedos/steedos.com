
import { footerNav } from '@/navs/footer';
import { Logo } from '@/components/Logo'

export const Footer = (props) => {
  return (
  <footer aria-labelledby="footer-heading" className="bg-gray-50 pt-6">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="py-8 grid grid-cols-4 gap-8 xl:col-span-2">
        {footerNav.map((section) => (
        <div className="col-span-2 sm:col-span-1">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{section.name}</h3>
            <ul role="list" className="mt-6 space-y-5">
              {section.items.map((item) => (
                <li key={item.name} className="text-sm">
                  <a href={item.href} className="text-gray-500 hover:text-gray-600">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        ))}
      </div>

      <div className="border-t border-gray-200 py-10 text-center">
        <p className="text-sm text-gray-500">&copy; 2021 华炎软件, 保留所有权利</p>
        <a className="text-xs text-gray-400 mt-2" href="https://beian.miit.gov.cn/#/Integrated/recordQuery">(沪ICP备09089283号-11)</a>
        <img class="max-h-60 mx-auto pt-6" src="https://console.steedos.cn/api/files/images/YRgRK94fwndMxMcjM"/>
      </div>
    </div>
  </footer>
  )
}