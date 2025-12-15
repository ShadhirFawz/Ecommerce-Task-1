"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

const apiDoc = () => {
  return (
    <ApiReferenceReact
      configuration={{
        url: "/api/doc",
      }}
    />
  );
};

export default apiDoc;