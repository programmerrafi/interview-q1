import React from "react";
import { Switch } from "@mantine/core";

function Switchs({
  checkedLongStroy,
  checkedShortStroy,
  checkedLong,
  checkedShort,
  short,
  long,
}) {
  return (
    <>
      {long && (
        <Switch
          checked={checkedLong}
          onChange={(e) => checkedLongStroy(e)}
          size="xs"
        />
      )}
      {short && (
        <Switch
          checked={checkedShort}
          onChange={(e) => checkedShortStroy(e)}
          size="xs"
        />
      )}
    </>
  );
}

export default Switchs;
