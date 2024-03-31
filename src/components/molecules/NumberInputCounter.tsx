import React, { useRef, useState } from "react";
import commonStyles from "@/styles/common.module.css";

import Input from '@mui/joy/Input';

const NumberInputCounter = () => {
  const [value, setValue] = useState<number | string>(2);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (newValue: any) => {
    setValue(newValue.target.value);
  };

  return (
    <Input
      className={commonStyles.marginY16}
      type="number"
      defaultValue={1}
      slotProps={{
        input: {
          ref: inputRef,
          min: 1,
          max: 99,
          step: 1,
        },
      }}
      value={value}
      onChange={handleChange}
    />
  )
}



export default NumberInputCounter;