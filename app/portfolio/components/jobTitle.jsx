"use client";

import { TypeAnimation } from 'react-type-animation';

const timeout = 5000

export default function JobTitle() {
  return (
    <TypeAnimation
      sequence={ [
        "API Automation Engineer",
        timeout,
        "Mobile Application Automation Engineer",
        timeout,
        "Software Development Engineer in Test (SDET)",
        timeout,
        "Mobile Test Engineer",
        timeout,
        "Backend Test Engineer",
        timeout,
        "Quality Assurance Engineer (QA Engineer)",
        timeout,
      ] }
      wrapper="h2"
      speed={ 50 }
      repeat={ Infinity }
    />
  )
}