import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mountain, Search, FileText, Users, Calendar, Briefcase, Twitter, Facebook } from 'lucide-react'

const NavLink = ({ href, children }) => (
  <Link href={href} className="hover:text-blue-200 transition-colors" prefetch={false}>
    {children}
  </Link>
)

const InfoCard = ({ title, content, linkText = "查看详情" }) => (
  <div className="bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100">
    <h3 className="text-lg font-bold mb-2 text-blue-800">{title}</h3>
    <p className="text-gray-600 mb-4">{content}</p>
    <Link href="#" className="text-blue-600 hover:text-blue-800 hover:underline" prefetch={false}>
      {linkText}
    </Link>
  </div>
)

const IconLink = ({ href, icon: Icon, text }) => (
  <Link
    href={href}
    className="bg-white rounded-md p-4 flex flex-col items-center justify-center hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md border border-blue-100"
    prefetch={false}
  >
    <Icon className="w-8 h-8 mb-2 text-blue-600" />
    <span className="text-blue-800">{text}</span>
  </Link>
)

const HomePage = () => {
  const navItems = ['首页', '信息公开', '在线服务', '政策解读', '来访登记', '内容管理', '联系我们']
  const infoLinks = [
    { icon: FileText, text: '政策法规' },
    { icon: Users, text: '机构职能' },
    { icon: Calendar, text: '政务动态' },
    { icon: Briefcase, text: '政务服务' }
  ]

  return (
    <div className='flex flex-col min-h-screen bg-blue-50'>
      <header className="bg-blue-700 text-white py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Mountain className="w-6 h-6" />
          <span className="text-lg font-bold">政务公开</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-4">
            {navItems.map(item => (
              <NavLink key={item} href="#">{item}</NavLink>
            ))}
          </nav>
          <div className="relative">
            <Input
              type="text"
              placeholder="搜索..."
              className="border-none focus:ring-0 focus:border-none bg-blue-600 text-white placeholder-blue-200"
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-center py-24 px-6 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold mb-4">欢迎访问政务公开平台</h1>
        <p className="text-lg mb-8">在这里，您可以查找和获取政府信息，了解最新政策动态。</p>
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          prefetch={false}
        >
          了解更多
        </Link>
      </section>

      <main className="flex-1 py-12 px-6 max-w-7xl mx-auto w-full">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">最新公告</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              title="关于2023年政务公开工作的通知"
              content="为进一步推进政务公开工作，现就2023年相关工作安排通知如下..."
            />
            <InfoCard
              title="关于开展政务服务事项清单公开的通知"
              content="为进一步提升政务服务透明度，现就开展政务服务事项清单公开工作通知如下..."
            />
            <InfoCard
              title="关于2022年政务公开工作总结的通报"
              content="2022年，我们在政务公开工作中取得了一定成绩，现就相关情况通报如下..."
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">信息公开入口</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {infoLinks.map(({ icon, text }) => (
              <IconLink key={text} href="#" icon={icon} text={text} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">政策解读</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              title="《关于进一步推进政务公开工作的意见》解读"
              content="近日，政府发布了《关于进一步推进政务公开工作的意见》，主要内容包括..."
            />
            <InfoCard
              title="《政务服务事项清单》解读"
              content="为进一步提升政务服务透明度，政府发布了《政务服务事项清单》，主要包括..."
            />
            <InfoCard
              title="《信息公开条例》解读"
              content="为规范政务信息公开工作，政府制定了《信息公开条例》，主要内容包括..."
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">舆情回应</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              title='关于"XX事件"的舆情回应'
              content='近期，社会上出现了关于" XX事件"的舆论，现就相关情况回应如下...'
            />
            <InfoCard
              title='关于"YY事件"的舆情回应'
              content='近期，社会上出现了关于" YY事件"的舆论，现就相关情况回应如下...'
            />
            <InfoCard
              title='关于"ZZ事件"的舆情回应'
              content='近期，社会上出现了关于" ZZ事件"的舆论，现就相关情况回应如下...'
            />
          </div>
        </section>
      </main>

      <section className="bg-blue-100 py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-800">在线服务</h2>
            <p className="text-gray-600 mb-4">您可以通过我们的在线服务平台，快速办理各类政务事项。</p>
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              prefetch={false}
            >
              进入在线服务
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-800">实体大厅</h2>
            <p className="text-gray-600 mb-4">您也可以前往我们的实体政务大厅，获取现场服务。</p>
            <div className="space-y-2">
              {[
                { name: 'XX区政务大厅', address: 'XX市XX区XX路XX号', phone: '0XX-XXXXXXXX' },
                { name: 'YY区政务大厅', address: 'YY市YY区YY路YY号', phone: '0YY-YYYYYYY' }
              ].map(hall => (
                <div key={hall.name}>
                  <h3 className="text-lg font-bold text-blue-700">{hall.name}</h3>
                  <p className="text-gray-600">
                    地址: {hall.address}<br />
                    电话: {hall.phone}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
              prefetch={false}
            >
              来访登记
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-blue-700 text-white py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">平台建设</h2>
            <p className="text-blue-100 mb-4">我们正在不断完善政务公开平台，提升服务质量和效率。</p>
            <Link href="#" className="text-white hover:text-blue-200 hover:underline" prefetch={false}>
              了解更多
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">信息公开条例</h2>
            <p className="text-blue-100 mb-4">我们制定了《信息公开条例》，规范政务信息公开工作。</p>
            <Link href="#" className="text-white hover:text-blue-200 hover:underline" prefetch={false}>
              查看条例
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-blue-700 text-white py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; 2023 政务公开平台. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {['来访登记', '内容管理', '联系我们', '隐私政策', '使用条款'].map(item => (
              <NavLink key={item} href="#">{item}</NavLink>
            ))}
            <div className="flex items-center gap-2">
              <Twitter className="w-5 h-5" />
              <Facebook className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage