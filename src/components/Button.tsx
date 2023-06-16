import React, { useState, useCallback } from "react";
import { http, MethodType } from "@/utils/request";

interface MyButtonProps<T> {
  request?: Request;
  onClick?: (result: T, error?: Error) => void;
  style?: React.CSSProperties;
  classNamePrefix?: string;
  className?: string;
  disabled?: boolean;
  loading?: string | JSX.Element;
  children?: string | JSX.Element;
}

export interface Request {
  url: string;
  method?: MethodType;
  data?: object;
}

const MyButton = <T extends object>({
  request,
  onClick,
  style = {},
  className = "",
  disabled = false,
  loading = "loading",
  classNamePrefix = "MyButton",
  children = "MyButton",
}: MyButtonProps<T>) => {
  const { url, method = "get", data } = request || {};
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      if (url) {
        const result = await http[method as MethodType](url, data as object);
        if (onClick) {
          onClick(result as unknown as T);
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      onClick?.(undefined as unknown as T, err as Error);
      throw err;
    }
  }, [url, method, data, onClick]);

  return (
    <button
      style={style}
      className={`${classNamePrefix} ${className}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      {isLoading ? loading : children}
    </button>
  );
};
const MemoButton = React.memo(MyButton) as <T extends object>(
  props: MyButtonProps<T>
) => JSX.Element;

export default MemoButton;
