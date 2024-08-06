import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Calendar, Briefcase, LayoutGrid, Settings, CircleHelp, Search, FileText } from 'lucide-react';
import Image from 'next/image';

// 定义通用的链接类型
interface LinkType {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

// 定义卡片类型
interface CardType extends LinkType {
  title: string;
  description: string;
}

// IconLink 组件
const IconLink: React.FC<LinkType> = ({ href, icon: Icon, text }) => (
  <Link
    href={href}
    className="rounded-lg shadow-lg p-6 flex flex-col items-center justify-center gap-4 bg-white hover:bg-blue-200 transition-colors"
  >
    <Icon className="w-12 h-12 text-blue-600" />
    <span className="text-lg font-medium text-blue-800">{text}</span>
  </Link>
);

// 导航链接数据
const headerNavLinks: LinkType[] = [
  { href: '/', icon: LayoutGrid, text: '首页' },
  { href: '/public', icon: Users, text: '信息公开' },
  { href: '/online', icon: Calendar, text: '在线服务' },
  { href: '/policy', icon: Briefcase, text: '政策解读' },
];

// 主要链接数据
const mainFeatureLinks: LinkType[] = [
  { href: '/public-disclosure', icon: LayoutGrid, text: '信息公开' },
  { href: '/online-services', icon: Briefcase, text: '在线服务' },
  { href: '/policy-updates', icon: Calendar, text: '政策动态' },
  { href: '/visitor-registration', icon: Users, text: '来访登记' },
];

// 卡片数据
const serviceCards: CardType[] = [
  { icon: FileText, title: "政策法规", description: "查阅最新的政策法规文件，了解工作动向。", text: "查看政策法规", href: '/policies' },
  { icon: Briefcase, title: "办事指南", description: "获取各类政务服务的办理流程和所需材料。", text: "查看办事指南", href: '/services' },
  { icon: Users, title: "公众参与", description: "参与决策讨论，提出您的宝贵意见。", text: "参与讨论", href: '/public-participation' },
  { icon: LayoutGrid, title: "工作动态", description: "浏览工作报告和重要公告信息。", text: "查看动态", href: '/news' },
  { icon: Settings, title: "数据开放", description: "获取公开数据，助力创新发展。", text: "浏览数据", href: '/data' },
  { icon: CircleHelp, title: "咨询投诉", description: "提出您的问题或建议，我们将及时处理和回复。", text: "联系我们", href: '/contact' }
];

// 页脚链接数据
const footerNavLinks = [
  { href: "#", text: "隐私政策" },
  { href: "#", text: "使用条款" },
  { href: "#", text: "联系我们" },
];

// SearchBar 组件
const SearchBar: React.FC = () => (
  <div className="relative">
    <Input
      type="text"
      placeholder="搜索政务信息..."
      className="pl-10 pr-4 py-2 w-64 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
  </div>
);

// HomePage 组件
const HomePage: React.FC = () => (
  <div className="flex flex-col w-full min-h-screen bg-white">
    <header className="px-6 py-4 bg-blue-600 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
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
          {headerNavLinks.map((item, index) => (
            <Link key={index} href={item.href} className="text-blue-100 hover:text-white">
              {item.text}
            </Link>
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
            {mainFeatureLinks.map((link, index) => (
              <IconLink key={index} {...link} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map(({ icon: Icon, title, description, text, href }, index) => (
            <Card key={index} className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <Icon className="w-8 h-8 text-blue-600" />
                <CardTitle className="text-blue-800">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{description}</p>
              </CardContent>
              <CardFooter>
                <Link href={href} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {text}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>

    <footer className="bg-slate-100 py-6 border-t border-blue-200">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-slate-600 text-sm">&copy; 2024 政务公开平台. 版权所有.</p>
        <nav className="flex items-center gap-4 mt-4 md:mt-0">
          {footerNavLinks.map((link, index) => (
            <Link key={index} href={link.href} className="text-blue-600 hover:text-blue-800 text-sm">
              {link.text}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  </div>
);

export default HomePage;