import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Users, Calendar, Briefcase, LayoutGrid, Settings, CircleHelp, Search } from 'lucide-react';

const IconLink = ({ href, icon: Icon, text }) => (
  <Link
    href={href}
    className="bg-background rounded-lg shadow-lg p-6 flex flex-col items-center justify-center gap-4 hover:bg-accent hover:text-accent-foreground transition-colors"
  >
    <Icon className="w-12 h-12" />
    <span className="text-lg font-medium">{text}</span>
  </Link>
);

const SearchBar = () => (
  <div className="relative">
    <Input
      type="text"
      placeholder="搜索政务信息..."
      className="pl-10 pr-4 py-2 w-64 bg-background"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
  </div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="px-6 py-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2">
            <FileText className="w-8 h-8" />
            <span className="text-xl font-bold">政务公开平台</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground">首页</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">信息公开</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">在线服务</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">政策解读</Link>
          </nav>
          <div className="flex items-center gap-4">
            <SearchBar />
            <Button variant="outline">登录</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">透明政务，服务民众</h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                我们致力于提供全面、及时、准确的政务信息，促进政民互动，提升政府工作效能。
              </p>
              <div className="flex gap-4">
                <Button>立即查询</Button>
                <Button variant="outline">了解更多</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <IconLink href="#" icon={LayoutGrid} text="信息公开" />
              <IconLink href="#" icon={Briefcase} text="在线服务" />
              <IconLink href="#" icon={Calendar} text="政务动态" />
              <IconLink href="#" icon={Users} text="公众参与" />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <FileText className="w-8 h-8" />
                <CardTitle>政策法规</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">查阅最新的政策法规文件，了解政府工作动向。</p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary hover:underline">查看政策法规</Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Briefcase className="w-8 h-8" />
                <CardTitle>办事指南</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">获取各类政务服务的办理流程和所需材料。</p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary hover:underline">查看办事指南</Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-8 h-8" />
                <CardTitle>公众参与</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">参与政府决策讨论，提出您的宝贵意见。</p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary hover:underline">参与讨论</Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <LayoutGrid className="w-8 h-8" />
                <CardTitle>政府公报</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">浏览政府工作报告和重要公告信息。</p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary hover:underline">查看公报</Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Settings className="w-8 h-8" />
                <CardTitle>数据开放</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">获取政府公开数据，助力创新发展。</p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary hover:underline">浏览数据</Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CircleHelp className="w-8 h-8" />
                <CardTitle>咨询投诉</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">提出您的问题或建议，我们将及时处理和回复。</p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary hover:underline">联系我们</Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6 border-t">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">&copy; 2024 政务公开平台. 版权所有.</p>
          <nav className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">隐私政策</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">使用条款</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">联系我们</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;