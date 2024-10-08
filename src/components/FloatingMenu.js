import React from 'react';
// import Head from 'next/head';

export const FloatingMenu = function () {
  return (
    <div class="hidden md:flex md:fixed md:top-1/2 md:right-4 md:transform md:-translate-y-1/2 bg-white p-4 rounded-full shadow-lg z-10 flex-col items-center space-y-2">
      {/* <a href="https://sp0dtpsxxk.jiandaoyun.com/f/660a2de0b0a76aafa09bde68" target='_blank' class="flex flex-col items-center px-4 py-2 text-gray-800 text-sm hover:bg-blue-100 w-full rounded-lg">
        <img src="/img/demo.png" alt="预约演示" class="mb-2 h-6 w-6"/>
        预约演示
      </a> */}
      <div class="relative group px-4 py-2 text-gray-800 text-sm w-full rounded-lg hover:bg-blue-100">
          <div class="cursor-pointer flex flex-col items-center w-full">
              <img src="/img/demo.png" alt="微信咨询" class="mb-2 h-6 w-6"/>
              预约演示
          </div>
          <div class="absolute right-28 top-[0.5rem] -translate-y-1/2 w-40 bg-white opacity-0 group-hover:opacity-100 flex flex-col items-center py-1 px-0.5 shadow-xl rounded-lg transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
              <div class="text-gray-700 text-sm mt-3 mb-2 px-0.5">扫码预约产品演示</div>
              <img src="https://console.steedos.cn/api/files/files/66bc4f0bbb7702003d2d7511" alt="商务咨询 QR Code" class="h-32 w-32 m-0.5" />
          </div>
      </div>
      <div class="relative group px-4 py-2 text-gray-800 text-sm w-full rounded-lg hover:bg-blue-100">
          <div class="cursor-pointer flex flex-col items-center w-full">
              <img src="/img/online_consultation.png" alt="微信咨询" class="mb-2 h-6 w-6"/>
              商务咨询
          </div>
          <div class="absolute right-28 top-[0.5rem] -translate-y-1/2 w-40 bg-white opacity-0 group-hover:opacity-100 flex flex-col items-center py-1 px-0.5 shadow-xl rounded-lg transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
              <div class="text-gray-700 text-sm mt-3 mb-2 px-0.5">扫码添加商务微信</div>
              <img src="https://console.steedos.cn/api/files/files/66bc4f0bbb7702003d2d7511" alt="商务咨询 QR Code" class="h-32 w-32 m-0.5" />
          </div>
      </div>
      <div class="relative group px-4 py-2 text-gray-800 text-sm w-full rounded-lg hover:bg-blue-100">
          <div class="cursor-pointer flex flex-col items-center w-full">
              <img src="/img/qywx.svg" alt="微信咨询" class="mb-2 h-6 w-6"/>
              技术咨询
          </div>
          <div class="absolute right-28 top-[0.5rem] -translate-y-1/2 w-40 bg-white opacity-0 group-hover:opacity-100 flex flex-col items-center py-1 px-0.5 shadow-xl rounded-lg transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
              <div class="text-gray-700 text-sm mt-3 mb-2 px-0.5">扫码添加技术服务群</div>
              <img src="https://console.steedos.cn/api/files/files/66bc4f0fbb7702003d2d7513" alt="技术服务 QR Code" class="h-32 w-32 m-0.5" />
          </div>
      </div>
      <div class="group relative px-4 py-2 text-gray-800 text-sm hover:bg-blue-100 w-full rounded-lg">
        <div class="cursor-pointer flex flex-col items-center w-full">
            <img src="/img/mobile_consultation.png" alt="电话咨询" class="mb-2 h-6 w-6"/>
            电话咨询
        </div>
        <div class="w-40 bg-white absolute right-28 top-[1rem] -translate-y-1/2 opacity-0 group-hover:opacity-100 flex flex-col items-center py-3 px-4 shadow-lg rounded-md transition-opacity duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
            <span class="text-gray-700 text-sm">官方免费咨询热线</span>
            <span class="text-blue-700 text-lg font-semibold">400-820-1612</span>
        </div>
      </div>
    </div>
  );
}
