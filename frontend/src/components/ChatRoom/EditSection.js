import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import updateComment from "../../actions/updateComment";
import { connect } from "react-redux";

const EditSection = (props) => {
  console.log(props);
  return (
    <Grid container>
      <Grid item xs={10}>
        <TextField
          value={props.value}
          onChange={e => props.setValue(e.target.value)}
          label={"Váš komentář"}
          variant={"outlined"}
          fullWidth
        />
      </Grid>{" "}
      <Grid item xs={2}>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          style={{ padding: "14.5px 14px" }}
          onClick={() => {
            props.updateComment(props.commentID, props.value)
            props.setEdit(false)
          }}
        >
          Ulozit
        </Button>
      </Grid>
    </Grid>
  );
};
export default connect(()=>({}),{updateComment})(EditSection);
