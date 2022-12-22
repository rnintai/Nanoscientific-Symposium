import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { smallFontSize } from "utils/FontSize";
import { OnDemandFilterContainer } from "./OnDemandFilterStyles";

interface OnDemandFilterProps {
  label: string;
  filterList: Common.onDemandTagType[];
  selectedFilter: Common.onDemandTagType[];
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    y: Common.onDemandTagType,
  ) => void;
}

const OnDemandFilter = (props: OnDemandFilterProps) => {
  const { label, filterList, selectedFilter, handleClick } = props;
  return (
    <OnDemandFilterContainer className="on-demand-filter">
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography fontSize={smallFontSize}>{label}</Typography>
          {selectedFilter.length > 0 && <Box className="dot-indicator" />}
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 0 10px 0" }}>
          {filterList.map((f) => (
            <Typography
              key={`filter-tag-${f.value}`}
              component="button"
              className={`tag tag-${f.value.replace(/\s/g, "-")}`}
              fontSize={smallFontSize}
              onClick={(e) => {
                handleClick(e, f);
              }}
            >
              {f.value}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </OnDemandFilterContainer>
  );
};

export default OnDemandFilter;
