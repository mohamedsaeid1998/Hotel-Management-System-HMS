/** @format */

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";

const FeedbackComponent = ({ btnText }) => {
  const [text, setText] = React.useState("");
  // const [customerComments, setCustomerComments] = useState('');

  const handleCommentsChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission of customer comments, e.g., send to a server, etc.
    console.log("Customer Comments:", text);
    // You can perform additional actions here, such as sending the comments to a server.
  };
  return (
    <div>
      <FormLabel>{btnText === "Rate" ? "Message" : ""}</FormLabel>
      <TextField
        // style={{ position: "fixed", left: 0, bottom: 0, width: "100%" }}
        placeholder="Type in here…"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleCommentsChange}
      />
      <Box style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          style={{ textAlign: "end" }}
          color="primary"
          onClick={handleSubmit}
        >
          {btnText}
        </Button>
      </Box>
    </div>
  );
};

export default FeedbackComponent;
