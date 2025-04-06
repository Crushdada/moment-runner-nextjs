'use client'

import React from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LanguageSelect } from "@/components/language-select";
import { Button } from "@/components/ui/button";
import { useLocaleClient } from '@lib/useLocaleClient';
import { CarbonLogoGithub } from '@/components/CarbonLogoGithub';
const Header = () => {
  const {t, lang: currentLanguage} = useLocaleClient();
  const menuItems = [
    { href: "https://momentjs.com/", label: t('momentjs_doc') },
    { href: "https://day.js.org/", label: t('dayjs_doc') },
    { href: `/${currentLanguage}/migrate`, label: t('migrate_tip')}
  ];

  return (
    <header className="border-b px-4 py-2">
      <div className="w-full flex items-center justify-between">
        <Link href="/">
          <Button variant="link" className="text-xl font-bold">
            {t("momentjs_online_runner")}
          </Button>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              window.open('https://github.com/Crushdada/moment-runner-nextjs', '_blank');
            }}
            aria-label="Toggle theme"
          >
            <CarbonLogoGithub
              className="h-[1.2rem] w-[1.2rem] transition-all"
            />
          </Button>
          <ModeToggle />
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
};

export default Header;
