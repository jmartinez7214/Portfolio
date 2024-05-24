import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowMyCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewCourses from "../components/Web/ReviewCourses";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Jose Martinez</title>
        <meta
          name="description"
          content="Home | Development Web Site"
          data-react-helmet="true"
        />
      </Helmet>
      <MainBanner />
      <HomeCourses />
      <HowMyCoursesWork />
      <ReviewCourses />
    </>
  );
}
