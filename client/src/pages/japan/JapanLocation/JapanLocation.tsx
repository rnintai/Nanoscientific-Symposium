import { Box } from "@mui/system";
import axios from "axios";
import LandingTextEditor from "components/LandingTextEditor/LandingTextEditor";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import { escapeQuotes } from "utils/String";

const JapanLocation = () => {
  const pathname = usePageViews();

  const [initialDescription, setInitialDescription] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [previewContent, setPreviewContent] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);

  const getDescHandler = async () => {
    try {
      const res = await axios.get("/api/page/common/jp/location", {
        params: {
          nation: pathname,
        },
      });

      setDescription(res.data.result);
      setInitialDescription(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const applyHandler = async () => {
    try {
      const row = await axios.post("/api/page/common/jp/location", {
        nation: pathname,
        content: escapeQuotes(description),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDescHandler();
  }, []);

  return (
    <Box className="layout body-fit">
      <LandingTextEditor
        initialValue={initialDescription}
        value={description}
        setValue={setDescription}
        edit={edit}
        setEdit={setEdit}
        preview={preview}
        setPreview={setPreview}
        previewContent={previewContent}
        setPreviewContent={setPreviewContent}
        applyHandler={applyHandler}
      >
        {description || ""}
      </LandingTextEditor>
    </Box>
  );
};

export default JapanLocation;
