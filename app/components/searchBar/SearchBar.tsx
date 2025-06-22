"use client";

import { useDebounce } from "@/app/hooks/useDebounce";
import { useSearchProductsService } from "@/app/service/search/useSearchService";
import { SearchResult } from "@/app/types/searchTypes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const { data: searchResults = [] } = useSearchProductsService(debouncedQuery);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (value.length < 2) {
        setIsOpen(false);
      }
    },
    []
  );

  const handleSearch = useCallback(() => {
    router.push(`?q=${query}`);
  }, [query, router]);

  const handleSelectResult = useCallback(
    (result: SearchResult) => {
      setQuery(result.title);
      setIsOpen(false);

      router.push(`?q=${result.title}`);
    },
    [router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setIsOpen(false);
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    setIsOpen(query.length >= 2);
  }, [searchResults, query]);

  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
  }, [searchParams]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 ml-8 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 focus-within:shadow-lg transition-all duration-300 relative w-[300px] group">
      <div className="flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력하세요."
          className="flex-1 p-3 pl-4 pr-12 focus:outline-none bg-transparent text-slate-700 placeholder-slate-400"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        <button
          className="absolute right-3 p-2 text-slate-400 hover:text-blue-500 rounded-lg transition-all duration-200 cursor-pointer"
          onClick={handleSearch}
        >
          <IoSearchSharp size={18} />
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-[105%] bg-white shadow w-full border border-slate-100 rounded-lg z-10"
        >
          {searchResults.length === 0 && (
            <div className="px-4 py-3 text-slate-500 text-sm">
              검색 결과가 없습니다.
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="px-4 py-3 text-slate-700 font-bold text-sm">
              {searchResults.map((result: SearchResult, index: number) => (
                <div
                  key={result.id}
                  className={[
                    "cursor-pointer hover:bg-slate-100 py-1.5 px-1 rounded-lg",
                    index === 0 ? "" : "mt-1",
                  ].join(" ")}
                  onClick={() => handleSelectResult(result)}
                >
                  {result.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
