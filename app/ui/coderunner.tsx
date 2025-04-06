"use client";
// CodeRunner.js
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import moment from "moment";
import dayjs from "dayjs";
import { getCodeFromRawString } from "@lib/utils";
import { Button } from "@/components/ui/button";
import { TzSelect } from "@/components/tz-select";
import { useLocaleClient } from '@lib/useLocaleClient'

const CodeRunner = forwardRef((props, ref) => {
  const [code, setCode] = useState("");
  const outputRef = useRef(""); // 使用 useRef 来保存 output 的值
  const {t} = useLocaleClient();
  useImperativeHandle(ref, () => ({
    updateCode(newContent: string) {
      outputRef.current.innerHTML = "";
      setCode(newContent);
    },
  }));

  useEffect(() => {
    console.log = function (...arg) {
      if (outputRef.current) outputRef.current.innerHTML += arg.join("") + "<br>";
    };
  });

  const runCode = () => {
    outputRef.current.innerHTML = "";
    try {
      const virtualConsole = {
        log: (...args) => {
          outputRef.current.innerHTML += args.map(String).join(" ") + "<br>";
        },
        error: (...args) => {
          outputRef.current.innerHTML += `<span style="color: red;">${args
            .map(String)
            .join(" ")}</span><br>`;
        },
        // 可以根据需要添加其他方法，如 warn, info 等
      };

      const func = new Function("console", "moment", "dayjs", code);
      func(virtualConsole, moment, dayjs);
    } catch (error) {
      outputRef.current.innerHTML += `<span style="color: red;">${error}</span><br>`;
    }
  };

  const resetCode = () => {
    outputRef.current.innerHTML = "";
    // Reset logic here
    setCode(getCodeFromRawString(props.activeDemoMethod.usecase));
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      e.target.value = value.substring(0, start) + "\t" + value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
  };

  return (
    <>
      <div
        className="editor"
        style={{ whiteSpace: "normal", wordWrap: "break-word" }}
      >
        <textarea
          id="codeInput"
          placeholder="输入您的JavaScript代码"
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="output">
        <span style={{ color: "#737782" }}>output:</span>
        <div ref={outputRef}></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button variant="outline" onClick={runCode}>
            {t('runcode')}
          </Button>
          <Button variant="outline" id="resetCodeBtn" onClick={resetCode}>
            {t('reset')}
          </Button>
        </div>
        <TzSelect className="inline-flex ml-auto"/>

      </div>
    </>
  );
});

export default CodeRunner;
