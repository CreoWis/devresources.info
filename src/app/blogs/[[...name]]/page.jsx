"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";
import PageContainer from "@/components/pageContainer";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import {
  clearBlogFilters,
  setBlogDataByUrl,
} from "@/redux/features/blog/blogSlice";
import { addQuotesToString, extractDataFromURL } from "@/utils/utils";
import { fetchBlogByAllFilter } from "@/redux/features/blog/action";
import { fetchFilterFromURL, updateURLAndData } from "@/utils/urlFunc";
import { BLOGS_URL } from "@/utils/constants";

const Blogs = ({ name }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const dataFromURL = extractDataFromURL(pathname);
  const blogs = useSelector(({ blogs }) => blogs);
  const { allBlogs, status, langSelected, audienceSelected, tagSelected } =
    blogs;

  const fetchData = (obj) => {
    const convertLang = obj?.langSelected
      ? addQuotesToString(obj?.langSelected)
      : undefined;
    const convertAudience = obj?.audienceSelected
      ? addQuotesToString(obj?.audienceSelected)
      : undefined;
    const convertTag = obj?.tagSelected
      ? addQuotesToString(obj?.tagSelected)
      : undefined;

    dispatch(
      fetchBlogByAllFilter({
        langSelected: convertLang,
        audienceSelected: convertAudience,
        tagSelected: convertTag,
      })
    );
  };

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setBlogDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, []);

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setBlogDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, [pathname]);

  useEffect(() => {
    updateURLAndData(BLOGS_URL, fetchData, {
      langSelected,
      audienceSelected,
      tagSelected,
    });
  }, [langSelected, audienceSelected, tagSelected]);
  return (
    <PageContainer>
      <Breadcrumb />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Blogs
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        A curated list of
        {langSelected && <span> {langSelected}</span>}
        {tagSelected && <span> {tagSelected}</span>} blogs
        {audienceSelected && <span> targeted towards {audienceSelected}</span>}
      </p>
      <AudienceFilterBar
        page="blogs"
        pageState={blogs}
        clearFunc={clearBlogFilters}
      />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allBlogs.length > 0 ? (
        <AudienceTable
          data={allBlogs}
          page="blogs"
          pageState={blogs}
          filterFunc={fetchBlogByAllFilter}
        />
      ) : (
        status === "success" && <p>No blogs found!</p>
      )}
    </PageContainer>
  );
};

export default Blogs;
