'use client';
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "../ui/fonts";
import Image from "next/image";
import Head from 'next/head';
import Script from 'next/script';
import { useState, useRef, useEffect, useMemo } from 'react';
import CodeRunner from "@/app/ui/coderunner";
import "./page.css";
import {getCodeFromRawString} from '@lib/utils'
import type { Metadata } from 'next'
import { baseMetadata } from '../lib/config'
import { useLocaleClient } from '@lib/useLocaleClient'
const MethodItem = ({ name, desc }: { name: string, desc: string }) => {
  const {t} = useLocaleClient();
  return (
    <div className="method-item">
      <div className="method-name">{name}</div>
      <div className="text-sm opacity-60">{t(desc)}</div>
    </div>
  );
};
const DemoMethodButton = ({ name, usecase, onClick, activeButton, index }: { name: string, usecase: string, onClick: (index: number) => void, activeButton: number, index: number }) => {
  return (
    <button onClick={() => onClick(index)} className={activeButton==index?'active':''}>
      {name}
    </button>
  );
};


export default function ClientPage() {
  const [methods] = useState([
    { "name": "moment()", "desc": "get_current_time" },
    { "name": "moment().format()", "desc": "format_date_time" },
    { "name": "moment().add()", "desc": "add_time" },
    { "name": "moment().diff()", "desc": "calculate_time_difference" },
    { "name": "moment().isAfter()", "desc": "check_two_dates_order" },
    { "name": "moment().isBefore()", "desc": "compare_dates_sequence" },
    { "name": "moment().isSame()", "desc": "verify_same_date" },
    { "name": "moment().clone()", "desc": "copy_moment" },
    { "name": "moment().toISOString()", "desc": "convert_to_iso_string" },
    { "name": "moment().hours()", "desc": "get_set_hour" },
    { "name": "moment().isValid()", "desc": "check_date_validity" },
    { "name": "moment().startOf()", "desc": "set_start_of_time" },
    { "name": "moment().endOf()", "desc": "set_end_of_time" },
    { "name": "moment().utc()", "desc": "convert_to_utc" },
    { "name": "moment().local()", "desc": "convert_to_local_time_zone" },
  ]);
  const [demoMethods] = useState([
    {
      name: 'moment().format()',
      usecase: `
    moment().format('MMMM Do YYYY, h:mm:ss a'); // March 20th 2024, 7:46:48 pm
    moment().format('dddd');                    // Wednesday
    moment().format("MMM Do YY");               // Mar 20th 24
    moment().format(); // Without format string

    dayjs().format('MMMM Do YYYY, h:mm:ss a'); // March 20th 2024, 7:46:48 pm
    ` },
    {
      name: 'moment().add()',
      usecase: `moment().add(1, 'days').calendar();       // Tomorrow at 7:56 PM
    moment().add(3, 'month').calendar();       // Saturday at 7:56 PM
    moment().add(10, 'years').calendar();
    dayjs().add(3, 'days');      // 03/30/2024`
    },
    {
      name: 'moment().diff()', usecase:
        `moment().diff(moment('2024-03-19'), 'days'));
    dayjs().diff(dayjs('2024-03-19'), 'days'));`
    },
    { name: 'moment().isAfter()', usecase: `moment().isAfter(moment('2023-01-01')) dayjs().isAfter(dayjs('2023-01-01'))` },
  ]);
  const [activeButton, setActiveButton] = useState(0);
  const codeRunnerRef = useRef(null);
  const activeDemoMethod = useMemo(() => demoMethods[activeButton], [activeButton]);


  useEffect(() => {

    let usecase = demoMethods[activeButton].usecase
    const newCode = getCodeFromRawString(usecase)
    // 更新 codeInput 的值
    if (codeRunnerRef.current) {
      (codeRunnerRef.current as any).updateCode(newCode);
    }
  }, [activeButton]);
  return (
    <>
      <div id="app">
        <div className="methods-container">
          {methods.map((method) => (
            <MethodItem key={method.name} {...method} />
          ))}
        </div>
        <div className="container">
          <div className="tab-bar">
            {demoMethods.map((method, index) => (
              <DemoMethodButton
                key={method.name}
                index={index}
                activeButton={activeButton}
                {...method}
                onClick={setActiveButton}
              />
            ))}
          </div>
          <CodeRunner ref={codeRunnerRef} activeDemoMethod={activeDemoMethod} />
        </div>
      </div>
    </>
  );
}
