import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OnDemandFilterContainer } from "./OnDemandFilterStyles";

interface OnDemandFilterProps {
  label: string;
  filterList: any[];
  selectedFilter: string[];
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, y: string) => void;
}

const OnDemandFilter = (props: OnDemandFilterProps) => {
  const { label, filterList, selectedFilter, handleClick } = props;

  return (
    <OnDemandFilterContainer>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography>{label}</Typography>
          {selectedFilter.length > 0 && <Box className="dot-indicator" />}
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 0 10px 0" }}>
          {filterList.map((f) => (
            <Typography
              key={`filter-tag-${f}`}
              component="button"
              className="tag"
              onClick={(e) => {
                handleClick(e, f);
              }}
            >
              {f}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </OnDemandFilterContainer>
  );
};

export default OnDemandFilter;
