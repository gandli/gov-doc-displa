import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Calendar, Briefcase, LayoutGrid, Settings, CircleHelp, Search } from 'lucide-react';
import tobaccoIcon from '../tobacco.png';
import Image from 'next/image'

// 自定义蓝色主题
const theme = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-blue-100 text-blue-800',
  accent: 'bg-blue-50',
  muted: 'bg-slate-100',
  background: 'bg-white',
};

const IconLink = ({ href, icon: Icon, text }) => (
  <Link
    href={href}
    className={`${theme.accent} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center gap-4 hover:bg-blue-200 transition-colors`}
  >
    <Icon className="w-12 h-12 text-blue-600" />
    <span className="text-lg font-medium text-blue-800">{text}</span>
  </Link>
);

const navLinks = [
  { href: '/', icon: <LayoutGrid />, text: '首页' },
  { href: '/public', icon: <Users />, text: '信息公开' },
  { href: '/online', icon: <Calendar />, text: '在线服务' },
  { href: '/policy', icon: <Briefcase />, text: '政策解读' },
]

const links = [
  { href: '/public-disclosure', icon: 'LayoutGrid', text: '信息公开' },
  { href: '/online-services', icon: 'Briefcase', text: '在线服务' },
  { href: '/policy-updates', icon: 'Calendar', text: '政策动态' },
  { href: '/visitor-registration', icon: 'Users', text: '来访登记' },
];

const cards = [
  { icon: 'FileText', title: "政策法规", description: "查阅最新的政策法规文件，了解工作动向。", link: "查看政策法规", href: '/policies' },
  { icon: 'Briefcase', title: "办事指南", description: "获取各类政务服务的办理流程和所需材料。", link: "查看办事指南", href: '/services' },
  { icon: 'Users', title: "公众参与", description: "参与决策讨论，提出您的宝贵意见。", link: "参与讨论", href: '/public-participation' },
  { icon: 'LayoutGrid', title: "工作动态", description: "浏览工作报告和重要公告信息。", link: "查看动态", href: '/news' },
  { icon: 'Settings', title: "数据开放", description: "获取公开数据，助力创新发展。", link: "浏览数据", href: '/data' },
  { icon: 'CircleHelp', title: "咨询投诉", description: "提出您的问题或建议，我们将及时处理和回复。", link: "联系我们", href: '/contact' }
];

const SearchBar = () => (
  <div className="relative">
    <Input
      type="text"
      placeholder="搜索政务信息..."
      className="pl-10 pr-4 py-2 w-64 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
  </div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <header className="px-6 py-4 bg-blue-600 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2">
            {/* <FileText className="w-8 h-8" /> */}
            <Image
              src="/tobacco.svg"
              alt="Tobacco Icon"
              width={32}
              height={32}
              className="filter brightness-0 invert-[1]"
            />
            <span className="text-xl font-bold">政务公开平台</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item, index) => (
              <Link key={index} href={item.href} className="text-blue-100 hover:text-white">{item.text}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <SearchBar />
            <Button variant="outline" className="text-white border-white hover:bg-blue-700">登录</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-blue-100 text-blue-800 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-900">透明政务，服务民众</h1>
              <p className="text-blue-700 text-lg md:text-xl">
                我们致力于提供全面、及时、准确的政务信息，促进政民互动，提升工作效能。
              </p>
              <div className="flex gap-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">立即查询</Button>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">了解更多</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <IconLink href="#" icon={LayoutGrid} text="信息公开" />
              <IconLink href="#" icon={Briefcase} text="在线服务" />
              <IconLink href="#" icon={Calendar} text="政务动态" />
              <IconLink href="#" icon={Users} text="来访登记" />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((item, index) => (
              <Card key={index} className="border-blue-200 hover:border-blue-400 transition-colors">
                <CardHeader>
                  <item.icon className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-blue-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-blue-600 hover:text-blue-800 hover:underline">{item.link}</Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-100 py-6 border-t border-blue-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between ">
          <p className="text-slate-600 text-sm">&copy; 2024 政务公开平台. 版权所有.</p>
          <nav className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">隐私政策</Link>
            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">使用条款</Link>
            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">联系我们</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;