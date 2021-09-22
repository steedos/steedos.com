
import { footerNav } from '@/navs/footer';
import { Logo } from '@/components/Logo'

export const Footer = (props) => {
  return (
  <footer aria-labelledby="footer-heading" className="bg-gray-50">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-20 grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
        {/* Image section */}
        <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
         
        </div>

        {/* Sitemap sections */}
        {/* <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
          <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Products</h3>
              <ul role="list" className="mt-6 space-y-6">
                {footerNav.products.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Company</h3>
              <ul role="list" className="mt-6 space-y-6">
                {footerNav.company.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
            <ul role="list" className="mt-6 space-y-6">
              {footerNav.customerService.map((item) => (
                <li key={item.name} className="text-sm">
                  <a href={item.href} className="text-gray-500 hover:text-gray-600">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* Newsletter section */}
        {/* <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
          <Logo 
            className="h-10 w-auto"
          />

          <h3 className="mt-2 text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
          <p className="mt-1 text-sm text-gray-500">Be the first to know when we release new products.</p>
          <form className="mt-3 sm:flex lg:block xl:flex">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              type="text"
              autoComplete="email"
              required
              className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:flex-1 sm:min-w-0 sm:max-w-xs lg:max-w-none"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0 lg:mt-4 lg:ml-0 xl:mt-0 xl:ml-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div> */}
      </div>

      <div className="border-t border-gray-200 py-10 text-center">
        <p className="text-sm text-gray-500">&copy; 2021 华炎软件, 保留所有权利</p>
        <a className="text-xs text-gray-400 mt-2" href="https://beian.miit.gov.cn/#/Integrated/recordQuery">(沪ICP备09089283号-11)</a>
      </div>
    </div>
  </footer>
  )
}